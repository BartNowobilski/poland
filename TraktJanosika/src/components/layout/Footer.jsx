import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/context";
import { CONTACT_HASH, NAV_ITEMS } from "../../content/navigation";
import { SITE, telHref } from "../../content/site";
import { useSectionLink } from "../../lib/useSectionLink";
import { MailIcon, MapPinIcon, PhoneIcon } from "../ui/Icon";
import Logo from "./Logo";
import Ornament, { MountainRidge } from "./Ornament";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const go = useSectionLink();
  const { contact, address, maps } = SITE;
  const year = new Date().getFullYear();

  return (
    <footer className="footer tone-forest on-dark">
      <MountainRidge className="footer__ridge" />

      <div className="footer__main container">
        <div className="footer__brand">
          <Logo light className="footer__logo" />
          <p className="footer__motto">{t.brand.motto}</p>
          <Ornament variant="mark" className="footer__ornament" />
        </div>

        <nav className="footer__col" aria-label={t.footer.navLabel}>
          <h2 className="footer__title">{t.footer.explore}</h2>
          <ul role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.to ? (
                  <Link to={item.to}>{t.nav[item.label]}</Link>
                ) : (
                  <a href={`/#${item.hash}`} onClick={(e) => go(item.hash, e)}>
                    {t.nav[item.label]}
                  </a>
                )}
              </li>
            ))}
            <li>
              <a href={`/#${CONTACT_HASH}`} onClick={(e) => go(CONTACT_HASH, e)}>
                {t.nav.contact}
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">{t.footer.contact}</h2>
          <ul role="list" className="footer__contact">
            <li>
              <MailIcon className="icon" />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            {contact.phone && (
              <li>
                <PhoneIcon className="icon" />
                <a href={telHref(contact.phone)}>{contact.phone}</a>
              </li>
            )}
            <li>
              <MapPinIcon className="icon" />
              <a href={maps.shareUrl} target="_blank" rel="noopener noreferrer">
                <address>
                  {address.street}
                  <br />
                  {address.postalCode} {address.locality}
                </address>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>
          © <span suppressHydrationWarning>{year}</span> {SITE.name}. {t.footer.rights}
        </p>
        <p>{t.footer.visualisationNote}</p>
      </div>
    </footer>
  );
}
