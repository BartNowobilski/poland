// Polish — primary language. Keep keys identical to en.js.
// Text wrapped in *asterisks* is rendered in italic accent (see <Rich>).
// Paragraph arrays preserve the original site copy, split at its natural breaks.
// Lines marked "DRAFT" are new copy written for the redesign — please review.
const pl = {
  meta: {
    title: "Trakt Janosika — domy w stylu góralskim w Białce Tatrzańskiej",
    description:
      "Trakt Janosika to ekskluzywne, ogrodzone osiedle ośmiu domów jednorodzinnych w Białce Tatrzańskiej na Podhalu (gmina Bukowina Tatrzańska). Domy 160–200 m² łączące góralskie rzemiosło z nowoczesną architekturą.",
    galleryTitle: "Galeria — wizualizacje domów i wnętrz | Trakt Janosika",
    galleryDescription:
      "Galeria Trakt Janosika: wizualizacje domów w stylu góralskim, wnętrz i osiedla w Białce Tatrzańskiej oraz zdjęcia z postępu budowy.",
    notFoundTitle: "Nie znaleziono strony | Trakt Janosika",
    langName: "Polski",
    switchTo: "Zmień język na polski",
  },
  brand: {
    name: "Trakt Janosika",
    motto: "Tam, gdzie historia spotyka nowoczesność",
    homeLabel: "Trakt Janosika — strona główna",
  },
  nav: {
    label: "Nawigacja główna",
    about: "O inwestycji",
    architecture: "Architektura",
    homes: "Domy",
    masterplan: "Masterplan",
    progress: "Postęp budowy",
    location: "Lokalizacja",
    story: "Nasze korzenie",
    gallery: "Galeria",
    contact: "Kontakt",
    contactCta: "Skontaktuj się",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    language: "Język",
  },
  common: {
    skipToContent: "Przejdź do treści",
    viewOnMaps: "Otwórz w Mapach Google",
    visualisation: "Wizualizacja",
    approx: "ok.",
  },

  hero: {
    eyebrow: "Domy w Białce Tatrzańskiej · Podhale",
    // DRAFT — condensed from the existing "O inwestycji" copy
    intro:
      "Osiem ekskluzywnych domów jednorodzinnych w ogrodzonym osiedlu — góralskie rzemiosło połączone z nowoczesną architekturą.",
    ctaPrimary: "Odkryj inwestycję",
    scroll: "Przewiń",
    scrollLabel: "Przewiń do sekcji O inwestycji",
    imageAlt:
      "Widok z lotu ptaka na domy w stylu góralskim w Białce Tatrzańskiej, w tle panorama Tatr",
  },

  facts: [
    { value: "8", label: "domów jednorodzinnych" },
    { value: "160–200 m²", label: "powierzchni domu" },
    { value: "4–6", label: "sypialni" },
    { value: "4–5", label: "łazienek" },
  ],

  about: {
    eyebrow: "O inwestycji",
    title: "Osiem domów w rytmie *Podhala*", // DRAFT
    body: [
      "Trakt Janosika to ekskluzywne, ogrodzone osiedle ośmiu nowoczesnych domów położonych u podnóża malowniczych gór południowej Polski. Każdy dom ma powierzchnię od 160 do 200 m² i łączy w sobie góralskie rzemiosło z nowoczesną architekturą. Kupujący mogą w pełni dostosować układ domu — wybierając od 4 do 6 sypialni oraz od 4 do 5 łazienek — tak, aby najlepiej odpowiadał ich potrzebom i stylowi życia.",
      "Dzięki tej elastyczności każdy właściciel może stworzyć dom dokładnie taki, jakiego potrzebuje — dopasowany do harmonogramu i budżetu. Inwestycja jest obecnie w trakcie budowy, a jej zakończenie planowane jest w ciągu najbliższego roku.",
    ],
    stagesTitle: "Domy dostępne są w różnych etapach wykończenia",
    stages: [
      {
        title: "Stan deweloperski",
        text: "Z ukończoną elewacją i mediami, z możliwością samodzielnego wykończenia wnętrz.",
      },
      {
        title: "Częściowo wykończony",
        text: "Z niezaadaptowanym poddaszem, np. 4 sypialnie zamiast 5 lub 6.",
      },
      {
        title: "W pełni wykończony",
        text: "Gotowy do zamieszkania.",
      },
    ],
    imageAlt: "Wjazd na ogrodzone osiedle Trakt Janosika z kamiennym murem i tablicą z nazwą",
    detailAlt: "Salon z kominkiem i drewnianymi detalami — przykładowa aranżacja wnętrza",
  },

  architecture: {
    eyebrow: "Architektura",
    title: "Góralska tradycja, *współczesna forma*", // DRAFT
    lead: "Domy Trakt Janosika czerpią z architektury Podhala — z jej stromych dachów, kamienia i drewna — i łączą ją z wygodą nowoczesnego domu.", // DRAFT
    pillars: [
      // DRAFT — describes what the visualisations show; no technical specs implied
      {
        title: "Dach",
        text: "Strome, wielospadowe dachy i wysokie szczyty — znak rozpoznawczy podhalańskiego budownictwa.",
      },
      {
        title: "Kamień",
        text: "Kamienna podmurówka osadza dom w krajobrazie i nawiązuje do tradycyjnych góralskich domów.",
      },
      {
        title: "Drewno",
        text: "Drewniane detale elewacji i wnętrz przypominają o kunszcie lokalnych cieśli i snycerzy.",
      },
      {
        title: "Światło",
        text: "Duże przeszklenia i balkony otwierają wnętrza na światło i widok gór.",
      },
    ],
    interiorsTitle: "Wnętrza z *duszą*", // DRAFT
    interiorsText:
      "Naturalne materiały, regionalne wzornictwo i nowoczesne, energooszczędne rozwiązania — rzemiosło obecne w codziennym życiu domu.", // DRAFT (reuses claims from "Nasze korzenie")
    interiorsNote: "Przykładowe aranżacje wnętrz — wizualizacje.",
    alts: {
      wide: "Dom w stylu góralskim ze stromym dachem, kamienną podmurówką i balkonem",
      front: "Fasada domu z wysokim szczytem i dużymi przeszkleniami",
      garden: "Dom od strony ogrodu — kamień, drewno i taras",
      hall: "Hol z drewnianymi schodami i rzeźbionymi listwami",
      rosette: "Sypialnia z rzeźbioną drewnianą rozetą na ścianie",
      mirror: "Łazienka z lustrem w rzeźbionej drewnianej ramie",
    },
  },

  masterplan: {
    eyebrow: "Masterplan",
    title: "Osiem działek, *jedna spokojna droga*", // DRAFT
    body: [
      "Masterplan inwestycji obejmuje osiem prywatnych działek rozmieszczonych wzdłuż bezpiecznej, ogrodzonej drogi wewnętrznej przystosowanej do całorocznego użytkowania. Każdy dom posiada własny, niezależny wjazd, prywatną działkę oraz pełne uzbrojenie terenu z mediami poprowadzonymi w ziemi, zapewniając wygodę i niezawodność na lata.",
      "Infrastruktura osiedla została zaprojektowana z myślą o warunkach Podhala — w tym o typowej zimowej aurze — aby zapewnić komfort i bezpieczeństwo dojazdu przez cały rok. Pasy zieleni pomiędzy działkami zwiększają prywatność i tworzą harmonijne otoczenie.",
      "Układ działek został zaplanowany tak, aby maksymalnie wykorzystać naturalne nasłonecznienie, szczególnie w częściach dziennych i na tarasach, oraz podkreślić widoki na okoliczne góry. Osiedle oferuje spokój, prywatność oraz bliskość natury, pozostając jednocześnie niedaleko głównych atrakcji Białki.",
    ],
    features: [
      "Ogrodzona droga wewnętrzna",
      "Własny wjazd i prywatna działka",
      "Media poprowadzone w ziemi",
      "Infrastruktura przystosowana do zimy",
      "Pasy zieleni między działkami",
      "Działki zorientowane na słońce i widoki",
    ],
  },

  panorama: {
    title: "Panorama 360°",
    viewerLabel: "Interaktywna panorama 360° osiedla",
    activate: "Obracaj panoramę",
    hint: "Przeciągnij, aby się rozejrzeć",
  },

  location: {
    eyebrow: "Lokalizacja i okolica",
    title: "Białka Tatrzańska, *przez cały rok*", // DRAFT
    body: [
      "Trakt Janosika znajduje się w wyjątkowej lokalizacji w Białce Tatrzańskiej, bezpośrednio na malowniczym zboczu Grapy. Od czystej rzeki Białki i imponujących skałek Skałki Białczańskie dzieli inwestycję jedynie około 0,5 km — idealnie na spokojny spacer w otoczeniu natury.",
      "Dla miłośników sportów zimowych i letnich, główny ośrodek narciarski Kotelnica Białczańska znajduje się w odległości około 3 km, oferując dziesiątki tras, snowparki, szkoły narciarskie oraz połączenia wyciągów w całej dolinie. Również około 3 km od osiedla położony jest kompleks Terma Bania z basenami termalnymi wewnętrznymi i zewnętrznymi oraz widokami na Tatry.",
      "Do pełnego zaplecza usługowego Nowego Targu jest około 17 km, a do stolicy Podhala — Zakopanego — około 22 km, co zapewnia wygodny dostęp do sklepów, atrakcji i wydarzeń kulturowych. Dzięki otaczającym lasom, szlakom i przestrzeni, lokalizacja łączy naturę, wygodę i całoroczny komfort życia.",
    ],
    placesLabel: "Odległości od osiedla",
    nearby: "tuż obok",
    imageAlt: "Krajobraz Podhala z panoramą Tatr nad Białką Tatrzańską",
    map: {
      title: "Mapa — Grapa 35, Białka Tatrzańska",
      load: "Pokaż mapę",
      note: "Mapa Google zostanie wczytana po kliknięciu.",
    },
  },

  story: {
    eyebrow: "Nasze korzenie",
    title: "Tam, gdzie wędrował *Janosik*", // DRAFT
    body: [
      "Inspiracją dla projektu Trakt Janosika jest bogata tradycja i siła regionu Podhala. W sercu Białki, gdzie niegdyś wędrował legendarny Janosik, a nad rzeką górują Skałki Białczańskie, kontynuujemy opowieść o rzemiośle, pasji i trwałości.",
      "Trakt Janosika to nie tylko inwestycja mieszkaniowa — to hołd dla lokalnych tradycji budownictwa, w którym łączymy naturalne materiały, regionalne wzornictwo i nowoczesne, energooszczędne rozwiązania.",
      "W ten sposób powstają domy, które z szacunkiem odnoszą się do przeszłości, a jednocześnie patrzą w przyszłość.",
    ],
    values: ["Tradycja", "Rzemiosło", "Trwałość"],
    imageAlt: "Rzeźbiona drewniana rozeta — motyw inspirowany góralską snycerką",
    imageCaption: "Motyw rozety — przykładowa aranżacja wnętrza (wizualizacja)",
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Porozmawiajmy o *Twoim domu*", // DRAFT
    blurb: "Zostaw dane, a wyślemy broszurę, rzuty i aktualizacje postępu prac.",
    receive: ["Broszura inwestycji", "Rzuty domów", "Aktualizacje postępu prac"],
    receiveLabel: "Co otrzymasz",
    directLabel: "Kontakt bezpośredni",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "E-mail",
    phone: "Telefon (opcjonalnie)",
    interest: "Interesuje mnie (opcjonalnie)",
    interestGeneral: "Ogólne zapytanie",
    message: "Wiadomość",
    required: "Pola oznaczone * są wymagane.",
    consent:
      "Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w formularzu w celu udzielenia odpowiedzi na zapytanie i przesłania materiałów o inwestycji.",
    privacy:
      "Administratorem Twoich danych osobowych jest {controller}. Dane przetwarzamy wyłącznie w celu obsługi zapytania, na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO), nie dłużej niż jest to potrzebne. Formularz obsługuje zewnętrzny dostawca Formspree. Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, wycofania zgody w dowolnym momencie oraz wniesienia skargi do Prezesa UODO.",
    privacyMore: "Informacja o przetwarzaniu danych",
    controllerPlaceholder: "[ADMINISTRATOR DANYCH — DO UZUPEŁNIENIA]",
    send: "Wyślij zapytanie",
    sending: "Wysyłanie…",
    success: "Dziękujemy! Wiadomość została wysłana — skontaktujemy się wkrótce.",
    error: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.",
    networkError: "Nie udało się połączyć z serwerem. Spróbuj ponownie później.",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    addressLabel: "Adres",
    imageAlt: "Dom w stylu góralskim od strony ogrodu",
  },

  residences: {
    eyebrow: "Domy",
    title: "Osiem domów, *każdy własny*", // DRAFT
    lead: "Każdy dom stoi na prywatnej działce z własnym, niezależnym wjazdem. Szczegółowe metraże, rzuty i dostępność poszczególnych domów opublikujemy wkrótce — zapytaj, a prześlemy aktualne informacje.", // DRAFT (facts from Masterplan copy)
    listLabel: "Lista domów",
    floorArea: "Powierzchnia domu",
    plotArea: "Powierzchnia działki",
    bedrooms: "Sypialnie",
    bathrooms: "Łazienki",
    tbc: "do potwierdzenia",
    status: {
      available: "Dostępny",
      reserved: "Rezerwacja",
      sold: "Sprzedany",
      unknown: "Zapytaj o dostępność",
    },
    details: "Szczegóły",
    inquire: "Zapytaj o ten dom",
    floorPlans: "Rzuty",
    gallery: "Galeria",
    specs: "Specyfikacja",
    close: "Zamknij",
    imageAlt: "Domy Trakt Janosika — wizualizacja osiedla",
  },

  progress: {
    eyebrow: "Postęp budowy",
    title: "Dom po domu, *etap po etapie*", // DRAFT
    lead: "Śledź postęp prac na Trakcie Janosika — od fundamentów po wykończenie.", // DRAFT
    emptyTitle: "Pierwsza relacja z budowy już wkrótce",
    emptyText: "Inwestycja jest obecnie w trakcie budowy. Niedługo opublikujemy tu zdjęcia i opisy kolejnych etapów prac.",
    subscribe: "Zapisz się na aktualizacje",
    milestone: "Kamień milowy",
    showOlder: "Pokaż starsze wpisy",
    photos: "Zdjęcia: {n}",
    openPhoto: "Powiększ zdjęcie: {alt}",
  },

  galleryPreview: {
    eyebrow: "Galeria",
    title: "Zobacz *Trakt Janosika*", // DRAFT
    lead: "Architektura, wnętrza i krajobraz Podhala — w wizualizacjach, a wkrótce także na zdjęciach z budowy.", // DRAFT
    cta: "Zobacz całą galerię",
  },

  gallery: {
    title: "Galeria",
    lead: "Wizualizacje architektury i wnętrz, okolica oraz zdjęcia z postępu prac.", // DRAFT
    all: "Wszystkie",
    filterLabel: "Filtruj według kategorii",
    showMore: "Pokaż więcej",
    count: "Zdjęcia: {n}",
    open: "Powiększ: {alt}",
    close: "Zamknij galerię",
    prev: "Poprzednie zdjęcie",
    next: "Następne zdjęcie",
    lightboxLabel: "Galeria zdjęć",
    empty: "Brak zdjęć w tej kategorii.",
  },

  notFound: {
    title: "Nie znaleziono strony",
    text: "Strona, której szukasz, nie istnieje lub została przeniesiona.",
    home: "Wróć na stronę główną",
  },

  footer: {
    rights: "Wszelkie prawa zastrzeżone.",
    navLabel: "Stopka",
    explore: "Inwestycja",
    contact: "Kontakt",
    visualisationNote: "Prezentowane wizualizacje mają charakter poglądowy.",
  },
};

export default pl;
