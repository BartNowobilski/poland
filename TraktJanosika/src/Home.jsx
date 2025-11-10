import React from "react";
import { useState, useEffect, useRef } from "react";

import {
  Field,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  MountainIcon,
  TreesIcon,
  BikeIcon,
  CarIcon,
  NearbyCard,
} from "./Icons"; // adjust imports based on your file organization

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
export default function Home({ t, lang, submit, sendStatus, GOOGLE_MAPS_URL }) {
  return (
    <>
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
              "/h5.jpg",
              "/h2.jpg",
              "/h3.jpg",
              "/h4.jpg",
              "/bialka.jpg",
              "/S9.JPG",
              "/S6.JPG",
              "/S4.JPG",
              "/S5.JPG",
              "/S25.JPG",
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
            src="/h5.jpg"
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
    </>
  );
}
