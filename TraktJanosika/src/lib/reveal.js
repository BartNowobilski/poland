/* One shared IntersectionObserver for every [data-reveal] element.
   Elements are revealed once, then unobserved. */
let observer = null;

function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  if (!("IntersectionObserver" in window)) return null;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );
  return observer;
}

/** Start observing; returns a cleanup function. */
export function observeReveal(el) {
  if (!el) return () => {};
  const io = getObserver();
  if (!io) {
    el.classList.add("is-revealed");
    return () => {};
  }
  io.observe(el);
  return () => io.unobserve(el);
}

/** Opt the document into reveal animations (call once, before first render). */
export function enableReveal() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("has-reveal");
}
