import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANG,
  DICTIONARIES,
  LANGUAGES,
  LanguageContext,
  STORAGE_KEY,
} from "./context";

/* Saved or ?lang= choice. Read after mount: pages are prerendered in Polish,
   so the first client render must match before switching language. */
function detectLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (LANGUAGES.includes(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    /* storage unavailable (private mode) — fall through */
  }
  return DEFAULT_LANG;
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);

  useEffect(() => {
    const detected = detectLang();
    if (detected !== DEFAULT_LANG) setLangState(detected);
  }, []);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: DICTIONARIES[lang], setLang }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

// Development-only guard: warn when pl.js and en.js keys drift apart.
if (import.meta.env.DEV) {
  const walk = (obj, prefix = "") =>
    Object.entries(obj).flatMap(([k, v]) =>
      v && typeof v === "object" && !Array.isArray(v)
        ? walk(v, `${prefix}${k}.`)
        : [`${prefix}${k}`]
    );
  const [plKeys, enKeys] = LANGUAGES.map((l) => new Set(walk(DICTIONARIES[l])));
  const missingEn = [...plKeys].filter((k) => !enKeys.has(k));
  const missingPl = [...enKeys].filter((k) => !plKeys.has(k));
  if (missingEn.length) console.warn("[i18n] missing in en.js:", missingEn);
  if (missingPl.length) console.warn("[i18n] missing in pl.js:", missingPl);
}
