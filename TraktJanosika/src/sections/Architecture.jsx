import { useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { Section, SectionHeading } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Rich from "../components/ui/Rich";
import { useParallax } from "../lib/useParallax";
import "./Architecture.css";

export default function Architecture() {
  const { t } = useLanguage();
  const a = t.architecture;
  const bandRef = useParallax(0.08);

  return (
    <Section id="architecture" tone="sand" labelledBy="architecture-title" className="arch">
      <div className="container">
        <SectionHeading
          id="architecture-title"
          eyebrow={a.eyebrow}
          title={<Rich text={a.title} />}
          lead={a.lead}
          align="center"
          ornament
        />
      </div>

      {/* Full-bleed showcase */}
      <Reveal variant="fade" className="arch__band">
        <div ref={bandRef} className="arch__band-media">
          <Picture image={IMAGES.houseCorner} alt={a.alts.wide} sizes="100vw" />
        </div>
      </Reveal>

      {/* Pillars + paired images */}
      <div className="container arch__split">
        <ol role="list" className="pillars">
          {a.pillars.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="pillar">
              <span className="pillar__num numeral" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="h3 pillar__title">{p.title}</h3>
                <p className="pillar__text">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="arch__pair">
          <Reveal variant="mask" className="arch__pair-a">
            <Picture
              image={IMAGES.houseGarden}
              ratio="4 / 5"
              alt={a.alts.garden}
              sizes="(min-width: 960px) 28vw, 50vw"
            />
          </Reveal>
          <Reveal variant="mask" delay={200} className="arch__pair-b">
            <Picture
              image={IMAGES.houseFront}
              ratio="3 / 4"
              alt={a.alts.front}
              sizes="(min-width: 960px) 24vw, 50vw"
            />
          </Reveal>
        </div>
      </div>

      {/* Interiors */}
      <div className="container arch__interiors">
        <div className="arch__interiors-text">
          <Reveal>
            <h3 className="h2">
              <Rich text={a.interiorsTitle} />
            </h3>
          </Reveal>
          <Reveal delay={100}>
            <p className="lead">{a.interiorsText}</p>
          </Reveal>
          <Reveal delay={180}>
            <p className="arch__note">{a.interiorsNote}</p>
          </Reveal>
        </div>

        <div className="arch__mosaic">
          <Reveal variant="zoom" className="arch__m1 zoom-on-hover">
            <Picture image={IMAGES.bathTub} ratio="3 / 4" alt={a.alts.bathTub} sizes="(min-width: 960px) 30vw, 60vw" />
          </Reveal>
          <Reveal variant="zoom" delay={120} className="arch__m2 zoom-on-hover">
            <Picture image={IMAGES.bathVanity} ratio="1 / 1" alt={a.alts.bathVanity} sizes="(min-width: 960px) 22vw, 40vw" />
          </Reveal>
          <Reveal variant="zoom" delay={240} className="arch__m3 zoom-on-hover">
            <Picture image={IMAGES.bathShower} ratio="1 / 1" alt={a.alts.bathShower} sizes="(min-width: 960px) 22vw, 40vw" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
