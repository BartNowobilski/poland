/* =========================================================
   THE EIGHT RESIDENCES
   ---------------------------------------------------------
   PLACEHOLDER identifiers ("Dom 1–8") until the official house
   names/numbers are confirmed. Every specification is null on
   purpose — fill in only verified data. Empty fields show "—"
   on the site; the "Szczegóły" (details) view appears for a
   house as soon as it has a gallery, floor plans, specs or a note.

   Field reference:
     status      null | "available" | "reserved" | "sold"
     floorArea   number, m² (usable floor area)
     plotArea    number, m²
     bedrooms    number
     bathrooms   number
     cover       image id shown on the card (optional)
     gallery     [image ids]
     floorPlans  [{ image: "plan-dom-1-parter", label: { pl: "Parter", en: "Ground floor" } }]
     specs       [{ label: { pl, en }, value: { pl, en } }]
     note        { pl, en }  short description
   ========================================================= */

const blank = (n) => ({
  id: `dom-${n}`,
  label: { pl: `Dom ${n}`, en: `House ${n}` },
  status: null,
  floorArea: null,
  plotArea: null,
  bedrooms: null,
  bathrooms: null,
  cover: null,
  gallery: [],
  floorPlans: [],
  specs: [],
  note: null,
});

export const RESIDENCES = [1, 2, 3, 4, 5, 6, 7, 8].map(blank);

export const hasDetails = (r) =>
  Boolean(r.gallery.length || r.floorPlans.length || r.specs.length || r.note);
