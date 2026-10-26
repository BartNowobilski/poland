/* =========================================================
   CONSTRUCTION PROGRESS — newest entries appear first.
   ---------------------------------------------------------
   1. Put photos in photos/construction/<yyyy-mm>/ and run `npm run images`.
      Each photo's id = its path with "-" instead of "/", lower case:
      photos/construction/2026-03/fundamenty-01.jpg → "construction-2026-03-fundamenty-01"
   2. Add an entry below. `date` may be "yyyy-mm" or "yyyy-mm-dd".
   3. Photos automatically appear in the gallery under "Postęp budowy".

   Example (copy, uncomment, edit):

   {
     id: "2026-03-fundamenty",
     date: "2026-03",
     milestone: true,                       // highlights the entry
     title: { pl: "Fundamenty", en: "Foundations" },
     text: {
       pl: "Krótki opis etapu prac…",
       en: "A short description of this stage…",
     },
     photos: [
       "construction-2026-03-fundamenty-01",
       "construction-2026-03-fundamenty-02",
     ],
   },
   ========================================================= */

export const PROGRESS = [];
