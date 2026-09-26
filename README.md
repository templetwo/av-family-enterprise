# avfamilyenterprise.com

The company site for AV Family Enterprise LLC. Same stack and deploy shape as
[thetempleoftwo.com](https://github.com/templetwo/templetwo.github.io): TanStack Start
prerendered to static HTML, Tailwind 4, self-hosted IBM Plex, deployed to GitHub Pages
by Actions on every push to `main`.

```bash
npm install
npm run dev          # http://localhost:8090
npm run build        # static output in dist/client
```

## Source of truth

Built from the owner's website handoff (26 Sep 2026): the approved design mock, the page
copy, and the claims-and-notices sheet. Copy is used verbatim.

- Maturity labels, numbers and identifiers are quoted exactly; change them only after
  re-checking the public source, and re-verify UEI / CAGE / SAM against the live record
  before each publication.
- The Experion name is cropped out of every simulator screenshot; the non-affiliation
  notice is in the footer (`trademarkNotice` in `src/data/content.ts`).
- `site.formEndpoint` and `site.capabilityStatementUrl` stay `null` until a working
  form endpoint / an approved statement exist. While null, the Contact page routes
  inquiries to the Temple of Two inquiry form and no dead button is shown.
- The site loads nothing from third parties; keep it that way or update the privacy
  notice in `src/routes/notices.tsx` first.
