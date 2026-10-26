import { useLanguage } from "../i18n/context";
import { useDocumentMeta } from "../lib/useDocumentMeta";
import { Section } from "../components/layout/Section";
import Ornament from "../components/layout/Ornament";
import Button from "../components/ui/Button";

export default function NotFound() {
  const { t } = useLanguage();
  useDocumentMeta({ title: t.meta.notFoundTitle, noindex: true });
  return (
    <Section className="not-found" labelledBy="nf-title">
      <div
        className="container container--narrow"
        style={{ minHeight: "60vh", display: "grid", placeContent: "center", justifyItems: "center", gap: "1.5rem", textAlign: "center", paddingTop: "var(--nav-h)" }}
      >
        <Ornament variant="mark" />
        <p className="display numeral" aria-hidden="true">404</p>
        <h1 id="nf-title" className="h2">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.text}</p>
        <Button to="/" arrow>{t.notFound.home}</Button>
      </div>
    </Section>
  );
}
