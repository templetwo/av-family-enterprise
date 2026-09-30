# Contact-form Worker for avfamilyenterprise.com

```
visitor → form on avfamilyenterprise.com/contact  (plain HTML POST, no JavaScript)
            │
            ▼
   contact.templetwo.com/avfe   ← this Worker (avfe-contact), by route
            • POST only · origin allowlist · 32 KB body cap (enforced while reading)
            • honeypot field "website"
            • name / email / summary required, lengths capped, type from a fixed list
            • fails closed (503) without the RL rate-limit binding or the EMAIL binding
            • 5 submissions per IP per 10 minutes (KV)
            ▼
   Cloudflare Email (send_email binding, one fixed destination)
            ▼
   info@avfamilyenterprise.com  (Webador mailbox), Reply-To = the visitor
```

It answers with a small confirmation page that links back to the site. It stores
nothing except a per-IP counter that expires after ten minutes, and it never logs a
message body or an address.

It is **separate** from the Temple of Two Worker (`templetwo.github.io/contact-worker`,
Custom Domain `contact.templetwo.com`). That Worker is not modified by anything here.
This one takes only the `/avfe*` path on the same hostname, because Cloudflare runs
routes before a Custom Domain.

No Turnstile: the site promises it loads no third-party scripts, and the Turnstile
widget is a Cloudflare script. The rate limit is the required anti-abuse control.

## Test (any machine, Node 22+)

```bash
cd contact-worker && npm test     # 14 tests; the cloudflare:email module is stubbed
```

## Deploy (from HQ)

Run on the seat that holds the Cloudflare login for the account that owns `templetwo.com`.

**0. Check the login first.**

```bash
cd contact-worker && npx wrangler whoami
```

If this is not logged in, or shows an account without `templetwo.com`, **stop and tell
Anthony**. He runs `npx wrangler login` himself.

**1. Tests pass.** `npm test`

**2. Create this Worker's own rate-limit namespace** (do not reuse the Temple one):

```bash
npx wrangler kv namespace create RL
```

Paste the printed `id` over `REPLACE_WITH_NEW_KV_NAMESPACE_ID` in `wrangler.toml`,
and commit that on the branch.

**3. Deploy.**

```bash
npx wrangler deploy
```

Do **not** add anything under Email Routing → Destination addresses in this step.

**4. Smoke test: the right Worker answers each path.**

```bash
curl -si https://contact.templetwo.com/avfe | grep -iE '^HTTP|x-contact-worker'
#   expect: HTTP/2 405 and x-contact-worker: avfe
curl -si https://contact.templetwo.com/ | grep -iE '^HTTP|x-contact-worker'
#   expect: 405 with NO x-contact-worker header (the Temple Worker, unchanged)
```

**5. HOLD. Anthony verifies the inbox when he is ready.**
Adding the destination address is what sends Cloudflare's verification email, so it
waits until Anthony says he is ready to click it. Then, in the dashboard for
`templetwo.com`: Email Routing → Destination addresses → Add
`info@avfamilyenterprise.com`. Anthony clicks the link in the email Cloudflare sends.
If that email never arrives, the Webador mailbox is not receiving: stop there.

**6. End-to-end test** (after the address shows *Verified*):

```bash
curl -si -X POST https://contact.templetwo.com/avfe \
  -H 'Origin: https://avfamilyenterprise.com' \
  --data-urlencode 'name=Deploy test' --data-urlencode 'email=anthony@example.com' \
  --data-urlencode 'type=Other' --data-urlencode 'summary=End-to-end test of the contact form.' \
  | grep -iE '^HTTP|x-contact-status'
#   expect: 200 and x-contact-status: ok, then the message in info@avfamilyenterprise.com
```

Before a send lands, a 502 with `x-contact-status: send_failed` means the destination
is not verified yet. `npx wrangler tail` shows `cf_email_error <name>`, never the
message itself.

**7. Then merge the site PR** that sets `site.formEndpoint`. The form goes live only
after the Worker delivers.

## Roll back

`npx wrangler delete avfe-contact` removes this Worker and its route. The Temple
Worker and `contact.templetwo.com` keep working. On the site, setting
`site.formEndpoint` back to `null` restores the previous Contact page.
