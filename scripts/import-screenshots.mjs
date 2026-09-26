#!/usr/bin/env node
/**
 * Import website screenshots from the capture manifest.
 *
 * Only entries with ok_for_public_site.value === true are imported, and each
 * caption is copied from the manifest rather than rewritten here, so the site
 * can never claim more than the reviewed capture supports.
 *
 *   node scripts/import-screenshots.mjs [path/to/website-screenshots]
 *
 * Writes public/images/software/*.webp and src/data/screenshots.json.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.argv[2] ?? join(homedir(), "website-screenshots");
const OUT = join(ROOT, "public/images/software");
mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(readFileSync(join(SRC, "manifest.json"), "utf8"));
const shots = [];
for (const e of manifest) {
  if (e.ok_for_public_site?.value !== true) continue;
  const base = e.file.replace(/\.png$/, "");
  const hero = e.file.includes("--1920x1200");
  const terminal = e.file.includes("--120x40");
  const width = hero ? 1920 : 1600;
  const dest = join(OUT, `${base}.webp`);
  if (!existsSync(dest)) {
    execFileSync("cwebp", ["-quiet", "-q", "82", "-resize", String(terminal ? 0 : width), "0", join(SRC, e.file), "-o", dest]);
  }
  shots.push({
    project: e.project,
    src: `/images/software/${base}.webp`,
    view: e.view,
    alt: e.what_is_shown,
    caption: e.suggested_caption,
    hero,
    terminal,
    commit: e.commit,
    repo: e.repo_url,
  });
}
writeFileSync(join(ROOT, "src/data/screenshots.json"), JSON.stringify(shots, null, 2) + "\n");
console.log(`imported ${shots.length} screenshots`);
