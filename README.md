# avfamilyenterprise.com

The company site for AV Family Enterprise LLC. Same stack and deploy shape as
[thetempleoftwo.com](https://github.com/templetwo/templetwo.github.io): TanStack Start
prerendered to static HTML, Tailwind 4, deployed to GitHub Pages by Actions on every
push to `main`.

```bash
npm install
npm run dev          # http://localhost:8090
npm run build        # static output in dist/client
npm run images       # re-import screenshots from ~/website-screenshots/manifest.json
```

## Content rules

- Product descriptions are condensed from each project's README, and each `status`
  is that README's own words (`src/data/content.ts`).
- Screenshots come only from manifest entries marked `ok_for_public_site: true`,
  with the manifest's reviewed caption (`scripts/import-screenshots.mjs`).
- No contact details are published beyond the links already public on
  thetempleoftwo.com.
