import { useEffect, useRef, useState } from "react";
import { format, useLanguage } from "./i18n/context";
import { SITE } from "./content/site";
import { useInquiry } from "./lib/useInquiry";
import { useSectionLink } from "./lib/useSectionLink";
import { Section, SectionHeading } from "./components/layout/Section";
import Ornament from "./components/layout/Ornament";
import Reveal from "./components/motion/Reveal";
import Picture from "./components/media/Picture";
import Button from "./components/ui/Button";
import Field from "./components/ui/Field";
import {
  ArrowDownIcon,
  BikeIcon,
  CarIcon,
  MailIcon,
  MapPinIcon,
  SkiIcon,
  SpaIcon,
  WaterIcon,
} from "./components/ui/Icon";
import "./Home.css";

const SLIDES = [
  "/h5.jpg",
  "/h2.jpg",
  "/h3.jpg",
  "/h4.jpg",
  "/bialka.jpg",
  "/S9.jpg",
  "/S6.jpg",
  "/S4.jpg",
  "/S5.jpg",
  "/S25.jpg",
];

const NEARBY = [
  { key: "ski", Icon: SkiIcon },
  { key: "terma", Icon: SpaIcon },
  { key: "river", Icon: WaterIcon },
  { key: "bike", Icon: BikeIcon },
  { key: "towns", Icon: CarIcon },
];

/* Crossfading slideshow — only mounts images it has reached, pauses offscreen. */
function Slideshow({ images, interval = 5000, label, altFor }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(() => new Set([0, 1]));
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % images.length;
        setSeen((s) => new Set(s).add(next).add((next + 1) % images.length));
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [visible, images.length, interval]);

  return (
    <div ref={ref} className="slideshow" role="region" aria-roledescription="carousel" aria-label={label}>
      {images.map((src, i) =>
        seen.has(i) ? (
          <img
            key={src}
            src={src}
            alt={altFor(i + 1)}
            className={i === index ? "is-active" : ""}
            aria-hidden={i !== index}
            loading="lazy"
            decoding="async"
          />
        ) : null
      )}
      <div className="slideshow__dots" aria-hidden="true">
        {images.map((src, i) => (
          <span key={src} className={i === index ? "is-active" : ""} />
        ))}
      </div>
    </div>
  );
}

/* 360° panorama (Pannellum) */
function Panorama({ src = "/pano1.jpeg", autoRotate = 1, controls = false, label }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  useEffect(() => {
    if (!window.pannellum || !containerRef.current) return;
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
      viewerRef.current?.destroy?.();
      viewerRef.current = null;
    };
  }, [src, autoRotate, controls]);
  return <div ref={containerRef} className="panorama__viewer" aria-label={label} />;
}

