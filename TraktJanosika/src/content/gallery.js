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
const photoOct = (pl, en) => ({ pl: `${pl} — zdjęcie, październik 2026`, en: `${en} — photo, October 2026` });
const photoUndated = (pl, en) => ({ pl: `${pl} — zdjęcie`, en: `${en} — photo` });

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

  {
    id: "architecture-dach-szczyt-01",
    category: "architecture",
    alt: photoOct("Góralski szczyt dachu z drewnianym okapem", "Highlander roof gable with timber eaves"),
  },

  // ---------- Photos: interiors (October 2026, professional shoot) ----------
  {
    id: "interiors-salon-zyrandol-03",
    category: "interiors",
    featured: true,
    alt: photoOct("Kryształowy żyrandol pod drewnianymi belkami stropu", "Crystal chandelier beneath timber ceiling beams"),
  },
  {
    id: "interiors-lazienka-lustro-02",
    category: "interiors",
    featured: true,
    alt: photoOct("Łazienka z podwójną umywalką, złotą armaturą i okrągłym podświetlanym lustrem", "Bathroom with double basin, brass taps and round backlit mirror"),
  },
  {
    id: "interiors-schody-01",
    category: "interiors",
    alt: photoOct("Drewniane schody na poddasze", "Timber staircase to the attic"),
  },
  {
    id: "interiors-salon-zyrandol-01",
    category: "interiors",
    alt: photoOct("Salon z drewnianymi belkami i kryształowym żyrandolem", "Living room with timber beams and crystal chandelier"),
  },
  {
    id: "interiors-lazienka-lustro-01",
    category: "interiors",
    alt: photoOct("Okrągłe lustro z podświetleniem nad podwójną umywalką", "Round backlit mirror above a double basin"),
  },
  {
    id: "interiors-lazienka-umywalka-kamien-01",
    category: "interiors",
    alt: photoOct("Łazienka z kamienną umywalką wolnostojącą i prysznicem", "Bathroom with freestanding stone basin and shower"),
  },
  {
    id: "interiors-sufit-drewno-01",
    category: "interiors",
    alt: photoOct("Drewniany sufit i szklana lampa", "Timber ceiling and glass pendant light"),
  },
  {
    id: "interiors-salon-zyrandol-02",
    category: "interiors",
    alt: photoOct("Żyrandol z kryształowych gałązek", "Chandelier of crystal branches"),
  },
  {
    id: "interiors-lazienka-lustro-03",
    category: "interiors",
    alt: photoOct("Łazienka z podwójną umywalką i podświetlaną wnęką", "Bathroom with double basin and lit niche"),
  },
  {
    id: "interiors-lazienka-umywalka-kamien-02",
    category: "interiors",
    alt: photoOct("Kamienna umywalka i czarna armatura", "Stone basin and black fittings"),
  },
  {
    id: "interiors-pokoj-poddasze-01",
    category: "interiors",
    alt: photoOct("Pokój na poddaszu widziany przez drewnianą ościeżnicę", "Attic room seen through a timber door frame"),
  },
  {
    id: "interiors-lazienka-lustro-04",
    category: "interiors",
    alt: photoOct("Podwójna umywalka i lustro z podświetleniem", "Double basin and backlit mirror"),
  },
  {
    id: "interiors-lazienka-umywalka-kamien-03",
    category: "interiors",
    alt: photoOct("Łazienka z okrągłym lustrem i kamienną umywalką", "Bathroom with round mirror and stone basin"),
  },
  {
    id: "interiors-schody-02",
    category: "interiors",
    alt: photoOct("Drewniane schody — widok z góry", "Timber staircase seen from above"),
  },

  // ---------- Photos: interiors ----------
  {
    id: "interiors-lazienka-poddasze-01",
    category: "interiors",
    featured: true,
    alt: photoUndated("Łazienka na poddaszu z wanną wolnostojącą i drewnianymi ramami okien", "Attic bathroom with freestanding bath and timber window frames"),
  },
  {
    id: "interiors-kuchnia-01",
    category: "interiors",
    alt: photoUndated("Kuchnia z wyspą i drewnianym sufitem", "Kitchen with island and timber ceiling"),
  },
  {
    id: "interiors-salon-01",
    category: "interiors",
    featured: true,
    alt: photoUndated("Salon z kominkiem, drewnianymi belkami i żyrandolem", "Living room with fireplace, timber beams and chandelier"),
  },
  {
    id: "interiors-salon-kominek-01",
    category: "interiors",
    alt: photoUndated("Ściana z kominkiem pod wysokim sufitem z belkami", "Fireplace wall under a high beamed ceiling"),
  },
  {
    id: "interiors-lazienka-umywalka-02",
    category: "interiors",
    alt: photo("Łazienka z podwójną umywalką i okrągłym podświetlanym lustrem", "Bathroom with double basin and round backlit mirror"),
  },
  {
    id: "interiors-lazienka-wanna-01",
    category: "interiors",
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
