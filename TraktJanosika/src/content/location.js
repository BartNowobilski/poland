/* =========================================================
   Nearby places. Distances are copied from the existing site
   copy (approximate, in km) — do not change without verifying.
   `note` texts paraphrase the existing location description.
   ========================================================= */

export const PLACES = [
  {
    id: "river",
    icon: "water",
    distanceKm: 0.5,
    name: { pl: "Rzeka Białka", en: "Białka River" },
    note: {
      pl: "Spokojny spacer w otoczeniu natury",
      en: "A peaceful walk through untouched nature",
    },
  },
  {
    id: "skalki",
    icon: "mountain",
    distanceKm: 0.5,
    name: { pl: "Skałki Białczańskie", en: "Skałki Białczańskie" },
    note: {
      pl: "Imponujące skałki górujące nad rzeką",
      en: "Dramatic cliffs guarding the valley",
    },
  },
  {
    id: "ski",
    icon: "ski",
    distanceKm: 3,
    name: { pl: "Kotelnica Białczańska", en: "Kotelnica Białczańska" },
    note: {
      pl: "Dziesiątki tras, snowparki i szkoły narciarskie",
      en: "Dozens of slopes, snow parks and ski schools",
    },
  },
  {
    id: "terma",
    icon: "spa",
    distanceKm: 3,
    name: { pl: "Terma Bania", en: "Terma Bania" },
    note: {
      pl: "Baseny termalne z widokami na Tatry",
      en: "Thermal pools with panoramic mountain views",
    },
  },
  {
    id: "nowy-targ",
    icon: "car",
    distanceKm: 17,
    name: { pl: "Nowy Targ", en: "Nowy Targ" },
    note: {
      pl: "Pełne zaplecze usługowe",
      en: "Shops and daily amenities",
    },
  },
  {
    id: "zakopane",
    icon: "car",
    distanceKm: 22,
    name: { pl: "Zakopane", en: "Zakopane" },
    note: {
      pl: "Stolica Podhala — atrakcje i wydarzenia kulturalne",
      en: "The mountain capital — culture and shopping",
    },
  },
  {
    id: "trails",
    icon: "bike",
    distanceKm: null, // routes start right next to the estate
    name: { pl: "Szlaki piesze i rowerowe", en: "Hiking & cycling trails" },
    note: {
      pl: "Trasy zaczynają się tuż obok inwestycji",
      en: "Routes begin directly in the surrounding forests",
    },
  },
];
