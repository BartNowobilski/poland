/* Design-system reference — available only in `npm run dev` at /styleguide. */
import { Section, SectionHeading } from "../components/layout/Section";
import Ornament, { MountainRidge } from "../components/layout/Ornament";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import * as Icons from "../components/ui/Icon";
import { getImage } from "../lib/images";

const SWATCHES = [
  ["--c-ivory", "Ivory"],
  ["--c-paper", "Paper"],
  ["--c-sand", "Sand"],
  ["--c-linen", "Linen"],
  ["--c-gold", "Muted gold"],
  ["--c-wood", "Wood"],
  ["--c-clay", "Clay (original brand)"],
  ["--c-walnut", "Walnut"],
  ["--c-forest", "Forest"],
  ["--c-forest-deep", "Forest deep"],
  ["--c-charcoal", "Charcoal"],
];

const box = { display: "grid", gap: "1.5rem" };

export default function Styleguide() {
  return (
    <div style={{ paddingTop: "var(--nav-h)" }}>
      <Section>
        <div className="container" style={box}>
          <SectionHeading eyebrow="Trakt Janosika" title={<>Design <em>system</em></>} lead="Tokens, typography, components and motion patterns." level={1} size="h1" />

          <h2 className="eyebrow">Colour</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
            {SWATCHES.map(([v, name]) => (
              <div key={v}>
                <div style={{ height: 96, background: `var(${v})`, boxShadow: "inset 0 0 0 1px var(--line)" }} />
                <p className="small" style={{ marginTop: 8 }}>{name}</p>
                <code className="small" style={{ color: "var(--text-muted)" }}>{v}</code>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="container" style={box}>
          <h2 className="eyebrow">Typography</h2>
          <p className="display">Trakt Janosika</p>
          <p className="h1">Tam, gdzie historia <em>spotyka</em> nowoczesność</p>
          <p className="h2">Osiem domów w sercu Podhala</p>
          <p className="h3">Góralskie rzemiosło, współczesny komfort</p>
          <p className="h4">Kotelnica Białczańska — ok. 3 km</p>
          <p className="lead">Lead — Trakt Janosika to ekskluzywne, ogrodzone osiedle ośmiu nowoczesnych domów. Zażółć gęślą jaźń.</p>
          <div className="prose">
            <p>Body — Każdy dom łączy w sobie góralskie rzemiosło z nowoczesną architekturą. Ąą Ćć Ęę Łł Ńń Óó Śś Źź Żż.</p>
          </div>
          <p className="eyebrow">Eyebrow label</p>
        </div>
      </Section>

      <Section>
        <div className="container" style={box}>
          <h2 className="eyebrow">Buttons</h2>
          <div className="cluster">
            <Button arrow>Odkryj inwestycję</Button>
            <Button variant="outline">Skontaktuj się</Button>
            <Button variant="link" arrow>Dowiedz się więcej</Button>
            <Button size="sm">Small</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="cluster tone-forest" style={{ padding: "2rem" }}>
            <Button variant="light" arrow>Odkryj inwestycję</Button>
            <Button variant="ghost-light">Skontaktuj się</Button>
          </div>

          <h2 className="eyebrow">Icons</h2>
          <div className="cluster" style={{ color: "var(--c-wood)" }}>
            {Object.entries(Icons).map(([name, Icon]) => (
              <span key={name} title={name}>
                <Icon className="icon" width="28" height="28" />
              </span>
            ))}
          </div>

          <h2 className="eyebrow">Form</h2>
          <form style={{ display: "grid", gap: "1.5rem", maxWidth: 560 }} onSubmit={(e) => e.preventDefault()}>
            <Field label="Imię" name="sg-name" required />
            <Field label="E-mail" name="sg-email" type="email" hint="Hint text" />
            <Field label="Dom" name="sg-home" as="select" defaultValue="">
              <option value="">—</option>
              <option>Dom 1</option>
            </Field>
            <Field label="Błąd" name="sg-err" error="Error message" />
            <label className="check">
              <input type="checkbox" />
              <span>Consent checkbox — wyrażam zgodę na przetwarzanie danych osobowych.</span>
            </label>
          </form>
        </div>
      </Section>

      <Section tone="forest" pattern>
        <div className="container" style={{ ...box, justifyItems: "center", textAlign: "center" }}>
          <h2 className="eyebrow eyebrow--bare">Ornaments</h2>
          <Ornament />
          <Ornament variant="mark" />
          <Ornament variant="rosette" />
          <p className="h3">Nasze <em>korzenie</em></p>
        </div>
      </Section>
      <div style={{ color: "var(--c-forest)", background: "var(--c-ivory)" }}>
        <MountainRidge />
      </div>

      <Section>
        <div className="container" style={box}>
          <h2 className="eyebrow">Images & motion</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <Reveal variant="mask"><Picture image={getImage("h2")} ratio="4 / 5" alt="" /></Reveal>
            <Reveal variant="zoom"><Picture image={getImage("h3")} ratio="4 / 5" alt="" /></Reveal>
            <Reveal variant="up" delay={150} className="zoom-on-hover"><Picture image={getImage("interiors-lazienka-wanna-01")} ratio="4 / 5" alt="" /></Reveal>
          </div>
          <p className="small">mask · zoom · up + hover-zoom</p>
        </div>
      </Section>
    </div>
  );
}
