/* Navigation. `hash` targets a section id on the homepage; `to` is a route.
   `label` is a key in i18n `nav`. `footerOnly` items are listed in the footer
   (and mobile menu) but kept out of the desktop bar to avoid crowding. */
export const NAV_ITEMS = [
  { label: "about", hash: "about" },
  { label: "architecture", hash: "architecture" },
  { label: "homes", hash: "homes" },
  { label: "masterplan", hash: "masterplan", footerOnly: true },
  { label: "location", hash: "location" },
  { label: "story", hash: "story" },
  { label: "progress", hash: "progress", footerOnly: true },
  { label: "gallery", to: "/gallery" },
];

export const PRIMARY_NAV = NAV_ITEMS.filter((i) => !i.footerOnly);

export const CONTACT_HASH = "contact";
