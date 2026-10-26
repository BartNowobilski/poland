#!/usr/bin/env node
/* =========================================================
   Image pipeline — `npm run images`
   ---------------------------------------------------------
   Sources (originals are never modified):
     public/*.jpg|jpeg      legacy originals (kept at their live URLs)
     photos/<category>/**   new photos; folder name = gallery category
                            e.g. photos/construction/2026-03/site-01.jpg

   Output:
     public/img/<id>-<width>.avif|webp   responsive derivatives
     public/img/<id>-<width>.jpg         single JPEG fallback
     src/content/image-manifest.json     dimensions, sizes, placeholder, colour

   Re-runs are incremental: unchanged sources are skipped.
   `npm run images -- --force` rebuilds everything.
   ========================================================= */
import { readdir, stat, mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const PHOTOS = path.join(ROOT, "photos");
const OUT = path.join(PUBLIC, "img");
const MANIFEST = path.join(ROOT, "src/content/image-manifest.json");

const WIDTHS = [640, 1280, 1920, 2560];
// Modern formats generated at every width. AVIF covers ~95% of browsers; the
// rest get the JPEG fallback. Add "webp" here for broader coverage (≈+18 MB).
const FORMATS = ["avif"];
const ENCODERS = {
  avif: (img) => img.avif({ quality: 52, effort: 4 }),
  webp: (img) => img.webp({ quality: 76, effort: 5 }),
};
const FALLBACK_WIDTH = 1280;
const CATEGORIES = ["architecture", "interiors", "surroundings", "lifestyle", "construction", "renderings"];
const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?|avif)$/i;

// Legacy files in public/ that are not photography.
const EXCLUDE = new Set(["logo.jpeg", "logoT.PNG", "janosik.jpg"]);

// Per-image fixes, keyed by id. Applied to derivatives only.
const ADJUST = {
  // the original file is truncated — rows below ~2540 px are corrupt
  h5: { crop: { bottom: 24 } },
};

// Extra art-directed crops, generated as separate images (own id).
// aspect = width / height of the crop, x/y = focal point 0–1.
const VARIANTS = {
  // phones in portrait: the wide hero aerial cropped around the houses
  bialka: [{ id: "bialka-portrait", aspect: 9 / 16, x: 0.5, y: 0.5, widths: [640, 960] }],
};

const FORCE = process.argv.includes("--force");

/* ---------- helpers ---------- */
const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : e.name.startsWith(".") ? [] : [p];
    })
  );
  return files.flat();
}

async function collectSources() {
  const sources = [];
  for (const name of await readdir(PUBLIC)) {
    if (!/\.(jpe?g)$/i.test(name) || EXCLUDE.has(name)) continue;
    sources.push({ id: slugify(path.parse(name).name), file: path.join(PUBLIC, name), category: null });
  }
  for (const file of (await walk(PHOTOS)).filter((f) => IMAGE_EXT.test(f))) {
    const rel = path.relative(PHOTOS, file);
    const [folder] = rel.split(path.sep);
    if (!CATEGORIES.includes(folder)) {
      console.warn(`! skipped ${rel} — first folder must be one of: ${CATEGORIES.join(", ")}`);
      continue;
    }
    const parsed = path.parse(rel);
    sources.push({ id: slugify(path.join(parsed.dir, parsed.name)), file, category: folder });
  }
  for (const s of [...sources]) {
    for (const v of VARIANTS[s.id] ?? []) {
      sources.push({ id: v.id, file: s.file, category: null, variant: v, baseAdjust: ADJUST[s.id] });
    }
  }
  const seen = new Map();
  for (const s of sources) {
    if (seen.has(s.id)) throw new Error(`Duplicate image id "${s.id}": ${seen.get(s.id)} and ${s.file}`);
    seen.set(s.id, s.file);
  }
  return sources.sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
}

async function pool(items, limit, fn) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await fn(items[idx]);
      }
    })
  );
  return results;
}

const outputsFor = (id, e) => [
  ...e.widths.flatMap((w) => (e.formats ?? FORMATS).map((fmt) => `${id}-${w}.${fmt}`)),
  `${id}-${e.fallback}.jpg`,
];

