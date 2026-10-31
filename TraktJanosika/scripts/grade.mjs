/* =========================================================
   "Trakt Janosika look" — adaptive colour grade for real photos.
   ---------------------------------------------------------
   Photos come from different cameras (iPhone at dusk, a
   professional interior shoot). Each image is measured and
   moved PART of the way toward a shared target, so the set
   looks cohesive without hiding what the photo shows:
     • exposure   dark images lifted toward a mid target
     • warmth     strong blue/orange casts reduced
     • saturation oversaturated phone colour calmed
     • contrast   gentle S-curve, shadows opened if crushed
   Applied to derivatives only (originals never modified).
   Change GRADE values here; `npm run images` re-processes.
   ========================================================= */
import sharp from "sharp";

export const GRADE = {
  version: 2,
  maxWidth: 2560, // grade at the largest output size (faster)
  exposure: { target: 0.5, strength: 0.4, minGamma: 0.82, maxGamma: 1.05 },
  warmth: { target: 20, strength: 0.35, max: 0.08 }, // target R−B (0–255 scale)
  saturation: { target: 0.32, min: 0.82, max: 1.06 },
  contrast: 0.16, // 0 = linear, 1 = full smoothstep S-curve
  shadowLift: { threshold: 0.12, amount: 0.015 }, // when >12% of pixels are near black
  tint: { r: 1.01, b: 0.985 }, // shared subtle warmth for every photo
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** Measure brightness, cast, saturation and crushed shadows on a small copy. */
export async function measure(image) {
  const { data } = await image.clone().resize(200).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, l = 0, sat = 0, low = 0;
  const n = data.length / 3;
  for (let i = 0; i < data.length; i += 3) {
    const R = data[i], G = data[i + 1], B = data[i + 2];
    r += R; g += G; b += B;
    const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    l += L;
    const mx = Math.max(R, G, B);
    sat += mx ? (mx - Math.min(R, G, B)) / mx : 0;
    if (L < 20) low++;
  }
  return { lum: l / n / 255, cast: (r - b) / n, sat: sat / n, low: low / n };
}

/** Per-image parameters derived from its measurements. */
export function plan(stats, overrides = {}) {
  const G = { ...GRADE, ...overrides };
  const e = G.exposure;
  const ideal = Math.log(e.target) / Math.log(clamp(stats.lum, 0.05, 0.95));
  const gamma = clamp(1 + (ideal - 1) * e.strength, e.minGamma, e.maxGamma);
  const w = clamp(((G.warmth.target - stats.cast) * G.warmth.strength) / 255, -G.warmth.max, G.warmth.max);
  const saturation = clamp(Math.sqrt(G.saturation.target / Math.max(stats.sat, 0.01)), G.saturation.min, G.saturation.max);
  const lift = stats.low > G.shadowLift.threshold ? G.shadowLift.amount : 0;
  return {
    gamma,
    gains: [(1 + w) * G.tint.r, 1, (1 - w) * G.tint.b],
    saturation,
    lift,
    contrast: G.contrast,
  };
}

/** Apply a plan → returns a new sharp instance (sRGB, no metadata). */
export async function applyGrade(image, p) {
  const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // one lookup table per channel: gain → shadow lift → exposure curve → S-curve
  const luts = p.gains.map((gain) => {
    const lut = new Uint8ClampedArray(256);
    for (let v = 0; v < 256; v++) {
      let x = clamp((v / 255) * gain, 0, 1);
      x = p.lift + x * (1 - p.lift);
      x = Math.pow(x, p.gamma);
      const s = x * x * (3 - 2 * x);
      x = x + (s - x) * p.contrast;
      lut[v] = Math.round(x * 255);
    }
    return lut;
  });
  for (let i = 0; i < data.length; i += 3) {
    data[i] = luts[0][data[i]];
    data[i + 1] = luts[1][data[i + 1]];
    data[i + 2] = luts[2][data[i + 2]];
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } }).modulate({
    saturation: p.saturation,
  });
}

/** Convenience: measure + plan + apply, after downscaling to GRADE.maxWidth. */
export async function grade(image, overrides) {
  const meta = await image.metadata();
  const base = meta.width > GRADE.maxWidth ? image.resize({ width: GRADE.maxWidth }) : image;
  const buffered = sharp(await base.toBuffer());
  const stats = await measure(buffered);
  const p = plan(stats, overrides);
  return { image: sharp(await (await applyGrade(buffered.clone(), p)).png().toBuffer()), stats, plan: p };
}
