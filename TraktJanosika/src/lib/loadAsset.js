/* Load a script/stylesheet once, on demand. Returns a cached promise. */
const cache = new Map();

export function loadScript(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const el = document.createElement("script");
        el.src = src;
        el.async = true;
        el.onload = resolve;
        el.onerror = () => {
          cache.delete(src);
          reject(new Error(`Failed to load ${src}`));
        };
        document.head.appendChild(el);
      })
    );
  }
  return cache.get(src);
}

export function loadStyle(href) {
  if (!cache.has(href)) {
    cache.set(
      href,
      new Promise((resolve, reject) => {
        const el = document.createElement("link");
        el.rel = "stylesheet";
        el.href = href;
        el.onload = resolve;
        el.onerror = reject;
        document.head.appendChild(el);
      })
    );
  }
  return cache.get(href);
}
