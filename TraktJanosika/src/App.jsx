import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Gallery from "./Gallery";
import Home from "./Home";
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
    heroCta: "Skontatkuj sie",
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
   APP
========================= */
export default function App() {
  const { pathname } = useLocation();
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
  }, [pathname]);

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
          <Link
            to="/"
            className="brand"
            aria-label="Trakt Janosika – home"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img src="/logoT.PNG" alt="Trakt Janosika" className="logo" />
          </Link>
          <div className="flex-spacer" />
          <div className="nav-actions">
            <Link
              to="/"
              className="btn secondary"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              Home
            </Link>

            <Link to="/gallery" className="btn secondary">
              Gallery
            </Link>
            <button
              className="btn secondary"
              onClick={() => setLang(lang === "pl" ? "en" : "pl")}
              aria-label="Toggle language"
            >
              {lang === "pl" ? "EN" : "PL"}
            </button>
            <Link
              to="/#contact"
              className="btn"
              onClick={() => {
                // Wait a tiny bit so React renders the Home page first, then scroll
                setTimeout(() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              {t.heroCta}
            </Link>
          </div>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              t={t}
              lang={lang}
              submit={submit}
              sendStatus={sendStatus}
              GOOGLE_MAPS_URL={GOOGLE_MAPS_URL}
            />
          }
        />
        <Route path="/gallery" element={<Gallery lang={lang} />} />
      </Routes>
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
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
  background: rgba(243,239,231,.85);
  border-bottom: 1px solid var(--border);
  padding-top: var(--safe-top);
}

/* Make the inner bar a proper flex row */
.nav-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  width: 100%;
}

/* Brand (logo) pinned left */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10x;
  min-width: 0;
}

/* Push actions all the way right */
.flex-spacer { flex: 1 1 auto; }
.nav-actions {
  margin-left: auto;             /* <-- key for right alignment */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
}

/* Logo sizing */
.logo { height: 64px; width: auto; }

/* Keep buttons compact and on one line */
.nav-actions .btn { white-space: nowrap; }

/* Phone tweaks */
@media (max-width: 640px) {
  .logo { height: 65px; }
  .nav-inner { padding: 8px 0; }
  .nav-actions .btn { padding: 8px 8px; font-size: 14px; }
  .nav-actions .btn.secondary { padding: 8px 8px; }
  /* If buttons still squeeze, allow slight wrap without breaking layout */
  .nav-actions { flex-wrap: wrap; row-gap: 6px; justify-content: flex-end; }
}
/* hero with bottom fade */
.hero{
  position:relative;
  background:
    linear-gradient(to bottom, rgba(243,239,231,0) 65%, rgba(243,239,231,1) 100%),
    url('/bialka.jpg') center/cover no-repeat;
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
