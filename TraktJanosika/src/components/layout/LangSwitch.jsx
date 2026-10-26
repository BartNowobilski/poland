import { DICTIONARIES, LANGUAGES, useLanguage } from "../../i18n/context";

/** Segmented PL | EN switch. */
export default function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.nav.language}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className="lang-switch__btn"
          aria-pressed={lang === code}
          aria-label={DICTIONARIES[code].meta.switchTo}
          lang={code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
