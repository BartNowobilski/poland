import { useMemo, useState } from "react";
import { format, useLanguage } from "../i18n/context";
import { CONTACT_HASH } from "../content/navigation";
import { buildProgress } from "../lib/gallery";
import { useSectionLink } from "../lib/useSectionLink";
import { Section } from "../components/layout/Section";
import Ornament from "../components/layout/Ornament";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Lightbox from "../components/media/Lightbox";
import Button from "../components/ui/Button";
import Rich from "../components/ui/Rich";
import "./Progress.css";

const VISIBLE_ENTRIES = 4;
const PHOTOS_PER_ENTRY = 4;

function Entry({ entry, t, onOpen }) {
  const shown = entry.items.slice(0, PHOTOS_PER_ENTRY);
  const extra = entry.items.length - shown.length;
  return (
    <Reveal as="li" className={`entry ${entry.milestone ? "is-milestone" : ""}`}>
      <div className="entry__marker" aria-hidden="true" />
      <div className="entry__date">
        <time dateTime={entry.date}>{entry.dateLabel}</time>
        {entry.milestone && <span className="entry__badge">{t.progress.milestone}</span>}
      </div>
      <div className="entry__body">
        <h3 className="h3">{entry.title}</h3>
        {entry.text && <p className="entry__text">{entry.text}</p>}
        {shown.length > 0 && (
          <ul role="list" className={`entry__photos entry__photos--${Math.min(shown.length, 4)}`}>
            {shown.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="zoom-on-hover"
                  onClick={() => onOpen(entry, i)}
                  aria-label={format(t.progress.openPhoto, { alt: item.alt })}
                >
                  <Picture image={item.image} ratio={i === 0 ? "3 / 2" : "1 / 1"} alt="" sizes="(min-width: 960px) 30vw, 50vw" />
                  {i === shown.length - 1 && extra > 0 && <span className="entry__more numeral">+{extra}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
        {entry.items.length > 0 && <p className="entry__count">{format(t.progress.photos, { n: entry.items.length })}</p>}
      </div>
    </Reveal>
  );
}

export default function Progress() {
  const { t, lang } = useLanguage();
  const p = t.progress;
  const go = useSectionLink();
  const entries = useMemo(() => buildProgress(lang), [lang]);
  const [showAll, setShowAll] = useState(false);
  const [viewer, setViewer] = useState(null); // { items, index }

  const visible = showAll ? entries : entries.slice(0, VISIBLE_ENTRIES);

  return (
    <Section id="progress" tone="sand" labelledBy="progress-title" className="progress">
      <div className="container progress__grid">
        <header className="progress__head">
          <Reveal variant="fade">
            <p className="eyebrow">{p.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="progress-title" className="h1">
              <Rich text={p.title} />
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead">{p.lead}</p>
          </Reveal>
        </header>

        {entries.length === 0 ? (
          <Reveal className="progress__empty">
            <Ornament variant="rosette" />
            <h3 className="h3">{p.emptyTitle}</h3>
            <p>{p.emptyText}</p>
            <Button href={`/#${CONTACT_HASH}`} variant="outline" arrow onClick={(e) => go(CONTACT_HASH, e)}>
              {p.subscribe}
            </Button>
          </Reveal>
        ) : (
          <div>
            <ol role="list" className="timeline">
              {visible.map((entry) => (
                <Entry
                  key={entry.id}
                  entry={entry}
                  t={t}
                  onOpen={(e, i) => setViewer({ items: e.items, index: i })}
                />
              ))}
            </ol>
            {!showAll && entries.length > VISIBLE_ENTRIES && (
              <Button variant="outline" onClick={() => setShowAll(true)} className="progress__older">
                {p.showOlder}
              </Button>
            )}
          </div>
        )}
      </div>

      <Lightbox
        items={viewer?.items ?? []}
        index={viewer?.index ?? null}
        onIndex={(index) => setViewer((v) => ({ ...v, index }))}
        onClose={() => setViewer(null)}
      />
    </Section>
  );
}
