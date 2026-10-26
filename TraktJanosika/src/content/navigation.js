/* Primary navigation. `hash` targets a section id on the homepage;
   `to` is a separate route. `label` is a key in i18n `nav`. */
export const NAV_ITEMS = [
  { label: "about", hash: "about" },
  { label: "architecture", hash: "architecture" },
  { label: "location", hash: "location" },
  { label: "story", hash: "story" },
  { label: "gallery", to: "/gallery" },
];

export const CONTACT_HASH = "contact";
