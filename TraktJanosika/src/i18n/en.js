// English — secondary language. Keep keys identical to pl.js.
// Text wrapped in *asterisks* is rendered in italic accent (see <Rich>).
// Lines marked "DRAFT" are new copy written for the redesign — please review.
const en = {
  meta: {
    langName: "English",
    switchTo: "Switch language to English",
  },
  brand: {
    name: "Trakt Janosika",
    motto: "Where history meets modernity",
    homeLabel: "Trakt Janosika — home",
  },
  nav: {
    label: "Main navigation",
    about: "About",
    architecture: "Architecture",
    location: "Location",
    story: "Our Roots",
    gallery: "Gallery",
    contact: "Contact",
    contactCta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  common: {
    skipToContent: "Skip to content",
    viewOnMaps: "Open in Google Maps",
    visualisation: "Visualisation",
    approx: "approx.",
  },

  hero: {
    eyebrow: "Mountain homes in Białka Tatrzańska · Podhale",
    // DRAFT — condensed from the existing "About the Estate" copy
    intro:
      "Eight exclusive single-family homes in a private, gated community — traditional Highlander craftsmanship meets contemporary design.",
    ctaPrimary: "Discover the estate",
    scroll: "Scroll",
    scrollLabel: "Scroll to About the Estate",
    imageAlt:
      "Aerial view of Highlander-style homes in Białka Tatrzańska with the Tatra Mountains on the horizon",
  },

  facts: [
    { value: "8", label: "single-family homes" },
    { value: "160–200 m²", label: "of living space" },
    { value: "4–6", label: "bedrooms" },
    { value: "4–5", label: "bathrooms" },
  ],

  about: {
    eyebrow: "About the Estate",
    title: "Eight homes in the rhythm of *Podhale*", // DRAFT
    body: [
      "Trakt Janosika is an exclusive, gated community of eight modern homes nestled in the scenic foothills of southern Poland. Each residence ranges from 160 to 200 m² and reflects the harmony between traditional Góralskie craftsmanship and contemporary design. Buyers may fully customize their home layout—choosing between 4 to 6 bedrooms and 4 to 5 bathrooms—to suit their lifestyle.",
      "This flexibility lets every owner shape a mountain retreat that fits their needs and timeline. Trakt Janosika is currently under active construction, with completion expected within the year. Visitors and potential buyers are welcome to follow progress and explore available options for ownership and customization.",
    ],
    stagesTitle: "Homes can be purchased in several stages of completion",
    stages: [
      {
        title: "Developer’s state",
        text: "With finished exterior and utilities, allowing the buyer to complete the interior.",
      },
      {
        title: "Partially finished",
        text: "With the attic left open for future expansion.",
      },
      {
        title: "Fully finished",
        text: "Ready for move-in.",
      },
    ],
    imageAlt: "Entrance to the gated Trakt Janosika estate with a stone wall and name plaque",
    detailAlt: "Living room with fireplace and timber details — example interior",
  },

  architecture: {
    eyebrow: "Architecture",
    title: "Highlander tradition, *contemporary form*", // DRAFT
    lead: "The homes of Trakt Janosika draw on the architecture of Podhale — its steep roofs, stone and timber — and pair it with the comfort of a modern home.", // DRAFT
    pillars: [
      // DRAFT — describes what the visualisations show; no technical specs implied
      {
        title: "Roof",
        text: "Steep, multi-pitched roofs and tall gables — the signature of Podhale building tradition.",
      },
      {
        title: "Stone",
        text: "A stone plinth grounds each home in the landscape, echoing traditional Highlander houses.",
      },
      {
        title: "Timber",
        text: "Wooden details inside and out recall the skill of local carpenters and woodcarvers.",
      },
      {
        title: "Light",
        text: "Generous glazing and balconies open the interiors to daylight and mountain views.",
      },
    ],
    interiorsTitle: "Interiors with *soul*", // DRAFT
    interiorsText:
      "Natural materials, regional artistry and modern energy-efficient technologies — craftsmanship that is part of everyday life at home.", // DRAFT (reuses claims from "Our Roots")
    interiorsNote: "Example interior arrangements — visualisations.",
    alts: {
      wide: "Highlander-style home with a steep roof, stone plinth and balcony",
      front: "House façade with a tall gable and large windows",
      garden: "The garden side of a home — stone, timber and terrace",
      hall: "Hallway with timber staircase and carved trims",
      rosette: "Bedroom with a carved wooden rosette on the wall",
      mirror: "Bathroom with a mirror in a carved wooden frame",
    },
  },

  masterplan: {
    eyebrow: "Masterplan",
    title: "Eight plots, *one quiet lane*", // DRAFT
    body: [
      "The masterplan arranges eight private plots along a secure, gated lane designed for year-round comfort. Each home enjoys its own dedicated access, private land, and fully installed underground utilities, ensuring long-term reliability and convenience.",
      "The internal road and infrastructure are engineered for all seasons, including winter conditions typical for the Podhale region. Green buffers between properties enhance privacy and create a natural, harmonious environment.",
      "Every plot has been positioned to maximize sunlight exposure—especially in the living and outdoor areas—and to capture beautiful panoramic views of the surrounding mountains. The estate is designed to offer peace, privacy, and a strong connection to nature while remaining close to Białka’s most important attractions.",
    ],
    features: [
      "Secure, gated internal lane",
      "Dedicated access and private land",
      "Underground utilities",
      "Infrastructure built for winter",
      "Green buffers between plots",
      "Plots oriented to sun and views",
    ],
  },

  panorama: {
    title: "360° Panorama",
    viewerLabel: "Interactive 360° panorama of the estate",
    activate: "Explore in 360°",
    hint: "Drag to look around",
  },

  location: {
    eyebrow: "Location & Nearby",
    title: "Białka Tatrzańska, *all year round*", // DRAFT
    body: [
      "Trakt Janosika sits in an exceptional position in Białka Tatrzańska, directly along the scenic Grapa hillside. From here, the clean waters of the Białka River and the dramatic Skałki Białczańskie cliffs lie only about 0.5 km away — a peaceful walk through untouched nature.",
      "For winter and summer activities, the Kotelnica Białczańska ski area is approximately 3 km from the estate, offering dozens of slopes, snow parks, ski schools, and lift connections across the valley. The renowned Terma Bania thermal complex is also roughly 3 km away, featuring indoor and outdoor geothermal pools with panoramic mountain views.",
      "For daily amenities, Nowy Targ is just ~17 km away, while the mountain capital of Zakopane lies ~22 km from the property, making weekend trips, shopping, and cultural outings easily accessible. With forests, trails, and open landscapes surrounding the estate, this is a location that combines nature, convenience, and year-round lifestyle comfort.",
    ],
    placesLabel: "Distances from the estate",
    nearby: "on the doorstep",
    imageAlt: "Podhale landscape with the Tatra Mountains above Białka Tatrzańska",
    map: {
      title: "Map — Grapa 35, Białka Tatrzańska",
      load: "Show map",
      note: "Google Maps loads when you click.",
    },
  },

  story: {
    eyebrow: "Our Roots",
    title: "Where *Janosik* once roamed", // DRAFT
    body: [
      "Our project draws inspiration from the heritage and strength of the Podhale region. In the heart of Białka, where the legendary Janosik once roamed and the Skałki Białczańskie stand as timeless guardians of the valley, we continue a story of resilience and craftsmanship.",
      "Trakt Janosika is more than a housing development—it is a tribute to the local tradition of building with heart and purpose. By combining natural materials, regional artistry, and modern energy-efficient technologies, we create homes that honor our roots while embracing the future.",
    ],
    values: ["Heritage", "Craftsmanship", "Resilience"],
    imageAlt: "Carved wooden rosette — a motif inspired by Highlander woodcarving",
    imageCaption: "Rosette motif — example interior (visualisation)",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let’s talk about *your home*", // DRAFT
    blurb: "Leave your details and we’ll send the brochure, floorplans, and construction updates.",
    receive: ["Estate brochure", "Floor plans", "Construction updates"],
    receiveLabel: "What you’ll receive",
    directLabel: "Direct contact",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone (optional)",
    interest: "I’m interested in (optional)",
    interestGeneral: "General enquiry",
    message: "Message",
    required: "Fields marked * are required.",
    consent:
      "I consent to the processing of the personal data provided in this form in order to respond to my enquiry and send information about the development.",
    privacy:
      "The controller of your personal data is {controller}. We process your data solely to handle your enquiry, based on your consent (Art. 6(1)(a) GDPR), and for no longer than necessary. The form is operated by the third-party provider Formspree. You have the right to access, rectify and erase your data, restrict processing, withdraw consent at any time and lodge a complaint with the Polish supervisory authority (Prezes UODO).",
    privacyMore: "How we process your data",
    controllerPlaceholder: "[DATA CONTROLLER — TO BE COMPLETED]",
    send: "Send enquiry",
    sending: "Sending…",
    success: "Thank you! Your message has been sent — we’ll be in touch soon.",
    error: "There was an error sending your message. Please try again.",
    networkError: "Failed to connect to the server. Please try again later.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    imageAlt: "The garden side of a Highlander-style home",
  },

  gallery: {
    title: "Gallery",
    interior: "Interior",
    exterior: "Exterior",
    imageAlt: "{category} — visualisation {n}",
  },

  footer: {
    rights: "All rights reserved.",
    navLabel: "Footer",
    explore: "The Estate",
    contact: "Contact",
    visualisationNote: "Visualisations are for illustrative purposes only.",
  },
};

export default en;
