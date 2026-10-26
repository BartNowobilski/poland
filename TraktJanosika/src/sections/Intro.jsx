import { useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { Section } from "../components/layout/Section";
import Ornament from "../components/layout/Ornament";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Rich from "../components/ui/Rich";
import "./Intro.css";

const ROMAN = ["I", "II", "III"];

export default function Intro() {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <Section id="about" labelledBy="about-title" className="intro">
      <div className="container intro__grid">
        <div className="intro__text">
          <Reveal variant="fade">
            <p className="eyebrow">{about.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="about-title" className="h1 intro__title">
              <Rich text={about.title} />
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead intro__lead">{about.body[0]}</p>
          </Reveal>

          <dl className="intro__facts">
            {t.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 80} className="intro__fact">
                <dt>{f.label}</dt>
                <dd className="numeral">{f.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="intro__media">
          <Reveal variant="mask" className="intro__main">
            <Picture
              image={IMAGES.gate}
              ratio="4 / 5"
              alt={about.imageAlt}
              sizes="(min-width: 960px) 45vw, 100vw"
            />
          </Reveal>
          <Reveal variant="mask" delay={250} className="intro__detail">
            <Picture
              image={IMAGES.bathVanity}
              ratio="1 / 1"
              alt={about.detailAlt}
              sizes="(min-width: 960px) 20vw, 45vw"
            />
          </Reveal>
          <span className="intro__tag" aria-hidden="true">
            {t.common.visualisation}
          </span>
        </div>
      </div>

      {/* Stages of completion */}
      <div className="container intro__stages">
        <Reveal variant="fade">
          <Ornament className="intro__ornament" />
        </Reveal>
        <Reveal>
          <h3 className="h3 intro__stages-title">{about.stagesTitle}</h3>
        </Reveal>
        <ol role="list" className="stages">
          {about.stages.map((stage, i) => (
            <Reveal as="li" key={stage.title} delay={i * 110} className="stage">
              <span className="stage__num numeral" aria-hidden="true">
                {ROMAN[i]}
              </span>
              <h4 className="h4 stage__title">{stage.title}</h4>
              <p className="stage__text">{stage.text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="intro__closing">
          <p>{about.body[1]}</p>
        </Reveal>
      </div>
    </Section>
  );
}
