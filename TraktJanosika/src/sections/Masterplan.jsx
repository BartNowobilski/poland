import { useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { Section } from "../components/layout/Section";
import Ornament from "../components/layout/Ornament";
import Reveal from "../components/motion/Reveal";
import Panorama from "../components/media/Panorama";
import Rich from "../components/ui/Rich";
import "./Masterplan.css";

export default function Masterplan() {
  const { t } = useLanguage();
  const m = t.masterplan;

  return (
    <Section id="masterplan" tone="forest" pattern labelledBy="masterplan-title" className="estate">
      <div className="container estate__grid">
        <div className="estate__head">
          <Reveal variant="fade">
            <p className="eyebrow">{m.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="masterplan-title" className="h2">
              <Rich text={m.title} />
            </h2>
          </Reveal>
          <ul role="list" className="estate__features">
            {m.features.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 60}>
                <Ornament variant="rosette" className="estate__bullet" />
                <span>{f}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={120} className="prose estate__body">
          {m.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
      </div>

      <div id="panorama" className="container estate__pano">
        <Reveal variant="fade">
          <h3 className="eyebrow eyebrow--bare estate__pano-title">{t.panorama.title}</h3>
        </Reveal>
        <Reveal variant="fade" delay={100}>
          <Panorama
            src={IMAGES.panorama.src}
            poster={IMAGES.panoramaPoster?.src}
            label={t.panorama.viewerLabel}
            activateLabel={t.panorama.activate}
            hint={t.panorama.hint}
          />
        </Reveal>
      </div>
    </Section>
  );
}
