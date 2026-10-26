import { useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { Section } from "../components/layout/Section";
import Logo from "../components/layout/Logo";
import Ornament from "../components/layout/Ornament";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Rich from "../components/ui/Rich";
import "./Roots.css";

export default function Roots() {
  const { t } = useLanguage();
  const s = t.story;

  return (
    <Section id="story" tone="walnut" pattern labelledBy="story-title" className="roots">
      <div className="container roots__grid">
        <figure className="roots__figure">
          <Reveal variant="mask">
            <Picture
              image={IMAGES.houseNight}
              ratio="4 / 5"
              alt={s.imageAlt}
              sizes="(min-width: 960px) 40vw, 100vw"
            />
          </Reveal>
          <figcaption className="roots__caption">{s.imageCaption}</figcaption>
          <Reveal variant="fade" delay={300} className="roots__emblem" aria-hidden="true">
            <Logo light />
          </Reveal>
        </figure>

        <div className="roots__text">
          <Reveal variant="fade">
            <p className="eyebrow">{s.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="story-title" className="h1 roots__title">
              <Rich text={s.title} />
            </h2>
          </Reveal>
          <Reveal delay={160} className="prose roots__body">
            {s.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>

          <ul role="list" className="roots__values">
            {s.values.map((v, i) => (
              <Reveal as="li" key={v} delay={200 + i * 100}>
                {i > 0 && <Ornament variant="rosette" className="roots__sep" />}
                <span>{v}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="container container--narrow roots__quote">
        <Reveal variant="fade">
          <Ornament />
        </Reveal>
        <Reveal delay={120}>
          <blockquote>
            <p>{t.brand.motto}</p>
          </blockquote>
        </Reveal>
      </div>
    </Section>
  );
}
