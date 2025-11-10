import React, { useState, useEffect, useRef } from "react";

/* =========================
   CONFIG
========================= */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkynvnr";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Lk9xgjqrWJwin7ES6";

const COPY = {
  en: {
    estateName: "Trakt Janosika",
    motto: "Where history meets modernity",
    heroCta: "Contact",
    sectionAbout: "About the Estate",
    aboutBody:
      "Trakt Janosika is an intimate, gated community of eight architect-designed homes in the foothills of southern Poland. Inspired by Góralskie craftsmanship, each residence blends natural materials, energy-efficient systems, and timeless design.",
    sectionHomes: "360° Panorama",
    sectionMasterplan: "Masterplan",
    masterplanBody:
      "Eight plots arranged along a private lane with controlled gate access, guest parking, snow-ready infrastructure, and generous green buffers.",
    sectionLocation: "Location & Nearby",
    viewOnMaps: "Open in Maps",
    sectionStory: "Our Roots",
    storyBody:
      "In the heart of Białka, where the legendary Janosik once walked and the famous Skałki Białczańskie rise above the river, we draw inspiration from our heritage. Just as these rocks stand timeless, we honor local tradition and culture while giving our homes a modern touch.",
    sectionContact: "Contact",
    contactBlurb:
      "Leave your details and we’ll send the brochure, floorplans, and construction updates.",
    downloadBrochure: "Download brochure",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone (optional)",
    message: "Message",
    send: "Send",
  },
  pl: {
    estateName: "Trakt Janosika",
    motto: "Tam, gdzie historia spotyka nowoczesność",
    heroCta: "Skontatkuj sie z nami",
    sectionAbout: "O Inwestycji",
    aboutBody:
      "Trakt Janosika to kameralne, strzeżone osiedle ośmiu domów zaprojektowanych przez architektów u podnóża gór. Inspirowane góralskim rzemiosłem, łączy naturalne materiały, energooszczędne rozwiązania i ponadczasową formę.",
    sectionHomes: "Panorama 360°",
    sectionMasterplan: "Masterplan",
    masterplanBody:
      "Osiem działek wzdłuż prywatnej drogi z kontrolowanym wjazdem, miejscami dla gości, infrastrukturą zimową i pasami zieleni.",
    sectionLocation: "Lokalizacja i Okolica",
    viewOnMaps: "Otwórz w Mapach",
    sectionStory: "Nasze Korzenie",
    storyBody:
      "W sercu Białki, gdzie niegdyś chodził legendarny Janosik, a słynne Skałki Białczańskie górują nad rzeką, czerpiemy inspirację z naszego dziedzictwa. Tak jak te skały trwają w czasie, my pielęgnujemy lokalną tradycję i kulturę, nadając naszym domom nowoczesny charakter.",
    sectionContact: "Kontakt",
    contactBlurb:
      "Zostaw dane, a wyślemy broszurę, rzuty i aktualizacje postępu prac.",
    downloadBrochure: "Pobierz broszurę",
    firstName: "Imię",
    lastName: "Nazwisko",
    phone: "Telefon (opcjonalnie)",
    message: "Wiadomość",
    send: "Wyślij",
  },
};

/* =========================
   UI BITS
========================= */
function Field({ label, name, type = "text", textarea = false, required }) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} />
      ) : (
        <input name={name} type={type} required={required} />
      )}
    </label>
  );
}

function NearbyCard({ icon: Icon, text }) {
  return (
    <div className="nearby-card">
      <Icon />
      <p>{text}</p>
    </div>
  );
}

/* Icons used */
const MountainIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path d="M3 20l7-12 4 7 2-3 5 8H3z" fill="currentColor" />
  </svg>
);
const TreesIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path d="M12 2l4 7h-3l3 5h-3l2 4H9l2-4H8l3-5H8l4-7z" fill="currentColor" />
  </svg>
);
const BikeIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <circle cx="6.5" cy="17.5" r="3.5" fill="currentColor" />
    <circle cx="17.5" cy="17.5" r="3.5" fill="currentColor" />
    <path
      d="M10 17.5h3l-3-7h5l2 3"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const CarIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path
      d="M3 14l2-5a3 3 0 012.8-2h8.4A3 3 0 0119 9l2 5v4h-2a2 2 0 01-4 0H9a2 2 0 01-4 0H3v-4z"
      fill="currentColor"
    />
  </svg>
);
const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path
      d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
      fill="currentColor"
    />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path
      d="M3 6h18v12H3z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M3 6l9 7 9-7"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
    <path
      d="M6 2h4l2 5-2 2a14 14 0 006 6l2-2 5 2v4a2 2 0 01-2 2C10 21 3 14 2 4a2 2 0 012-2z"
      fill="currentColor"
    />
  </svg>
);

