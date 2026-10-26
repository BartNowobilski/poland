import { useEffect } from "react";

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/);
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/** Keeps <title>, description, canonical and robots in sync with the page + language. */
export function useDocumentMeta({ title, description, path = "/", noindex = false }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", noindex ? "noindex, follow" : "index, follow");
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `https://www.traktjanosika.pl${path}`;
  }, [title, description, path, noindex]);
}
