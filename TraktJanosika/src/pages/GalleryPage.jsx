import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format, localize, useLanguage } from "../i18n/context";
import { availableCategories, buildGallery, filterGallery } from "../lib/gallery";
import { Section, SectionHeading } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Lightbox from "../components/media/Lightbox";
import Button from "../components/ui/Button";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import "./GalleryPage.css";

const PAGE_SIZE = 24;
const ABOVE_FOLD = 4; // first tiles render without reveal animation (LCP)

export default function GalleryPage() {
  const { t, lang } = useLanguage();
  const g = t.gallery;
  const [params, setParams] = useSearchParams();
  // ?kategoria= is applied after mount: /gallery is prerendered unfiltered,
  // so the first client render must match it (no hydration mismatch)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const category = mounted ? params.get("kategoria") : null;
  useDocumentMeta({ title: t.meta.galleryTitle, description: t.meta.galleryDescription, path: "/gallery" });

  const all = useMemo(() => buildGallery(lang), [lang]);
  const categories = useMemo(() => availableCategories(all), [all]);
  const items = useMemo(() => filterGallery(all, category), [all, category]);

  // paging state is keyed by category, so switching filters starts from page 1
  const [limits, setLimits] = useState({});
  const limit = limits[category ?? "all"] ?? PAGE_SIZE;
  const [index, setIndex] = useState(null);
  const shown = items.slice(0, limit);

  const choose = (id) => {
    const next = new URLSearchParams(params);
    if (id) next.set("kategoria", id);
    else next.delete("kategoria");
    setParams(next, { replace: true });
  };

  return (
    <Section className="gallery-page" labelledBy="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" level={1} size="h1" title={g.title} lead={g.lead} align="center" ornament />

        {categories.length > 1 && (
          <div className="filters" role="group" aria-label={g.filterLabel}>
            {[{ id: null, label: g.all }, ...categories.map((c) => ({ id: c.id, label: localize(c.label, lang) }))].map(
              (c) => (
                <button
                  key={c.id ?? "all"}
                  type="button"
                  className="filter"
                  aria-pressed={(category ?? null) === c.id}
                  onClick={() => choose(c.id)}
                >
                  {c.label}
                </button>
              )
            )}
          </div>
        )}

        <p className="gallery-page__count" aria-live="polite">
          {format(g.count, { n: items.length })}
        </p>

        {items.length === 0 ? (
          <p className="gallery-page__empty">{g.empty}</p>
        ) : (
          <ul role="list" className="justified">
            {shown.map((item, i) => {
              const ratio = item.image.width / item.image.height;
              return (
                <li
                  key={item.id}
                  className="justified__item"
                  style={{ "--r": ratio.toFixed(3) }}
                >
                  <Reveal
                    variant={i < ABOVE_FOLD ? "none" : "fade"}
                    delay={(i % 6) * 50}
                    className="justified__inner"
                  >
                    <button
                      type="button"
                      className="justified__btn zoom-on-hover"
                      onClick={() => setIndex(i)}
                      aria-label={format(g.open, { alt: item.alt })}
                    >
                      <Picture
                        image={item.image}
                        alt=""
                        priority={i === 0}
                        sizes={ratio > 1.2 ? "(min-width: 1100px) 40vw, 90vw" : "(min-width: 1100px) 22vw, 45vw"}
                      />
                      {item.render && <span className="justified__tag">{t.common.visualisation}</span>}
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        )}

        {shown.length < items.length && (
          <div className="gallery-page__more">
            <Button
              variant="outline"
              onClick={() => setLimits((l) => ({ ...l, [category ?? "all"]: limit + PAGE_SIZE }))}
            >
              {g.showMore} ({items.length - shown.length})
            </Button>
          </div>
        )}
      </div>

      <Lightbox items={items} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </Section>
  );
}
