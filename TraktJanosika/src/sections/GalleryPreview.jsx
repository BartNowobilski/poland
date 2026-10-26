import { useMemo, useState } from "react";
import { format, useLanguage } from "../i18n/context";
import { buildGallery } from "../lib/gallery";
import { Section } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Lightbox from "../components/media/Lightbox";
import Button from "../components/ui/Button";
import Rich from "../components/ui/Rich";
import "./GalleryPreview.css";

const MAX = 7;

/* Editorial mosaic of `featured` gallery images; opens the lightbox in place. */
export default function GalleryPreview() {
  const { t, lang } = useLanguage();
  const g = t.galleryPreview;
  const all = useMemo(() => buildGallery(lang), [lang]);
  const featured = useMemo(() => all.filter((i) => i.featured).slice(0, MAX), [all]);
  const [index, setIndex] = useState(null);

  if (!featured.length) return null;

  return (
    <Section id="gallery" labelledBy="gallery-preview-title" className="gpreview">
      <div className="container gpreview__head">
        <div>
          <Reveal variant="fade">
            <p className="eyebrow">{g.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="gallery-preview-title" className="h1">
              <Rich text={g.title} />
            </h2>
          </Reveal>
        </div>
        <Reveal delay={160} className="gpreview__aside">
          <p className="lead">{g.lead}</p>
          <Button to="/gallery" variant="outline" arrow>
            {g.cta} <span className="gpreview__count">({all.length})</span>
          </Button>
        </Reveal>
      </div>

      <div className="container">
        <ul role="list" className={`mosaic mosaic--${featured.length}`}>
          {featured.map((item, i) => (
            <Reveal as="li" key={item.id} variant="zoom" delay={(i % 4) * 90} className="mosaic__item">
              <button
                type="button"
                className="mosaic__btn zoom-on-hover"
                onClick={() => setIndex(i)}
                aria-label={format(t.gallery.open, { alt: item.alt })}
              >
                <Picture image={item.image} alt="" sizes={i === 0 ? "(min-width: 960px) 58vw, 100vw" : "(min-width: 960px) 30vw, 50vw"} />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox items={featured} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </Section>
  );
}
