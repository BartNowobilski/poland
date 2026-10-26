/* =========================================================
   Named images used by homepage sections, resolved from the
   generated manifest (AVIF + JPEG fallback, several widths).
   `position` = focal point used when the image is cropped.
   To swap an image, change its id here (ids = file names,
   lower-case; see README → "Images").
   ========================================================= */
import { getImage } from "../lib/images";

export const IMAGES = {
  // Exterior visualisations
  aerial: getImage("bialka", { position: "50% 60%" }),
  gate: getImage("h5", { position: "40% 60%" }),
  houseCorner: getImage("h2", { position: "60% 55%" }),
  houseFront: getImage("h3", { position: "50% 45%" }),
  houseGarden: getImage("h4", { position: "45% 50%" }),

  // Interior visualisations (example arrangements)
  hall: getImage("s1"),
  living: getImage("s9", { position: "50% 55%" }),
  dining: getImage("s5", { position: "50% 55%" }),
  carvedRosette: getImage("s19", { position: "50% 30%" }),
  carvedMirror: getImage("s29c", { position: "50% 35%" }),
  bedroom: getImage("s25", { position: "50% 60%" }),

  // 360° viewer needs the full-resolution equirectangular original
  panorama: { src: "/pano1.jpeg", width: 3072, height: 2048 },
  panoramaPoster: getImage("pano1"),
};
