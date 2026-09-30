// AV Family Enterprise — contact-form Worker.
//
// Flow:  avfamilyenterprise.com/contact  ──POST──▶  contact.templetwo.com/avfe  (this Worker)
//        ──▶  Cloudflare Email (send_email binding)  ──▶  info@avfamilyenterprise.com
//
// Adapted from the Temple of Two contact Worker (templetwo.github.io/contact-worker),
// kept as a separate Worker so the business and the research site never share a
// failure. Differences: no Turnstile (the site promises it loads nothing from third
// parties), the KV rate limit is REQUIRED, and Cloudflare Email is the only transport.
//
// Defences, in order: method gate → origin allowlist → streamed body cap → honeypot
// → field validation → fail-closed without the RL binding → per-IP rate limit (KV)
// → header-safe, HTML-escaped email to one fixed destination.
//
// The form is a plain HTML POST (no JavaScript), so the browser navigates here and
// this Worker answers with a small confirmation page that links back to the site.
// Plain vars (wrangler.toml [vars]): CONTACT_TO, CONTACT_FROM. Bindings: EMAIL, RL.

const ALLOWED_ORIGINS = ['https://avfamilyenterprise.com', 'https://www.avfamilyenterprise.com'];
const SITE_CONTACT = 'https://avfamilyenterprise.com/contact/';
const INQUIRY_TYPES = ['Technical project', 'Research collaboration', 'Capability statement request', 'Other'];

const LIMITS = { name: 200, org: 200, email: 200, summary: 5000 };
const MAX_BODY_BYTES = 32 * 1024; // hard cap on the whole request body
const RL_MAX = 5; //                 submissions per IP per window
const RL_WINDOW_SECONDS = 600; //    10 minutes

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method !== 'POST') return respond(false, 'method_not_allowed', 405);

    // A present Origin must be ours. Browsers always send Origin on a cross-site form
    // POST; non-browser clients that omit it still meet the rate limit below.
    if (origin && ALLOWED_ORIGINS.indexOf(origin) === -1) return respond(false, 'forbidden_origin', 403);

    // Size cap enforced DURING the read; Content-Length is only a cheap fast path.
    const declared = parseInt(request.headers.get('Content-Length') || '0', 10);
    if (declared && declared > MAX_BODY_BYTES) return respond(false, 'too_large', 413);

    let fields;
    try {
      fields = await readForm(request, MAX_BODY_BYTES);
    } catch (e) {
      if (e && e.message === 'too_large') return respond(false, 'too_large', 413);
      return respond(false, 'bad_request', 400);
    }

    // Honeypot: real visitors never see or fill it. Pretend success; send nothing.
    if (String(fields.website || '').trim() !== '') return respond(true, null, 200);

    const name = oneLine(clean(fields.name, LIMITS.name));
    const org = oneLine(clean(fields.org, LIMITS.org));
    const email = clean(fields.email, LIMITS.email);
    const summary = clean(fields.summary, LIMITS.summary);
    const type = INQUIRY_TYPES.indexOf(String(fields.type || '')) !== -1 ? String(fields.type) : 'Other';

    if (!name || !email || !summary || !isEmail(email)) return respond(false, 'invalid_input', 422);

    // Fail closed: never run as an unthrottled email amplifier. Without the RL
    // binding, or without a transport, nothing is sent.
    if (!env.RL || !env.EMAIL) return respond(false, 'not_configured', 503);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const key = 'rl:' + ip;
    const count = parseInt((await env.RL.get(key)) || '0', 10) + 1;
    if (count > RL_MAX) return respond(false, 'rate_limited', 429);
    await env.RL.put(key, String(count), { expirationTtl: RL_WINDOW_SECONDS });

    const sent = await sendViaCloudflare(env, { name, org, email, type, summary });
    if (!sent) return respond(false, 'send_failed', 502);

    return respond(true, null, 200);
  },
};

// ── input ────────────────────────────────────────────────────────────────────

function clean(v, max) {
  // Normalise newlines, strip control chars (keep \n and \t), trim, hard-cap length.
  return String(v == null ? '' : v)
    .replace(/\r\n?/g, '\n')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, max);
}

/** Names and organizations are single-line; they end up in the subject header. */
function oneLine(s) {
  return s.replace(/\s*\n\s*/g, ' ');
}

function isEmail(s) {
  // Bounded quantifiers: no catastrophic backtracking; also forbids whitespace.
  return /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/.test(s);
}

async function readForm(request, maxBytes) {
  const bytes = await readCapped(request, maxBytes); // throws Error('too_large') past the cap
  const ct = (request.headers.get('Content-Type') || '').toLowerCase();
  // Re-wrap the capped bytes so the urlencoded/multipart parser never sees more.
  const bounded = new Request('https://internal/', {
    method: 'POST',
    headers: { 'Content-Type': ct || 'application/x-www-form-urlencoded' },
    body: bytes,
  });
  const form = await bounded.formData();
  const fields = {};
  for (const [k, v] of form.entries()) fields[k] = typeof v === 'string' ? v : '';
  return fields;
}

// Read the body, aborting the moment it exceeds maxBytes, so a chunked or
// header-less request cannot force an unbounded buffer into isolate memory.
async function readCapped(request, maxBytes) {
  if (!request.body) return new Uint8Array(0);
  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const step = await reader.read();
    if (step.done) break;
    if (step.value) {
      total += step.value.length;
      if (total > maxBytes) {
        try { await reader.cancel(); } catch (_) {}
        throw new Error('too_large');
      }
      chunks.push(step.value);
    }
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) { out.set(c, offset); offset += c.length; }
  return out;
}

