// src/ScrollManager.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll to hash if present (e.g., /#contact), else to page top on route change.
 * Returns null (no UI).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Defer to let the new route render first.
    const id = setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      // No hash or element not found → scroll to top
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);

    return () => clearTimeout(id);
  }, [pathname, hash]);

  return null;
}
