import { format, useLanguage } from "./i18n/context";
import { Section, SectionHeading } from "./components/layout/Section";
import Reveal from "./components/motion/Reveal";
import Picture from "./components/media/Picture";
import "./Gallery.css";

// Interim lists — replaced by the central image manifest in Phase 4.
const INTERIOR = [
  "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S15", "S16", "S17",
  "S18", "S19", "S20", "S21", "S22", "S23", "S24", "S25", "S26", "S27", "S28",
  "S29a", "S29b", "S29c", "S30", "S31", "S32", "S33", "S34", "S35", "S36",
  "S37", "S39", "S40", "S41", "S42", "S43", "S44", "S45",
].map((name) => ({ src: `/${name}.jpg`, width: 1600, height: 1600 }));

const EXTERIOR = [
  { src: "/bialka.jpg", width: 4032, height: 2268 },
  { src: "/h5.jpg", width: 3840, height: 2560 },
  { src: "/h2.jpg", width: 3840, height: 2560 },
  { src: "/h3.jpg", width: 3840, height: 2560 },
  { src: "/h4.jpg", width: 3840, height: 2560 },
];

function Grid({ images, category, square }) {
  const { t } = useLanguage();
  return (
    <ul role="list" className={`gallery-grid ${square ? "gallery-grid--square" : ""}`}>
      {images.map((img, i) => (
        <Reveal as="li" key={img.src} variant="fade" delay={(i % 3) * 80} className="zoom-on-hover">
          <Picture
            image={img}
            ratio={square ? "1 / 1" : "3 / 2"}
            alt={format(t.gallery.imageAlt, { category, n: i + 1 })}
            sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </Reveal>
      ))}
    </ul>
  );
}

export default function Gallery() {
  const { t } = useLanguage();
  return (
    <Section tone="ivory" className="gallery-page" labelledBy="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" level={1} size="h1" title={t.gallery.title} align="center" ornament />

        <section className="gallery-group" aria-labelledby="gallery-exterior">
          <h2 id="gallery-exterior" className="eyebrow gallery-group__title">
            {t.gallery.exterior}
          </h2>
          <Grid images={EXTERIOR} category={t.gallery.exterior} />
        </section>

        <section className="gallery-group" aria-labelledby="gallery-interior">
          <h2 id="gallery-interior" className="eyebrow gallery-group__title">
            {t.gallery.interior}
          </h2>
          <Grid images={INTERIOR} category={t.gallery.interior} square />
        </section>
      </div>
    </Section>
  );
}