// ── email ────────────────────────────────────────────────────────────────────
//
// Workers cannot open SMTP, and avfamilyenterprise.com is not a Cloudflare zone, so
// mail is sent from templetwo.com (on this account, Email Routing enabled) and lands
// in the Webador mailbox for info@avfamilyenterprise.com. The binding in
// wrangler.toml can reach that one verified address and nothing else.

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/** base64 of a UTF-8 string, chunked so large bodies don't blow the stack. */
function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

/** RFC 2047 encoded-word for non-ASCII header text. */
function encodeHeader(s) {
  return /^[\x20-\x7E]*$/.test(s) ? s : '=?UTF-8?B?' + b64(s) + '?=';
}

/** Strip CR/LF so a crafted field cannot inject extra headers. */
function headerSafe(s) {
  return String(s).replace(/[\r\n]+/g, ' ').trim();
}

export function composeEmail(m) {
  const subject = 'AV Family Enterprise inquiry · ' + m.type + ' · ' + m.name;
  const text =
    'Name: ' + m.name + '\n' +
    (m.org ? 'Organization: ' + m.org + '\n' : '') +
    'Email: ' + m.email + '\n' +
    'Type: ' + m.type + '\n' +
    '\n' + m.summary + '\n' +
    '\n-- \nSent from the contact form on avfamilyenterprise.com. Reply to answer the sender.\n';
  const row = (k, v) => '<p style="margin:0 0 4px"><strong>' + k + ':</strong> ' + escapeHtml(v) + '</p>';
  const html =
    '<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#202735">' +
    row('Name', m.name) + (m.org ? row('Organization', m.org) : '') + row('Email', m.email) + row('Type', m.type) +
    '<hr style="border:none;border-top:1px solid #d9dee6;margin:14px 0">' +
    '<p style="white-space:pre-wrap;margin:0">' + escapeHtml(m.summary) + '</p>' +
    '<p style="color:#4f586a;font-size:13px;margin-top:18px">Sent from the contact form on avfamilyenterprise.com. Reply to answer the sender.</p>' +
    '</div>';
  return { subject, text, html };
}

export function buildMime({ fromEmail, fromName, to, replyTo, subject, text, html }) {
  const boundary = 'avfe_' + crypto.randomUUID().replace(/-/g, '');
  const date = new Date().toUTCString().replace(/GMT$/, '+0000');
  const domain = fromEmail.split('@')[1] || 'templetwo.com';
  return [
    'From: ' + encodeHeader(headerSafe(fromName)) + ' <' + headerSafe(fromEmail) + '>',
    'To: ' + headerSafe(to),
    'Reply-To: ' + headerSafe(replyTo),
    'Subject: ' + encodeHeader(headerSafe(subject)),
    'Message-ID: <' + crypto.randomUUID() + '@' + domain + '>',
    'Date: ' + date,
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="' + boundary + '"',
    '',
    '--' + boundary,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(text),
    '--' + boundary,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(html),
    '--' + boundary + '--',
    '',
  ].join('\r\n');
}

async function sendViaCloudflare(env, m) {
  try {
    const { EmailMessage } = await import('cloudflare:email');
    const to = env.CONTACT_TO || 'info@avfamilyenterprise.com';
    // CONTACT_FROM may be "Name <addr>" or a bare address; the domain must be on this account.
    const raw = String(env.CONTACT_FROM || 'AV Family Enterprise <avfe-contact@templetwo.com>');
    const angle = raw.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
    const fromName = angle && angle[1] ? angle[1] : 'AV Family Enterprise';
    const fromEmail = angle ? angle[2] : raw;
    const c = composeEmail(m);
    const mime = buildMime({ fromEmail, fromName, to, replyTo: m.email, subject: c.subject, text: c.text, html: c.html });
    await env.EMAIL.send(new EmailMessage(fromEmail, to, mime));
    return true;
  } catch (e) {
    // Never log the message body or any address.
    console.log('cf_email_error ' + (e && e.name ? e.name : 'unknown'));
    return false;
  }
}

// ── response ─────────────────────────────────────────────────────────────────

const MESSAGES = {
  invalid_input: 'Please go back and fill in your name, a valid email address, and a short summary.',
  rate_limited: 'Too many messages from this connection in the last few minutes. Please wait ten minutes and try again.',
};

function respond(ok, error, status) {
  const back = '<a href="' + SITE_CONTACT + '">Back to the site →</a>';
  const inner = ok
    ? '<h1>Inquiry sent</h1><p>Thank you. Your message is on its way to AV Family Enterprise, and a reply will come from a person. ' + back + '</p>'
    : '<h1>Your inquiry was not sent</h1><p>' + (MESSAGES[error] || 'Something went wrong on our side. Please try again later.') + ' ' + back + '</p>';
  const page =
    '<!doctype html><html lang="en"><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">' +
    '<title>' + (ok ? 'Inquiry sent' : 'Inquiry not sent') + ' | AV Family Enterprise</title>' +
    '<body style="font-family:system-ui,-apple-system,sans-serif;background:#0b1424;color:#dce2eb;' +
    'max-width:36rem;margin:18vh auto;padding:0 1.25rem;line-height:1.7">' +
    '<style>a{color:#7cc4ee;font-weight:600}h1{color:#fff;font-size:1.5rem;border-bottom:1px solid #c3a461;padding-bottom:.5rem}</style>' +
    inner + '</body></html>';
  return new Response(page, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      // Lets a post-deploy smoke test tell this Worker from the Temple one on the same hostname.
      'X-Contact-Worker': 'avfe',
      'X-Contact-Status': ok ? 'ok' : String(error),
    },
  });
}