/* Slideshow */
function Slideshow({ images, interval = 4000 }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((p) => (p + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval]);
  return (
    <div className="slideshow ratio-4x3" aria-label="Gallery">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={`slide ${i === index ? "active" : ""}`}
          loading="lazy"
          decoding="async"
        />
      ))}
    </div>
  );
}

/* 360° panorama (Pannellum) */
function Panorama({ src = "/pano1.jpeg", autoRotate = 1, controls = false }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  useEffect(() => {
    if (!window.pannellum || !containerRef.current) return;
    if (viewerRef.current?.destroy) viewerRef.current.destroy();
    viewerRef.current = window.pannellum.viewer(containerRef.current, {
      type: "equirectangular",
      panorama: src,
      autoLoad: true,
      autoRotate,
      showControls: controls,
      showFullscreenCtrl: controls,
      showZoomCtrl: controls,
      compass: false,
      hfov: 90,
      pitch: 0,
      yaw: 0,
    });
    return () => {
      if (viewerRef.current?.destroy) viewerRef.current.destroy();
      viewerRef.current = null;
    };
  }, [src, autoRotate, controls]);
  return (
    <div
      ref={containerRef}
      className="iframe"
      aria-label="360° panorama viewer"
    />
  );
}

/* =========================
   APP
========================= */
export default function App() {
  const [lang, setLang] = useState("pl");
  const [sendStatus, setSendStatus] = useState("idle"); // idle | sending | success | error
  const t = COPY[lang];

  // reveal-once
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setSendStatus("sending");
    try {
      const data = new FormData(e.target);
      data.append("_subject", "New inquiry from Trakt Janosika website");
      data.append("_url", window.location.href);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();

      if (res.ok) {
        setSendStatus("success");
        alert(
          lang === "pl"
            ? "Dziękujemy! Skontaktujemy się wkrótce."
            : "Thanks! We’ll be in touch soon."
        );
        e.target.reset();
      } else {
        console.error("Formspree error:", json);
        setSendStatus("error");
        alert(
          lang === "pl"
            ? "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie."
            : "There was an error sending your message. Please try again."
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setSendStatus("error");
      alert(
        lang === "pl"
          ? "Nie udało się połączyć z serwerem. Spróbuj ponownie później."
          : "Failed to connect to the server. Please try again later."
      );
    }
  }

  return (
    <div className="app">
      <style>{css}</style>

      {/* NAV */}
      <header className="nav" role="banner">
        <div className="nav-inner container">
          <a className="brand" href="#top" aria-label="Trakt Janosika – home">
            <img
              src="/logoT.PNG"
              alt="Trakt Janosika"
              className="logo"
              decoding="async"
            />
          </a>
          <div className="flex-spacer" />
          <div className="nav-actions">
            <button
              className="btn secondary"
              onClick={() => setLang(lang === "pl" ? "en" : "pl")}
              aria-label="Toggle language"
            >
              {lang === "pl" ? "EN" : "PL"}
            </button>
            <a href="#contact" className="btn">
              {t.heroCta}
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top" role="region" aria-label="Hero">
        <div className="hero-content container">
          <h1 className="hero-title">{t.estateName}</h1>
          <p className="hero-sub">{t.motto}</p>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="section reveal"
        aria-label="About the estate"
      >
        <div className="container grid stagger">
          <Slideshow
            images={[
              "/S1.JPG",
              "/S2.JPG",
              "/S3.JPG",
              "/S4.JPG",
              "/S5.JPG",
              "/S6.JPG",
              "/S8.JPG",
              "/S9.JPG",
              "/S25.JPG",
              "/S26.JPG",
              "/S27.JPG",
            ]}
          />
          <div>
            <h2 className="h2">{t.sectionAbout}</h2>
            <p className="muted">{t.aboutBody}</p>
            <ul className="features">
              <li>{lang === "pl" ? "4–5 sypialnie" : "4–5 bedrooms"}</li>
              <li>180–210 m²</li>
              <li>
                {lang === "pl"
                  ? "Energooszczędna konstrukcja"
                  : "Energy-efficient build"}
              </li>
              <li>{lang === "pl" ? "Prywatne działki" : "Private plots"}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 360° VIEW */}
      <section
        id="homes"
        className="section section-alt reveal"
        aria-label="360° Panorama"
      >
        <div className="container stagger">
          <h2
            className="h2"
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            {t.sectionHomes}
          </h2>
          <div className="iframe-wrap ratio-16x9">
            <Panorama src="/pano1.jpeg" autoRotate={1} controls={false} />
          </div>
        </div>
      </section>

      {/* MASTERPLAN */}
      <section
        id="masterplan"
        className="section reveal"
        aria-label="Masterplan"
      >
        <div className="container grid stagger">
          <img
            src="/bialka.JPG"
            alt="Aerial masterplan"
            className="img"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2 className="h2">{t.sectionMasterplan}</h2>
            <p className="muted">{t.masterplanBody}</p>
            <ul className="bullets">
              <li>
                {lang === "pl"
                  ? "Prywatna brama i monitoring"
                  : "Private entry gate and CCTV"}
              </li>
              <li>
                {lang === "pl"
                  ? "Odwodnienie i zimowy dojazd"
                  : "Snow-ready access & drainage"}
              </li>
              <li>
                {lang === "pl" ? "Media w ziemi" : "Underground utilities"}
              </li>
              <li>
                {lang === "pl"
                  ? "Strefa dzienna od południa"
                  : "South-facing living areas where feasible"}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section
        id="location"
        className="section section-alt reveal"
        aria-label="Location and nearby"
      >
        <div className="container stagger">
          <h2 className="h2">{t.sectionLocation}</h2>
          <div className="grid grid-5">
            <div className="map-wrap">
              <div className="iframe-wrap ratio-3x2 mobile-ratio-4x3">
                <iframe
                  title="Map – Grapa 35, Białka Tatrzańska"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10382.870673847287!2d20.10010108126425!3d49.41424464260443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715fa73f20c8ea5%3A0xff0c22540ea5697!2sGrapa%2035%2C%2034-405%20Bia%C5%82ka%20Tatrza%C5%84ska%2C%20Poland!5e0!3m2!1sen!2sus!4v1756944425212!5m2!1sen!2sus"
                  loading="lazy"
                  className="iframe"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="map-link">
                <MapPinIcon />
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">
                  {t.viewOnMaps}
                </a>
              </div>
            </div>

            <div className="nearby">
              <NearbyCard
                icon={MountainIcon}
                text={
                  lang === "pl"
                    ? "Stacja narciarska ~1 mila"
                    : "Ski resort ~1 mile"
                }
              />
              <NearbyCard
                icon={TreesIcon}
                text={lang === "pl" ? "Szlaki piesze" : "Hiking trails"}
              />
              <NearbyCard
                icon={BikeIcon}
                text={lang === "pl" ? "Trasy rowerowe" : "Bike routes"}
              />
              <NearbyCard
                icon={CarIcon}
                text={lang === "pl" ? "Wygodny dojazd" : "Easy access by car"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="section reveal" aria-label="Our story">
        <div className="container grid stagger">
          <div>
            <h2 className="h2">{t.sectionStory}</h2>
            <p className="muted">{t.storyBody}</p>
          </div>
          <img
            src="/janosik.jpg"
            alt="Regional heritage"
            className="img"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section section-alt reveal"
        aria-label="Contact"
      >
        <div className="container contact-grid stagger">
          <div>
            <h2 className="h2">{t.sectionContact}</h2>
            <p className="muted">{t.contactBlurb}</p>

            <div className="contact-line">
              <MailIcon /> <span>info@traktjanosika.pl</span>
            </div>
            <div className="contact-line">
              <PhoneIcon /> <span>+48 000 000 000</span>
            </div>

            <div className="spacer-sm" />
          </div>

          <form onSubmit={submit} className="form" autoComplete="on">
            <div className="grid-2">
              <Field label={t.firstName} name="firstName" required />
              <Field label={t.lastName} name="lastName" required />
            </div>
            <Field label="Email" name="email" type="email" required />
            <Field label={t.phone} name="phone" />
            <Field label={t.message} name="message" textarea />

            <button
              type="submit"
              className="btn full"
              disabled={sendStatus === "sending"}
              aria-busy={sendStatus === "sending"}
              style={{ marginTop: 12 }}
            >
              {sendStatus === "sending"
                ? lang === "pl"
                  ? "Wysyłanie…"
                  : "Sending…"
                : t.send}
            </button>

            <p
              className="muted"
              style={{ marginTop: 8, minHeight: 22 }}
              aria-live="polite"
              role="status"
            >
              {sendStatus === "success" &&
                (lang === "pl" ? "Wiadomość wysłana!" : "Message sent!")}
              {sendStatus === "error" &&
                (lang === "pl"
                  ? "Błąd podczas wysyłania."
                  : "Error sending message.")}
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} {t.estateName}.{" "}
            {lang === "pl"
              ? "Wszelkie prawa zastrzeżone."
              : "All rights reserved."}
          </p>
          <nav className="footer-nav" aria-label="Footer">
            <a href="#about">{t.sectionAbout}</a>
            <a href="#homes">{t.sectionHomes}</a>
            <a href="#location">{t.sectionLocation}</a>
            <a href="#contact">{t.sectionContact}</a>
          </nav>
        </div>
      </footer>

      <style>{css}</style>
    </div>
  );
}

