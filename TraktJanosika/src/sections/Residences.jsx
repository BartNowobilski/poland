import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { localize, useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { RESIDENCES, hasDetails } from "../content/residences";
import { getImage } from "../lib/images";
import { requestInquiry } from "../lib/inquiry";
import { useModal } from "../lib/useModal";
import { Section } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Lightbox from "../components/media/Lightbox";
import Button from "../components/ui/Button";
import Rich from "../components/ui/Rich";
import { CloseIcon } from "../components/ui/Icon";
import "./Residences.css";

const fmtNumber = (n, lang) => new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-GB").format(n);

function Value({ value, unit, lang, t }) {
  if (value == null) {
    return (
      <>
        <span aria-hidden="true">—</span>
        <span className="visually-hidden">{t.residences.tbc}</span>
      </>
    );
  }
  return (
    <>
      {fmtNumber(value, lang)}
      {unit && <small> {unit}</small>}
    </>
  );
}

function Status({ status, t }) {
  const label = t.residences.status[status ?? "unknown"];
  return <span className={`status status--${status ?? "unknown"}`}>{label}</span>;
}

function specRows(r, t) {
  return [
    { key: "floorArea", label: t.residences.floorArea, value: r.floorArea, unit: "m²", always: true },
    { key: "plotArea", label: t.residences.plotArea, value: r.plotArea, unit: "m²", always: true },
    { key: "bedrooms", label: t.residences.bedrooms, value: r.bedrooms },
    { key: "bathrooms", label: t.residences.bathrooms, value: r.bathrooms },
  ].filter((row) => row.always || row.value != null);
}

/* ---------- Details dialog (shown only when a residence has data) ---------- */
function ResidenceDialog({ residence: r, onClose }) {
  const { t, lang } = useLanguage();
  const ref = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  useModal(ref, true, onClose, { initialFocus: ".rdialog__close" });

  const media = [
    ...r.gallery.map((id) => ({ image: getImage(id), alt: `${localize(r.label, lang)} — ${t.residences.gallery}` })),
    ...r.floorPlans.map((p) => ({
      image: getImage(p.image),
      alt: `${localize(r.label, lang)} — ${localize(p.label, lang)}`,
      plan: true,
    })),
  ].filter((m) => m.image);

  return createPortal(
    <div className="rdialog" role="dialog" aria-modal="true" aria-labelledby="rdialog-title" ref={ref}>
      <div className="rdialog__backdrop" onClick={onClose} />
      <div className="rdialog__panel">
        <header className="rdialog__head">
          <div>
            <Status status={r.status} t={t} />
            <h2 id="rdialog-title" className="h2">
              {localize(r.label, lang)}
            </h2>
          </div>
          <button type="button" className="rdialog__close" onClick={onClose} aria-label={t.residences.close}>
            <CloseIcon className="icon" />
          </button>
        </header>

        {r.note && <p className="lead">{localize(r.note, lang)}</p>}

        <dl className="rdialog__specs">
          {specRows(r, t).map((row) => (
            <div key={row.key}>
              <dt>{row.label}</dt>
              <dd className="numeral">
                <Value value={row.value} unit={row.unit} lang={lang} t={t} />
              </dd>
            </div>
          ))}
          {r.specs.map((s, i) => (
            <div key={i}>
              <dt>{localize(s.label, lang)}</dt>
              <dd>{localize(s.value, lang)}</dd>
            </div>
          ))}
        </dl>

        {[
          { key: "gallery", title: t.residences.gallery, list: media.filter((m) => !m.plan) },
          { key: "plans", title: t.residences.floorPlans, list: media.filter((m) => m.plan) },
        ]
          .filter((g) => g.list.length)
          .map((g) => (
            <section key={g.key} className="rdialog__group">
              <h3 className="eyebrow">{g.title}</h3>
              <ul role="list" className="rdialog__media">
                {g.list.map((m) => (
                  <li key={m.image.id}>
                    <button
                      type="button"
                      className={`zoom-on-hover ${m.plan ? "is-plan" : ""}`}
                      onClick={() => setLightbox(media.indexOf(m))}
                      aria-label={m.alt}
                    >
                      <Picture image={m.image} ratio="4 / 3" fit={m.plan ? "contain" : "cover"} alt="" sizes="(min-width: 900px) 280px, 45vw" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}

        <Button arrow onClick={() => { onClose(); requestInquiry(r.id); }}>
          {t.residences.inquire}
        </Button>
      </div>
      <Lightbox items={media} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} />
    </div>,
    document.body
  );
}

/* ---------- Card ---------- */
function ResidenceCard({ residence: r, index, onOpen }) {
  const { t, lang } = useLanguage();
  const cover = r.cover ? getImage(r.cover) : null;
  const details = hasDetails(r);

  return (
    <Reveal as="li" delay={(index % 4) * 80} className={`residence ${r.status === "sold" ? "is-sold" : ""}`}>
      {cover && (
        <div className="residence__cover zoom-on-hover">
          <Picture image={cover} ratio="4 / 3" alt="" sizes="(min-width: 1100px) 25vw, 50vw" />
        </div>
      )}
      <div className="residence__head">
        <span className="residence__num numeral" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <Status status={r.status} t={t} />
      </div>
      <h3 className="h3 residence__title">{localize(r.label, lang)}</h3>
      <dl className="residence__specs">
        {specRows(r, t).map((row) => (
          <div key={row.key}>
            <dt>{row.label}</dt>
            <dd>
              <Value value={row.value} unit={row.unit} lang={lang} t={t} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="residence__actions">
        {details && (
          <Button variant="outline" size="sm" onClick={() => onOpen(r)}>
            {t.residences.details}
          </Button>
        )}
        <Button variant="link" arrow onClick={() => requestInquiry(r.id)}>
          {t.residences.inquire}
        </Button>
      </div>
    </Reveal>
  );
}

export default function Residences() {
  const { t } = useLanguage();
  const r = t.residences;
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <Section id="homes" labelledBy="homes-title" className="residences">
      <div className="container residences__head">
        <div className="residences__intro">
          <Reveal variant="fade">
            <p className="eyebrow">{r.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="homes-title" className="h1">
              <Rich text={r.title} />
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead">{r.lead}</p>
          </Reveal>
        </div>
        <Reveal variant="mask" delay={120} className="residences__image">
          <Picture image={IMAGES.houseFront} ratio="5 / 4" alt={r.imageAlt} sizes="(min-width: 960px) 45vw, 100vw" />
        </Reveal>
      </div>

      <div className="container">
        <h3 className="visually-hidden">{r.listLabel}</h3>
        <ol role="list" className="residences__list">
          {RESIDENCES.map((res, i) => (
            <ResidenceCard key={res.id} residence={res} index={i} onOpen={setOpen} />
          ))}
        </ol>
      </div>

      {open && <ResidenceDialog residence={open} onClose={close} />}
    </Section>
  );
}
