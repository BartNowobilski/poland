/* =========================================================
   Named images used by homepage sections.
   Interim registry: points at the original files in /public.
   Phase 4 replaces `src` with optimised AVIF/WebP derivatives
   from the generated manifest — section code won't change.
   `position` = focal point used when the image is cropped.
   ========================================================= */

const img = (src, width, height, position) => ({ src, width, height, position });

export const IMAGES = {
  // Exterior visualisations
  aerial: img("/bialka.jpg", 4032, 2268, "50% 60%"),
  gate: img("/h5.jpg", 3840, 2560, "40% 60%"),
  houseCorner: img("/h2.jpg", 3840, 2560, "60% 55%"),
  houseFront: img("/h3.jpg", 3840, 2560, "50% 45%"),
  houseGarden: img("/h4.jpg", 3840, 2560, "45% 50%"),

  // Interior visualisations (example arrangements)
  hall: img("/S1.jpg", 1600, 1600, "50% 50%"),
  living: img("/S9.jpg", 1600, 1600, "50% 55%"),
  dining: img("/S5.jpg", 1600, 1600, "50% 55%"),
  carvedRosette: img("/S19.jpg", 1600, 1600, "50% 30%"),
  carvedMirror: img("/S29c.jpg", 1600, 1600, "50% 35%"),
  bedroom: img("/S25.jpg", 1600, 1600, "50% 60%"),

  panorama: img("/pano1.jpeg", 3072, 2048),
};
