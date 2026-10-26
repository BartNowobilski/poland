import { format, localize, useLanguage } from "../i18n/context";
import { IMAGES } from "../content/images";
import { RESIDENCES } from "../content/residences";
import { SITE, telHref } from "../content/site";
import { useInquiry } from "../lib/useInquiry";
import { Section } from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";
import Picture from "../components/media/Picture";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import Rich from "../components/ui/Rich";
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/ui/Icon";
import "./Contact.css";

export default function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const { status, submit } = useInquiry();
  const { contact, address, maps, dataController } = SITE;

  const controller = dataController.name
    ? [dataController.name, dataController.address, dataController.nip && `NIP ${dataController.nip}`]
        .filter(Boolean)
        .join(", ")
    : c.controllerPlaceholder;

  const statusText = {
    success: c.success,
    error: c.error,
    "network-error": c.networkError,
  }[status];

  return (
    <Section id="contact" tone="sand" labelledBy="contact-title" className="contact">
      <div className="container contact__grid">
        <div className="contact__intro">
          <Reveal variant="fade">
            <p className="eyebrow">{c.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="contact-title" className="h1 contact__title">
              <Rich text={c.title} />
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead">{c.blurb}</p>
          </Reveal>

          <Reveal delay={220} className="contact__block">
            <h3 className="contact__label">{c.receiveLabel}</h3>
            <ul role="list" className="contact__receive">
              {c.receive.map((item) => (
                <li key={item}>
                  <CheckIcon className="icon" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280} className="contact__block">
            <h3 className="contact__label">{c.directLabel}</h3>
            <ul role="list" className="contact__direct">
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
                  {address.street}, {address.postalCode} {address.locality}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal variant="mask" delay={200} className="contact__image">
            <Picture
              image={IMAGES.houseGarden}
              ratio="16 / 10"
              alt={c.imageAlt}
              sizes="(min-width: 960px) 38vw, 100vw"
            />
          </Reveal>
        </div>

        <Reveal as="form" onSubmit={submit} className="contact__form" autoComplete="on">
          <div className="contact__row">
            <Field label={c.firstName} name="firstName" autoComplete="given-name" required />
            <Field label={c.lastName} name="lastName" autoComplete="family-name" required />
          </div>
          <div className="contact__row">
            <Field label={c.email} name="email" type="email" autoComplete="email" inputMode="email" required />
            <Field label={c.phone} name="phone" type="tel" autoComplete="tel" inputMode="tel" />
          </div>
          <Field label={c.interest} name="interest" as="select" defaultValue="">
            <option value="">{c.interestGeneral}</option>
            {RESIDENCES.map((r) => (
              <option key={r.id} value={r.label.pl}>
                {localize(r.label, lang)}
              </option>
            ))}
          </Field>
          <Field label={c.message} name="message" as="textarea" />

          {/* honeypot — Formspree discards submissions that fill this */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
          <input type="hidden" name="language" value={lang} />

          <label className="check">
            <input type="checkbox" name="consent" value="yes" required />
            <span>
              {c.consent} <span aria-hidden="true">*</span>
            </span>
          </label>

          <details className="contact__privacy">
            <summary>{c.privacyMore}</summary>
            <p>{format(c.privacy, { controller })}</p>
          </details>

          <Button type="submit" block arrow disabled={status === "sending"} aria-busy={status === "sending"}>
            {status === "sending" ? c.sending : c.send}
          </Button>

          <p className="contact__required">{c.required}</p>
          <p
            className={`contact__status ${status === "success" ? "is-success" : ""}`}
            role="status"
            aria-live="polite"
          >
            {statusText}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
