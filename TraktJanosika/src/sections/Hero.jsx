import { Fragment } from "react";
import { useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { CONTACT_HASH } from "../content/navigation";
import { useSectionLink } from "../lib/useSectionLink";
import { useParallax } from "../lib/useParallax";
import Picture from "../components/media/Picture";
import Button from "../components/ui/Button";
import "./Hero.css";

/* Splits a heading into words for the staggered entrance. */
function Words({ text, start = 0 }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="hero__word">
        <span style={{ "--d": `${start + i * 90}ms` }}>{word}</span>
      </span>
    </Fragment>
  ));
}

export default function Hero() {
  const { t } = useLanguage();
  const go = useSectionLink();
  const mediaRef = useParallax(0.12);

  return (
    <section className="hero on-dark" id="top" aria-labelledby="hero-title">
      <div className="hero__media" ref={mediaRef}>
        <Picture image={IMAGES.aerial} alt={t.hero.imageAlt} priority sizes="100vw" />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content container">
        <h1 id="hero-title" className="hero__title">
          <span className="eyebrow hero__eyebrow" data-enter style={{ "--d": "150ms" }}>
            {t.hero.eyebrow}
          </span>
          <span className="display hero__name">
            <Words text={t.brand.name} start={300} />
          </span>
        </h1>
        <p className="hero__motto" data-enter style={{ "--d": "650ms" }}>
          {t.brand.motto}
        </p>
        <p className="hero__intro" data-enter style={{ "--d": "800ms" }}>
          {t.hero.intro}
        </p>
        <div className="hero__ctas" data-enter style={{ "--d": "950ms" }}>
          <Button href="/#about" variant="light" arrow onClick={(e) => go("about", e)}>
            {t.hero.ctaPrimary}
          </Button>
          <Button
            href={`/#${CONTACT_HASH}`}
            variant="ghost-light"
            onClick={(e) => go(CONTACT_HASH, e)}
          >
            {t.nav.contactCta}
          </Button>
        </div>
      </div>

      <div className="hero__bar" data-enter style={{ "--d": "1150ms" }}>
        <div className="container hero__bar-inner">
          <dl className="hero__facts">
            {t.facts.map((f) => (
              <div key={f.label} className="hero__fact">
                <dt className="visually-hidden">{f.label}</dt>
                <dd>
                  <span className="numeral hero__fact-value">{f.value}</span>
                  <span className="hero__fact-label" aria-hidden="true">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <a
            href="/#about"
            className="hero__scroll"
            aria-label={t.hero.scrollLabel}
            onClick={(e) => go("about", e)}
          >
            <span>{t.hero.scroll}</span>
            <span className="hero__scroll-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
