import { Link } from "react-router-dom";
import { ArrowIcon } from "./Icon";
import "./Button.css";

/**
 * Polymorphic button.
 *  - `to`   → react-router <Link>
 *  - `href` → <a> (external links open in a new tab)
 *  - else   → <button>
 *
 * variant: "primary" | "outline" | "light" | "ghost-light" | "link"
 * size:    "md" | "sm"
 * arrow:   show a trailing arrow that nudges on hover
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "md" && `btn--${size}`,
    block && "btn--block",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowIcon className="btn__arrow" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
