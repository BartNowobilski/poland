/* =========================================================
   GALLERY — what appears on /gallery and in the homepage preview.
   ---------------------------------------------------------
   • Order here = order on the page. Move lines to reorder.
   • `id` = image file name in lower case (see image-manifest.json).
   • `render: true` marks visualisations (shows a "Wizualizacja" tag).
   • `featured: true` puts the image in the homepage gallery preview.
   • Photos dropped into photos/<category>/ appear automatically at the
     end of their category after `npm run images` — add a line here only
     to give them a custom alt text, position or `featured` flag.
   • Construction photos come from content/progress.js automatically.
   ========================================================= */

export const CATEGORIES = [
  { id: "architecture", label: { pl: "Architektura", en: "Architecture" } },
  { id: "interiors", label: { pl: "Wnętrza", en: "Interiors" } },
  { id: "surroundings", label: { pl: "Okolica", en: "Surroundings" } },
  { id: "lifestyle", label: { pl: "Styl życia", en: "Lifestyle" } },
  { id: "construction", label: { pl: "Postęp budowy", en: "Construction" } },
  { id: "renderings", label: { pl: "Wizualizacje", en: "Renderings" } },
];

const ext = (pl, en) => ({ pl: `${pl} — wizualizacja`, en: `${en} — visualisation` });

// Interior visualisations are grouped by room for consistent alt text.
const ROOMS = {
  hall: ["Hol ze schodami i antresolą", "Hallway with staircase and gallery"],
  living: ["Salon z kominkiem", "Living room with fireplace"],
  dining: ["Jadalnia", "Dining room"],
  kitchen: ["Kuchnia", "Kitchen"],
  bedroom: ["Sypialnia", "Bedroom"],
  kids: ["Pokój dziecięcy", "Children’s room"],
  bathroom: ["Łazienka", "Bathroom"],
};
const room = (id, key, extra = {}) => ({
  id,
  category: "interiors",
  render: true,
  alt: { pl: `${ROOMS[key][0]} — wizualizacja wnętrza`, en: `${ROOMS[key][1]} — interior visualisation` },
  ...extra,
});

export const GALLERY = [
  // ---------- Exterior visualisations ----------
  {
    id: "bialka",
    category: "architecture",
    render: true,
    featured: true,
    alt: ext("Osiedle Trakt Janosika z lotu ptaka, w tle Tatry", "Trakt Janosika from above, with the Tatras behind"),
  },
  {
    id: "h5",
    category: "architecture",
    render: true,
    featured: true,
    alt: ext("Wjazd na ogrodzone osiedle z kamiennym murem", "Gated entrance with a stone wall"),
  },
  {
    id: "h2",
    category: "architecture",
    render: true,
    alt: ext("Dom w stylu góralskim ze stromym dachem i balkonem", "Highlander-style home with steep roof and balcony"),
  },
  {
    id: "h3",
    category: "architecture",
    render: true,
    featured: true,
    alt: ext("Fasada domu z wysokim szczytem i tarasem", "House façade with tall gable and terrace"),
  },
  {
    id: "h4",
    category: "architecture",
    render: true,
    alt: ext("Dom od strony ogrodu — kamień i drewno", "Garden side — stone and timber"),
  },

  // ---------- Interior visualisations ----------
  room("s1", "hall", { featured: true }),
  room("s2", "hall"),
  room("s3", "kitchen"),
  room("s4", "living"),
  room("s5", "dining", { featured: true }),
  room("s6", "dining"),
  room("s7", "kitchen"),
  room("s8", "living"),
  room("s9", "living"),
  room("s15", "bedroom"),
  room("s16", "bedroom"),
  room("s17", "bedroom"),
  room("s18", "bedroom"),
  room("s19", "bedroom", { featured: true }),
  room("s20", "bathroom"),
  room("s21", "bathroom"),
  room("s22", "bathroom"),
  room("s23", "bathroom"),
  room("s24", "bedroom"),
  room("s25", "bedroom"),
  room("s26", "bedroom"),
  room("s27", "bedroom"),
  room("s28", "bedroom"),
  room("s29a", "bathroom"),
  room("s29b", "bathroom"),
  room("s29c", "bathroom", { featured: true }),
  room("s30", "kids"),
  room("s31", "kids"),
  room("s32", "kids"),
  room("s33", "kids"),
  room("s34", "kids"),
  room("s35", "bathroom"),
  room("s36", "bathroom"),
  room("s37", "bathroom"),
  room("s39", "bedroom"),
  room("s40", "bedroom"),
  room("s41", "bedroom"),
  room("s42", "bathroom"),
  room("s43", "bathroom"),
  room("s44", "bathroom"),
  room("s45", "bathroom"),
];
