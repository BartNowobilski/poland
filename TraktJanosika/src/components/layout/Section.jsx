import { useId } from "react";
import Ornament from "./Ornament";
import Reveal from "../motion/Reveal";
import "./Section.css";

const DARK_TONES = new Set(["forest", "walnut", "charcoal"]);

/**
 * Page section with a background tone and consistent vertical rhythm.
 * tone:    "ivory" | "sand" | "forest" | "walnut" | "charcoal"  (dark tones add .on-dark)
 * spacing: "default" | "tight" | "none"
 * Pass `labelledBy` (id of the heading) for an accessible region name.
 */
export function Section({
  id,
  tone = "ivory",
  spacing = "default",
  pattern = false,
  labelledBy,
  className = "",
  children,
  ...rest
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        "section",
        `tone-${tone}`,
        DARK_TONES.has(tone) && "on-dark",
        spacing !== "default" && `section--${spacing}`,
        pattern && "pattern-rozeta",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </section>
  );
}

/**
 * Eyebrow + title + optional lead, revealed in a gentle stagger.
 * Returns the heading id through `id` so the parent Section can reference it.
 *
 *   <SectionHeading id="about-title" eyebrow="O inwestycji" title={<>Osiem domów, <em>jedna historia</em></>} />
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "start",
  level = 2,
  ornament = false,
  size = "h2",
  className = "",
}) {
  const fallbackId = useId();
  const Tag = `h${level}`;
  return (
    <header className={`section-heading section-heading--${align} ${className}`}>
      {ornament && (
        <Reveal variant="fade">
          <Ornament variant="mark" className="section-heading__ornament" />
        </Reveal>
      )}
      {eyebrow && (
        <Reveal variant="fade">
          <p className={`eyebrow ${align === "center" ? "eyebrow--bare" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <Tag id={id ?? fallbackId} className={size}>
          {title}
        </Tag>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
