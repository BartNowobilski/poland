#!/usr/bin/env node
/* Prerenders each page to static HTML after `vite build` (part of `npm run build`).
   Visitors and crawlers get real content immediately; React then hydrates it.
     dist/index.html    homepage
     dist/gallery.html  /gallery   (served at /gallery via cleanUrls on Vercel)
     dist/404.html      unknown URLs (Vercel serves it with a 404 status) */
import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SSR = path.join(ROOT, ".ssr");
const ORIGIN = "https://www.traktjanosika.pl";

const { render, PAGES } = await import(pathToFileURL(path.join(SSR, "entry-server.js")).href);
let template = await readFile(path.join(DIST, "index.html"), "utf8");

// Inline the (small) main stylesheet: saves a render-blocking round trip.
const cssLink = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (cssLink) {
  const css = await readFile(path.join(DIST, cssLink[1]), "utf8");
  template = template.replace(cssLink[0], () => `<style>${css}</style>`);
  console.log(`✓ inlined ${cssLink[1]} (${(css.length / 1024).toFixed(0)} KB)`);
}

// Load the app script after the content: the prerendered page paints first,
// hydration follows (module scripts are deferred either way, but in <head> the
// browser sometimes held the first paint until the bundle had downloaded).
const entry = template.match(/\s*<script type="module" crossorigin src="[^"]+"><\/script>/);
if (entry) {
  template = template.replace(entry[0], "").replace("</body>", `  ${entry[0].trim()}\n  </body>`);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const page of PAGES) {
  const app = await render(page.url);
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(page.description)}$2`);

  if (page.canonical) {
    html = html
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${ORIGIN}${page.canonical}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${ORIGIN}${page.canonical}$2`);
  } else {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
  }
  if (page.url !== "/") {
    // hero image preloads only make sense on the homepage
    html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/g, "");
  }
  if (page.noindex) {
    html = html.replace("</title>", '</title>\n    <meta name="robots" content="noindex, follow" />');
  }

  await writeFile(path.join(DIST, page.file), html);
  console.log(`✓ prerendered ${page.url} → dist/${page.file} (${(app.length / 1024).toFixed(0)} KB)`);
}

await rm(SSR, { recursive: true, force: true });
