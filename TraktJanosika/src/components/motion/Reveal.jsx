import { useEffect, useRef } from "react";
import { observeReveal } from "../../lib/reveal";

/**
 * Reveals its content once it scrolls into view.
 *
 *   <Reveal>…</Reveal>                     fade + rise (default)
 *   <Reveal variant="fade" delay={150}>    fade only, delayed
 *   <Reveal variant="mask">                image wipes in from below
 *   <Reveal variant="zoom">                child eases from 108% → 100%
 *   <Reveal variant="none">                plain element (e.g. above-the-fold items)
 *
 * Disabled automatically for prefers-reduced-motion (see base.css).
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  children,
  ref: externalRef,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => (variant === "none" ? undefined : observeReveal(ref.current)), [variant]);

  // React 19 passes `ref` as a prop — merge it with the internal one
  const setRef = (node) => {
    ref.current = node;
    if (typeof externalRef === "function") externalRef(node);
    else if (externalRef) externalRef.current = node;
  };

  return (
    <Tag
      ref={setRef}
      data-reveal={variant === "none" ? undefined : variant}
      className={className}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
