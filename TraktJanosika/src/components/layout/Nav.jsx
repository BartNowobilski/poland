import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../../i18n/context";
import { CONTACT_HASH, PRIMARY_NAV } from "../../content/navigation";
import { SITE } from "../../content/site";
import { useSectionLink } from "../../lib/useSectionLink";
import { useModal } from "../../lib/useModal";
import Button from "../ui/Button";
import { CloseIcon } from "../ui/Icon";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import "./Nav.css";

function NavItem({ item, t, go, onNavigate, className }) {
  const label = t.nav[item.label];
  if (item.to) {
    return (
      <NavLink to={item.to} className={className} onClick={onNavigate}>
        {label}
      </NavLink>
    );
  }
  return (
    <a
      href={`/#${item.hash}`}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        go(item.hash, e);
      }}
    >
      {label}
    </a>
  );
}

/**
 * Fixed site header.
 * `overlay` — transparent with light text while above the hero (homepage).
 */
export default function Nav({ overlay = false }) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const go = useSectionLink();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // compact/solid header after scrolling
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // the menu is hidden ≥1100px (CSS) — close it so inert/scroll lock are released
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // close the menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // mobile menu: inert background, scroll lock, Escape, focus in/out
  const close = useCallback(() => setOpen(false), []);
  useModal(menuRef, open, close, { initialFocus: ".menu__close" });

  const isOverlay = overlay && !scrolled;

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          // move keyboard focus, not just the scroll position
          e.preventDefault();
          const main = document.getElementById("main");
          main?.focus({ preventScroll: true });
          main?.scrollIntoView({ block: "start" });
        }}
      >
        {t.common.skipToContent}
      </a>

      <header
        className={[
          "nav",
          isOverlay ? "nav--overlay on-dark" : "nav--solid",
          scrolled && "nav--scrolled",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="nav__inner container">
          <a
            href="/"
            className="nav__brand"
            aria-label={t.brand.homeLabel}
            onClick={(e) => go(null, e)}
          >
            <Logo light={isOverlay} />
          </a>

          <nav className="nav__links" aria-label={t.nav.label}>
            <ul role="list">
              {PRIMARY_NAV.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} t={t} go={go} className="nav__link" />
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <LangSwitch className="nav__lang" />
            <Button
              href={`/#${CONTACT_HASH}`}
              size="sm"
              variant={isOverlay ? "ghost-light" : "primary"}
              className="nav__cta"
              onClick={(e) => go(CONTACT_HASH, e)}
            >
              {t.nav.contactCta}
            </Button>
            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t.nav.openMenu}
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Mobile menu ---------- */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`menu tone-forest pattern-rozeta ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.label}
        inert={!open}
      >
        <div className="menu__top container">
          <a href="/" aria-label={t.brand.homeLabel} onClick={(e) => { close(); go(null, e); }}>
            <Logo light />
          </a>
          <button
            type="button"
            className="menu__close"
            aria-label={t.nav.closeMenu}
            onClick={close}
          >
            <CloseIcon className="icon" />
          </button>
        </div>

        <nav className="menu__body container" aria-label={t.nav.label}>
          <ol role="list" className="menu__list">
            {PRIMARY_NAV.map((item, i) => (
              <li key={item.label} style={{ "--i": i }}>
                <span className="menu__num numeral">{String(i + 1).padStart(2, "0")}</span>
                <NavItem item={item} t={t} go={go} onNavigate={close} className="menu__link" />
              </li>
            ))}
            <li style={{ "--i": PRIMARY_NAV.length }}>
              <span className="menu__num numeral">
                {String(PRIMARY_NAV.length + 1).padStart(2, "0")}
              </span>
              <NavItem
                item={{ label: "contact", hash: CONTACT_HASH }}
                t={t}
                go={go}
                onNavigate={close}
                className="menu__link"
              />
            </li>
          </ol>
        </nav>

        <div className="menu__foot container">
          <a href={`mailto:${SITE.contact.email}`} className="menu__email">
            {SITE.contact.email}
          </a>
          <LangSwitch />
        </div>
      </div>
    </>
  );
}
