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

const render = (pl, en) => ({ pl: `${pl} — wizualizacja`, en: `${en} — visualisation` });
const photo = (pl, en) => ({ pl: `${pl} — zdjęcie, wrzesień 2026`, en: `${en} — photo, September 2026` });

export const GALLERY = [
  // ---------- Photos: exteriors (September 2026) ----------
  {
    id: "architecture-dom-zmierzch-05",
    category: "architecture",
    featured: true,
    alt: photo("Dom Trakt Janosika po zmroku, z oświetloną elewacją", "A Trakt Janosika home after dark, façade lit"),
  },
  {
    id: "architecture-dom-zmierzch-02",
    category: "architecture",
    featured: true,
    alt: photo("Wysoki góralski szczyt domu i podjazd z kostki", "Tall Highlander gable and paved driveway"),
  },
  {
    id: "architecture-dom-zmierzch-01",
    category: "architecture",
    alt: photo("Dom z kamienną podmurówką i oświetlonym okapem", "Home with stone plinth and lit eaves"),
  },
  {
    id: "architecture-dom-zmierzch-03",
    category: "architecture",
    alt: photo("Domy osiedla i brukowany podjazd", "The homes and the paved driveway"),
  },
  {
    id: "architecture-dom-zmierzch-04",
    category: "architecture",
    alt: photo("Dom z garażem i podjazdem", "Home with garage and driveway"),
  },
  {
    id: "architecture-dom-zmierzch-06",
    category: "architecture",
    alt: photo("Elewacja domu z balkonem i kamienną podmurówką", "Façade with balcony and stone plinth"),
  },

  // ---------- Photos: interiors (September 2026) ----------
  {
    id: "interiors-lazienka-umywalka-02",
    category: "interiors",
    featured: true,
    alt: photo("Łazienka z podwójną umywalką i okrągłym podświetlanym lustrem", "Bathroom with double basin and round backlit mirror"),
  },
  {
    id: "interiors-lazienka-wanna-01",
    category: "interiors",
    featured: true,
    alt: photo("Łazienka na poddaszu z wanną i drewnianym sufitem", "Attic bathroom with bathtub and timber ceiling"),
  },
  {
    id: "interiors-lazienka-prysznic-02",
    category: "interiors",
    alt: photo("Łazienka z prysznicem i wolnostojącą umywalką", "Bathroom with shower and freestanding basin"),
  },
  {
    id: "interiors-lazienka-umywalka-01",
    category: "interiors",
    alt: photo("Podwójna umywalka i złota armatura prysznicowa", "Double basin and brass shower fittings"),
  },
  {
    id: "interiors-lazienka-prysznic-01",
    category: "interiors",
    alt: photo("Strefa prysznica z deszczownicą", "Shower area with rain shower"),
  },

  // ---------- Exterior visualisations ----------
  {
    id: "bialka",
    category: "architecture",
    render: true,
    featured: true,
    alt: render("Osiedle Trakt Janosika z lotu ptaka, w tle Tatry", "Trakt Janosika from above, with the Tatras behind"),
  },
  {
    id: "h5",
    category: "architecture",
    render: true,
    featured: true,
    alt: render("Wjazd na ogrodzone osiedle z kamiennym murem", "Gated entrance with a stone wall"),
  },
  {
    id: "h3",
    category: "architecture",
    render: true,
    alt: render("Fasada domu z wysokim szczytem i tarasem", "House façade with tall gable and terrace"),
  },
  {
    id: "h2",
    category: "architecture",
    render: true,
    alt: render("Dom w stylu góralskim ze stromym dachem i balkonem", "Highlander-style home with steep roof and balcony"),
  },
  {
    id: "h4",
    category: "architecture",
    render: true,
    alt: render("Dom od strony ogrodu — kamień i drewno", "Garden side — stone and timber"),
  },
];