export default function Home() {
  const { t } = useLanguage();
  const go = useSectionLink();
  const { status, submit } = useInquiry();

  const statusText = {
    success: t.contact.success,
    error: t.contact.error,
    "network-error": t.contact.networkError,
  }[status];

  return (
    <>
      {/* HERO */}
      <section className="hero on-dark" id="top" aria-labelledby="hero-title">
        <Picture
          image="/bialka.jpg"
          alt=""
          priority
          className="hero__media"
        />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__content container">
          <Reveal variant="fade">
            <p className="eyebrow">{t.hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 id="hero-title" className="display">
              {t.brand.name}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="hero__motto">{t.brand.motto}</p>
          </Reveal>
          <Reveal delay={360} className="cluster hero__ctas">
            <Button href="/#about" variant="light" arrow onClick={(e) => go("about", e)}>
              {t.hero.ctaPrimary}
            </Button>
            <Button href="/#contact" variant="ghost-light" onClick={(e) => go("contact", e)}>
              {t.nav.contactCta}
            </Button>
          </Reveal>
        </div>
        <a href="/#about" className="hero__scroll" onClick={(e) => go("about", e)} aria-label={t.hero.scrollLabel}>
          <ArrowDownIcon className="icon" />
        </a>
      </section>

      {/* ABOUT */}
      <Section id="about" labelledBy="about-title">
        <div className="container split">
          <Reveal variant="mask" className="split__media">
            <Slideshow
              images={SLIDES}
              label={t.about.slideshowLabel}
              altFor={(n) => format(t.about.slideAlt, { n })}
            />
          </Reveal>
          <div className="split__text">
            <SectionHeading id="about-title" eyebrow={t.brand.name} title={t.about.title} />
            <Reveal className="prose">
              <p>{t.about.body}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 360° VIEW */}
      <Section id="homes" tone="sand" labelledBy="homes-title">
        <div className="container">
          <SectionHeading id="homes-title" title={t.panorama.title} align="center" ornament />
          <Reveal variant="fade" className="panorama">
            <Panorama label={t.panorama.viewerLabel} />
          </Reveal>
        </div>
      </Section>

      {/* MASTERPLAN */}
      <Section id="masterplan" labelledBy="masterplan-title">
        <div className="container split split--reverse">
          <Reveal variant="zoom" className="split__media">
            <Picture image="/h5.jpg" alt={t.masterplan.imageAlt} ratio="3 / 2" sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <div className="split__text">
            <SectionHeading id="masterplan-title" eyebrow={t.brand.name} title={t.masterplan.title} />
            <Reveal className="prose">
              <p>{t.masterplan.body}</p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* LOCATION */}
      <Section id="location" tone="sand" labelledBy="location-title">
        <div className="container">
          <SectionHeading id="location-title" eyebrow={t.location.eyebrow} title={t.location.title} />
          <Reveal className="prose location__body">
            <p>{t.location.body}</p>
          </Reveal>

          <div className="location__grid">
            <Reveal variant="fade" className="location__map">
              <div className="map-frame">
                <iframe
                  title={t.location.mapTitle}
                  src={SITE.maps.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <Button href={SITE.maps.shareUrl} variant="link" arrow>
                <MapPinIcon className="icon inline-icon" /> {t.common.viewOnMaps}
              </Button>
            </Reveal>

            <ul role="list" className="nearby">
              {NEARBY.map(({ key, Icon }, i) => (
                <Reveal as="li" key={key} delay={i * 70} className="nearby__item">
                  <Icon className="icon nearby__icon" />
                  <span>{t.location.nearby[key]}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section id="story" tone="forest" pattern labelledBy="story-title">
        <div className="container container--narrow story">
          <SectionHeading id="story-title" title={t.story.title} align="center" ornament />
          <Reveal className="prose story__body">
            <p>{t.story.body}</p>
          </Reveal>
          <Reveal variant="fade" delay={150}>
            <Ornament variant="rosette" className="story__rosette" />
          </Reveal>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" labelledBy="contact-title">
        <div className="container contact">
          <div className="contact__intro">
            <SectionHeading id="contact-title" eyebrow={t.brand.name} title={t.contact.title} lead={t.contact.blurb} />
            <Reveal>
              <a className="contact__line" href={`mailto:${SITE.contact.email}`}>
                <MailIcon className="icon" />
                {SITE.contact.email}
              </a>
            </Reveal>
          </div>

          <Reveal as="form" onSubmit={submit} className="contact__form" autoComplete="on">
            <div className="contact__row">
              <Field label={t.contact.firstName} name="firstName" autoComplete="given-name" required />
              <Field label={t.contact.lastName} name="lastName" autoComplete="family-name" required />
            </div>
            <Field label={t.contact.email} name="email" type="email" autoComplete="email" required />
            <Field label={t.contact.phone} name="phone" type="tel" autoComplete="tel" />
            <Field label={t.contact.message} name="message" as="textarea" />
            <Button
              type="submit"
              block
              arrow
              disabled={status === "sending"}
              aria-busy={status === "sending"}
            >
              {status === "sending" ? t.contact.sending : t.contact.send}
            </Button>
            <p
              className={`contact__status ${status === "success" ? "is-success" : ""}`}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
