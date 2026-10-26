#!/usr/bin/env node
/* Generates favicons + social share image from existing brand assets.
   `npm run brand` — re-run only if the logo or hero image changes.
   Nothing is redrawn: the favicon is the Janosik figure cut out of the
   original logo (connected shape only), recoloured ivory on walnut. */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public");
const LOGO = path.join(PUB, "logoT.PNG");
const HERO = path.join(PUB, "bialka.jpg");
const IVORY = { r: 245, g: 240, b: 230 };
const WALNUT = "#3a291d";

/* ---------- Janosik figure: keep the connected shape around the body ---------- */
async function figure() {
  const box = { left: 600, top: 470, width: 480, height: 470 };
  const { data, info } = await sharp(LOGO).extract(box).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const solid = (i) => data[i * 4 + 3] > 40;
  const keep = new Uint8Array(W * H);
  // seed: centre of the torso
  let seed = Math.round(H * 0.5) * W + Math.round(W * 0.5);
  while (!solid(seed)) seed++;
  const stack = [seed];
  keep[seed] = 1;
  while (stack.length) {
    const p = stack.pop();
    const x = p % W;
    const y = (p / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const q = ny * W + nx;
      if (!keep[q] && solid(q)) {
        keep[q] = 1;
        stack.push(q);
      }
    }
  }
  // ivory figure, transparent elsewhere
  const out = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    if (!keep[i]) continue;
    out[i * 4] = IVORY.r;
    out[i * 4 + 1] = IVORY.g;
    out[i * 4 + 2] = IVORY.b;
    // only the dark strokes become the figure; the logo's white inner details stay see-through
    const lum = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / 3;
    out[i * 4 + 3] = Math.round((data[i * 4 + 3] * (255 - lum)) / 255);
  }
  return sharp(out, { raw: { width: W, height: H, channels: 4 } }).trim().png().toBuffer();
}

async function icon(fig, size, file, { radius = 0.18, pad = 0.14 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const art = await sharp(fig).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const r = Math.round(size * radius);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${WALNUT}"/></svg>`
  );
  await sharp(bg).composite([{ input: art, gravity: "center" }]).png().toFile(path.join(PUB, file));
  console.log(`✓ ${file}`);
}

async function ogImage() {
  // 1200×630: hero aerial with a soft shade and the full logo in ivory
  const W = 1200;
  const H = 630;
  const photo = await sharp(HERO).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();
  const shade = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14120f" stop-opacity=".55"/><stop offset=".5" stop-color="#14120f" stop-opacity=".25"/><stop offset="1" stop-color="#14120f" stop-opacity=".7"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`
  );
  const logo = await sharp(LOGO).trim().negate({ alpha: false }).resize({ width: 520 }).png().toBuffer();
  await mkdir(path.join(PUB, "og"), { recursive: true });
  await sharp(photo)
    .composite([{ input: shade }, { input: logo, gravity: "center" }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(PUB, "og/trakt-janosika.jpg"));
  console.log("✓ og/trakt-janosika.jpg");
}

// nav/footer logo: original artwork (transparent margins trimmed) as WebP
async function logos() {
  const trimmed = await sharp(LOGO).extract({ left: 0, top: 266, width: 1764, height: 800 }).toBuffer();
  for (const w of [240, 480]) {
    await sharp(trimmed).resize({ width: w }).png().toFile(path.join(PUB, `brand/logo-${w}.png`));
    await sharp(trimmed).resize({ width: w }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(PUB, `brand/logo-${w}.webp`));
    await sharp(trimmed).resize({ width: w }).avif({ quality: 60 }).toFile(path.join(PUB, `brand/logo-${w}.avif`));
  }
  console.log("✓ brand/logo-240|480.png|webp|avif");
}

await logos();
const fig = await figure();
await icon(fig, 32, "favicon-32.png", { radius: 0.12, pad: 0.08 });
await icon(fig, 180, "apple-touch-icon.png", { radius: 0, pad: 0.14 });
await icon(fig, 192, "icon-192.png");
await icon(fig, 512, "icon-512.png");
await ogImage();
