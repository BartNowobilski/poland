/* =========================================================
   The eight residences.
   PLACEHOLDER identifiers ("Dom 1–8") until the official
   house names/numbers are confirmed. Every specification is
   null on purpose — fill in only verified data. Phase 4 adds
   the presentation (cards, plans, galleries) on top of this.
   ========================================================= */

export const RESIDENCES = Array.from({ length: 8 }, (_, i) => ({
  id: `dom-${i + 1}`,
  label: { pl: `Dom ${i + 1}`, en: `House ${i + 1}` },
  status: null, // "available" | "reserved" | "sold"
  floorArea: null, // m²
  plotArea: null, // m²
}));
