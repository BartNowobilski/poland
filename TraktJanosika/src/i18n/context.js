import { createContext, useContext } from "react";
import pl from "./pl";
import en from "./en";

export const DICTIONARIES = { pl, en };
export const LANGUAGES = ["pl", "en"];
export const DEFAULT_LANG = "pl";
export const STORAGE_KEY = "tj-lang";

export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  t: pl,
  setLang: () => {},
});

/** Access the active language, its dictionary (`t`) and `setLang`. */
export function useLanguage() {
  return useContext(LanguageContext);
}

/** Replace `{name}` tokens: format("Photo {n}", { n: 3 }) → "Photo 3". */
export function format(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (m, key) =>
    key in values ? String(values[key]) : m
  );
}

/** Pick the right language from a `{ pl, en }` content object (falls back to Polish). */
export function localize(value, lang) {
  if (value == null || typeof value !== "object") return value;
  return value[lang] ?? value[DEFAULT_LANG];
}
