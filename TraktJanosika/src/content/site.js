/* =========================================================
   Site-wide facts & integrations. Single source of truth —
   components read from here, never hardcode these values.
   ========================================================= */

export const SITE = {
  name: "Trakt Janosika",
  url: "https://www.traktjanosika.pl",

  contact: {
    email: "info@traktjanosika.pl",
    // PLACEHOLDER — the live site shows "+48 000 000 000". Set the real number
    // (e.g. "+48 600 000 000"); while null, phone details are hidden everywhere.
    phone: null,
  },

  address: {
    street: "Grapa 35",
    postalCode: "34-405",
    locality: "Białka Tatrzańska",
    country: "PL",
  },

  // PLACEHOLDER — GDPR data controller (administrator danych osobowych).
  // Needed for the consent notice under the contact form.
  dataController: {
    name: null, // e.g. "Trakt Janosika sp. z o.o."
    address: null,
    nip: null,
  },

  maps: {
    shareUrl: "https://maps.app.goo.gl/Lk9xgjqrWJwin7ES6",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10382.870673847287!2d20.10010108126425!3d49.41424464260443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715fa73f20c8ea5%3A0xff0c22540ea5697!2sGrapa%2035%2C%2034-405%20Bia%C5%82ka%20Tatrza%C5%84ska%2C%20Poland!5e0!3m2!1sen!2sus!4v1756944425212!5m2!1sen!2sus",
  },

  integrations: {
    formspreeEndpoint: "https://formspree.io/f/mdkynvnr",
  },
};

/** "+48 600 000 000" → "tel:+48600000000" */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