/* =========================
   CSS
========================= */
const css = `
:root{
  --bg:#f3efe7; --panel:#fffaf2; --panel-2:#f0e7d8; --text:#2a2115;
  --muted:#6b5e4a; --border:#e2d6c5; --brand:#a86e3e;
  --radius:16px; --shadow:0 6px 30px rgba(77,58,35,.15);
  --maxw:1200px; --safe-top:env(safe-area-inset-top,0px);
  --nav:72px;
}

/* base */
*{box-sizing:border-box}
html{scroll-behavior:smooth; scroll-padding-top:var(--nav)}
body,#root,.app{
  margin:0; min-height:100vh; background:var(--bg); color:var(--text);
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
}
img{max-width:100%; display:block}
a{color:inherit; text-decoration:none}
.container{max-width:var(--maxw); margin:0 auto; padding:0 16px}

/* buttons */
.btn{background:var(--brand); color:#fff; border:1px solid transparent;
  padding:12px 18px; border-radius:999px; display:inline-flex; align-items:center; gap:8px;
  font-weight:600; cursor:pointer; transition:transform .06s, filter .15s; touch-action:manipulation;}
.btn:hover{filter:brightness(1.06); transform:translateY(-1px)}
.btn.secondary{background:transparent; color:var(--text); border:1px solid var(--border)}
.btn.full{width:100%}

/* nav */
.nav{position:sticky; top:0; z-index:50; backdrop-filter:blur(8px);
  background:rgba(243,239,231,.85); border-bottom:1px solid var(--border); padding-top:var(--safe-top)}
.nav-inner{display:flex; align-items:center; justify-content:flex-start; gap:12px; width:100%; padding:10px 0}
.brand{flex:0 0 auto}
.flex-spacer{flex:1 1 auto}
.nav-actions{display:inline-flex; align-items:center; gap:8px}
.logo{height:100px; width:auto}

/* hero with bottom fade */
.hero{
  position:relative;
  background:
    linear-gradient(to bottom, rgba(243,239,231,0) 65%, rgba(243,239,231,1) 100%),
    url('/bialka.JPG') center/cover no-repeat;
}
.hero-content{position:relative; padding:clamp(64px,10vw,120px) 0; display:flex; flex-direction:column; align-items:flex-start; text-align:left; gap:.25rem}
.hero-title{
  font-size:clamp(36px,6vw,64px); font-weight:300; margin:0; text-transform:uppercase; letter-spacing:.2em;
  text-shadow:2px 2px 8px rgba(0,0,0,.35); background:rgba(255,250,240,.7);
  padding:4px 12px; border-radius:6px; display:inline-block;
}
.hero-sub{
  font-size:clamp(14px,2.4vw,20px); font-weight:300; margin:6px 0 0 0; text-transform:uppercase; letter-spacing:.15em;
  text-shadow:1px 1px 4px rgba(0,0,0,.25); background:rgba(255,250,240,.6);
  padding:3px 10px; border-radius:6px; display:inline-block;
}

/* sections */
.section{padding:clamp(40px,6vw,72px) 0; background:var(--panel)}
.section-alt{background:var(--panel-2)}
.h2{font-size:clamp(24px,3.5vw,32px); margin:0 0 8px 0}
.muted{color:var(--muted); line-height:1.7; margin-top:12px}

/* grids */
.grid{display:grid; grid-template-columns:1fr; gap:16px; align-items:center}
.grid-5{display:grid; grid-template-columns:1fr; gap:16px}
@media(min-width:880px){
  .grid{grid-template-columns:1fr 1fr; gap:24px}
  .grid-5{grid-template-columns:3fr 2fr}
}

/* visuals: images / slideshow / pano / map */
.img,.slideshow,.iframe-wrap{
  position:relative; width:100%; background:#e9e1d4; border:1px solid var(--border);
  border-radius:var(--radius); overflow:hidden;
  box-shadow:0 14px 38px rgba(77,58,35,.28), 0 6px 18px rgba(77,58,35,.2);
}
.iframe-wrap:hover{transform:translateY(-3px); box-shadow:0 20px 46px rgba(77,58,35,.32), 0 8px 22px rgba(77,58,35,.25); transition:all .25s ease}
.ratio-16x9{aspect-ratio:16/9}
.ratio-4x3{aspect-ratio:4/3}
.ratio-3x2{aspect-ratio:3/2}
.mobile-ratio-4x3{aspect-ratio:4/3}
@media(min-width:720px){.mobile-ratio-4x3{aspect-ratio:3/2}}
.iframe{position:absolute; inset:0; width:100%; height:100%; border:0; border-radius:inherit}

/* features/bullets */
.features{display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; margin-top:14px; padding:0; list-style:none; color:#4a3b28}
.bullets{margin:12px 0 0 18px; color:#4a3b28; line-height:1.7}

/* nearby */
.map-link{display:flex; align-items:center; gap:8px; color:#4a3b28; margin-top:10px}
.svg{width:18px; height:18px; display:inline-block; color:#5d462d}
.nearby{display:grid; gap:12px; grid-template-columns:1fr}
.nearby-card{background:var(--panel); border:1px solid var(--border); border-radius:14px; padding:12px; color:#4a3b28}

/* contact */
.contact-grid{display:grid; grid-template-columns:1fr; gap:16px}
@media(min-width:860px){.contact-grid{grid-template-columns:1.1fr 1fr; gap:24px}}
.contact-line{display:flex; align-items:center; gap:8px; color:#4a3b28; margin-top:10px}
.spacer-sm{height:12px}
.form{background:var(--panel); border:1px solid var(--border); border-radius:var(--radius); padding:20px; box-shadow:0 10px 25px rgba(77,58,35,.18)}
.field{display:flex; flex-direction:column; gap:6px; margin-top:12px}
.label{color:#3a2f20; font-size:.95rem; font-weight:600}
input,textarea{width:100%; background:#fcf8f0; border:1px solid var(--border); border-radius:10px; padding:12px 14px; font-family:inherit; font-size:1rem}
input:focus,textarea:focus{border-color:#cfb79f; box-shadow:0 0 0 2px rgba(200,160,120,.25); outline:none}

/* slideshow */
.slideshow{position:relative; overflow:hidden}
.slideshow img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity .8s ease}
.slideshow img.active{opacity:1}

/* full-width sections + blended seams */
.section,.section-alt{width:100%; margin:0; position:relative}
.container{max-width:none; width:100%; padding-left:clamp(16px,4vw,80px); padding-right:clamp(16px,4vw,80px)}
@media(min-width:1280px){.grid,.grid-5{column-gap:clamp(32px,4vw,80px)}}
.section + .section-alt::before{
  content:""; position:absolute; left:0; right:0; top:-28px; height:40px; pointer-events:none;
  background:linear-gradient(to bottom, var(--panel) 0%, var(--panel-2) 100%);
}
.section-alt + .section::before{
  content:""; position:absolute; left:0; right:0; top:-28px; height:40px; pointer-events:none;
  background:linear-gradient(to bottom, var(--panel-2) 0%, var(--panel) 100%);
}

/* reveal */
.reveal{opacity:0; transform:translateY(8px); will-change:opacity,transform; transition:opacity .55s cubic-bezier(.22,.61,.36,1), transform .55s cubic-bezier(.22,.61,.36,1)}
.reveal.is-visible{opacity:1; transform:none}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .reveal{opacity:1 !important; transform:none !important; transition:none !important}
}

/* footer */
.footer{border-top:1px solid var(--border); background:#efe8dc}
.footer-inner{display:flex; flex-direction:column; gap:12px; justify-content:space-between; padding:24px 0}
@media(min-width:800px){.footer-inner{flex-direction:row; align-items:center}}
.footer-nav{display:flex; gap:16px; color:#4a3b28; flex-wrap:wrap}
.form input,
.form textarea {
  color: #000 !important;
  caret-color: #000;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 24px; /* ⬅️ adds side padding */
}
  @media (min-width: 800px) {
  .footer-inner {
    flex-direction: row;
    align-items: center;
    text-align: left;
  }
}
`;
