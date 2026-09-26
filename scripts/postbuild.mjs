#!/usr/bin/env node
/**
 * Post-build: what GitHub Pages needs that Vite does not emit.
 *   .nojekyll   Pages otherwise drops _-prefixed asset folders
 *   CNAME       custom domain (avfamilyenterprise.com)
 *   sitemap.xml derived from what was actually prerendered
 *   404.html    Pages serves this for any unmatched path
 */
import { readdir, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMAIN = "avfamilyenterprise.com";
const ORIGIN = `https://${DOMAIN}`;

async function findOutDir() {
  for (const c of [".output/public", "dist/client", "dist"]) {
    try {
      const p = join(ROOT, c);
      if ((await stat(p)).isDirectory() && (await readdir(p)).includes("index.html")) return p;
    } catch {
      /* keep looking */
    }
  }
  throw new Error("No build output with index.html (looked in .output/public, dist/client, dist).");
}

async function routes(dir, base = "") {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name.startsWith("_") || e.name === "assets" || e.name === "images") continue;
      out.push(...(await routes(join(dir, e.name), `${base}/${e.name}`)));
    } else if (e.name === "index.html") out.push(base || "/");
  }
  return out;
}

const OUT = await findOutDir();
const list = (await routes(OUT)).sort();
console.log(`postbuild · ${relative(ROOT, OUT)} · ${list.length} routes: ${list.join(" ")}`);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(OUT, "sitemap.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...list.map((r) => `  <url><loc>${ORIGIN}${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`),
    "</urlset>",
    "",
  ].join("\n"),
);
await writeFile(join(OUT, ".nojekyll"), "");
await writeFile(join(OUT, "CNAME"), `${DOMAIN}\n`);
await writeFile(
  join(OUT, "404.html"),
  `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Not found — AV Family Enterprise</title><meta name="robots" content="noindex">
<style>html{color-scheme:dark}body{margin:0;min-height:100dvh;display:grid;place-items:center;background:#0d1015;color:#eee9df;font-family:system-ui,sans-serif;text-align:center;padding:2rem}a{color:#e3b87e}</style>
</head><body><main><p style="font-family:ui-monospace,monospace;letter-spacing:.14em;color:#c9955a">404</p>
<h1 style="font-family:Georgia,serif;font-weight:500">This page isn't here.</h1>
<p><a href="${ORIGIN}/">Home</a> · <a href="${ORIGIN}/software">Software</a> · <a href="${ORIGIN}/about">About</a></p></main></body></html>
`,
);
console.log("postbuild · wrote sitemap.xml, .nojekyll, CNAME, 404.html");