/* ---------- processing ---------- */
async function processImage(source, previous) {
  const { id, file, category, variant } = source;
  const { mtimeMs, size } = await stat(file);
  const fingerprint = `${Math.round(mtimeMs)}-${size}-${FORMATS}-${JSON.stringify(ADJUST[id] ?? source.baseAdjust ?? {})}-${JSON.stringify(variant ?? {})}`;

  if (!FORCE && previous?.fingerprint === fingerprint) {
    if (outputsFor(id, previous).every((f) => existsSync(path.join(OUT, f)))) return { ...previous, category, skipped: true };
  }

  // failOn:none — decode damaged files as far as possible (see ADJUST)
  let base = sharp(file, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  let width = meta.autoOrient?.width ?? meta.width;
  let height = meta.autoOrient?.height ?? meta.height;

  const crop = (ADJUST[id] ?? source.baseAdjust)?.crop;
  if (crop) {
    const box = {
      left: crop.left ?? 0,
      top: crop.top ?? 0,
      width: width - (crop.left ?? 0) - (crop.right ?? 0),
      height: height - (crop.top ?? 0) - (crop.bottom ?? 0),
    };
    base = sharp(await base.extract(box).toBuffer());
    ({ width, height } = box);
  }

  if (variant) {
    // crop to the variant's aspect ratio around its focal point
    const targetW = Math.min(width, Math.round(height * variant.aspect));
    const targetH = Math.min(height, Math.round(targetW / variant.aspect));
    const box = {
      left: Math.round((width - targetW) * variant.x),
      top: Math.round((height - targetH) * variant.y),
      width: targetW,
      height: targetH,
    };
    base = sharp(await base.extract(box).toBuffer());
    ({ width, height } = box);
  }

  const widths = (variant?.widths ?? WIDTHS).filter((w) => w < width);
  if (!widths.length || width < WIDTHS[WIDTHS.length - 1]) widths.push(width);
  const fallback = widths.filter((w) => w <= FALLBACK_WIDTH).pop() ?? widths[0];

  for (const w of widths) {
    const resized = base.clone().resize({ width: w, withoutEnlargement: true });
    for (const fmt of FORMATS) {
      await ENCODERS[fmt](resized.clone()).toFile(path.join(OUT, `${id}-${w}.${fmt}`));
    }
  }
  await base
    .clone()
    .resize({ width: fallback, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, `${id}-${fallback}.jpg`));

  const tiny = await base.clone().resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  const { dominant } = await base.clone().resize({ width: 64 }).stats();
  const hex = (n) => n.toString(16).padStart(2, "0");

  console.log(`✓ ${id} (${width}×${height}) → ${widths.join(", ")}`);
  return {
    w: width,
    h: height,
    widths,
    formats: FORMATS,
    fallback,
    ph: `data:image/webp;base64,${tiny.toString("base64")}`,
    color: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
    category,
    source: path.relative(ROOT, file),
    fingerprint,
  };
}

/* ---------- main ---------- */
await mkdir(OUT, { recursive: true });
const previous = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, "utf8")).images ?? {} : {};
const sources = await collectSources();

const started = Date.now();
const entries = await pool(sources, 3, (s) => processImage(s, previous[s.id]));
const images = {};
sources.forEach((s, i) => {
  const { skipped, ...entry } = entries[i];
  void skipped;
  // short content version appended to URLs (?v=) so files can be cached forever
  entry.v = createHash("sha1").update(`${entry.fingerprint}|${entry.widths}|${entry.formats}`).digest("hex").slice(0, 8);
  images[s.id] = entry;
});

// remove derivatives of deleted sources
const keep = new Set(Object.entries(images).flatMap(([id, e]) => outputsFor(id, e)));
for (const f of await readdir(OUT)) {
  if (!keep.has(f)) {
    await unlink(path.join(OUT, f));
    console.log(`– removed ${f}`);
  }
}

await writeFile(MANIFEST, JSON.stringify({ generated: "npm run images", images }, null, 1) + "\n");
const built = entries.filter((e) => !e.skipped).length;
console.log(`\n${sources.length} images (${built} processed, ${sources.length - built} unchanged) in ${((Date.now() - started) / 1000).toFixed(1)}s`);
