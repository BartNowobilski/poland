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
  aerialPortrait: getImage("bialka-portrait"), // phones in portrait (hero)
  gate: getImage("h5", { position: "40% 60%" }),
  houseCorner: getImage("h2", { position: "60% 55%" }),
  houseFront: getImage("h3", { position: "50% 45%" }),
  houseGarden: getImage("h4", { position: "45% 50%" }),

  // Photos — interiors
  introBath: getImage("interiors-lazienka-lustro-01", { position: "40% 55%" }),
  chandelierBeams: getImage("interiors-salon-zyrandol-01", { position: "50% 40%" }),
  staircase: getImage("interiors-schody-01", { position: "50% 50%" }),
  bathMirror: getImage("interiors-lazienka-lustro-02", { position: "45% 50%" }),

  // Photos — exteriors after dark (September 2026)
  houseNight: getImage("architecture-dom-zmierzch-02", { position: "50% 45%" }),
  introHouse: getImage("architecture-dom-zmierzch-12", { position: "50% 40%" }),
  houseNightWide: getImage("architecture-dom-zmierzch-05", { position: "50% 55%" }),

  // 360° viewer needs the full-resolution equirectangular original
  panorama: { src: "/pano1.jpeg", width: 3072, height: 2048 },
  panoramaPoster: getImage("pano1"),
};
