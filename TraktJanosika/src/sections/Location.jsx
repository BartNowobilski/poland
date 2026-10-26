import { useState } from "react";
import { localize, useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { PLACES } from "../content/location";
import { SITE } from "../content/site";
import { Section } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Button from "../components/ui/Button";
import Rich from "../components/ui/Rich";
import {
  BikeIcon,
  CarIcon,
  MapPinIcon,
  MountainIcon,
  SkiIcon,
  SpaIcon,
  WaterIcon,
} from "../components/ui/Icon";
import "./Location.css";

const ICONS = {
  water: WaterIcon,
  mountain: MountainIcon,
  ski: SkiIcon,
  spa: SpaIcon,
  car: CarIcon,
  bike: BikeIcon,
};

function Distance({ km, lang, t }) {
  if (km == null) return <span className="place__value">{t.location.nearby}</span>;
  const value = new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-GB").format(km);
  return (
    <span className="place__value">
      <small>{t.common.approx}</small> <span className="numeral">{value}</span>
      <small> km</small>
    </span>
  );
}

/* Google Maps embed behind a click — no third-party requests until asked. */
function MapFacade({ t }) {
  const [loaded, setLoaded] = useState(false);
  const { address, maps } = SITE;
  return (
    <div className="map">
      {loaded ? (
        <iframe
          title={t.location.map.title}
          src={maps.embedUrl}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map__facade tone-forest pattern-rozeta">
          <MapPinIcon className="icon map__pin" />
          <address className="map__address">
            {address.street}
            <br />
            {address.postalCode} {address.locality}
          </address>
          <Button variant="ghost-light" size="sm" onClick={() => setLoaded(true)}>
            {t.location.map.load}
          </Button>
          <p className="map__note">{t.location.map.note}</p>
        </div>
      )}
    </div>
  );
}

export default function Location() {
  const { t, lang } = useLanguage();
  const l = t.location;

  return (
    <Section id="location" labelledBy="location-title" className="location">
      <div className="container location__head">
        <div>
          <Reveal variant="fade">
            <p className="eyebrow">{l.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="location-title" className="h1">
              <Rich text={l.title} />
            </h2>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <p className="lead">{l.body[0]}</p>
        </Reveal>
      </div>

      <Reveal variant="zoom" className="container location__band">
        <Picture
          image={IMAGES.aerial}
          ratio="21 / 8"
          position="50% 22%"
          alt={l.imageAlt}
          sizes="(min-width: 1440px) 1360px, 100vw"
        />
      </Reveal>

      <div className="container">
        <h3 className="visually-hidden">{l.placesLabel}</h3>
        <ul role="list" className="places">
          {PLACES.map((place, i) => {
            const Icon = ICONS[place.icon] ?? MapPinIcon;
            return (
              <Reveal as="li" key={place.id} delay={(i % 4) * 80} className="place">
                <Icon className="icon place__icon" />
                <Distance km={place.distanceKm} lang={lang} t={t} />
                <h4 className="place__name">{localize(place.name, lang)}</h4>
                <p className="place__note">{localize(place.note, lang)}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <div className="container location__more">
        <Reveal className="prose location__prose">
          {l.body.slice(1).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <Reveal variant="fade" delay={120} className="location__map">
          <MapFacade t={t} />
          <Button href={SITE.maps.shareUrl} variant="link" arrow>
            {t.common.viewOnMaps}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
