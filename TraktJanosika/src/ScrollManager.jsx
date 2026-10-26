// src/ScrollManager.jsx
import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// useLayoutEffect warns during prerendering; effects don't run there anyway
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// scroll position per history entry, for Back/Forward
const positions = new Map();

/**
 * Route-change scrolling (returns no UI):
 *   - new navigation with a hash (/#contact) → scroll to that section
 *   - new navigation without a hash          → jump to the top (instantly)
 *   - Back/Forward                           → restore where the visitor was
 */
export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const { pathname, hash, key } = location;

  // the router manages restoration, not the browser
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  // keep recording the position of the current entry (saving it on leave is
  // too late: the next page may already be rendered or the scroll clamped)
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => positions.set(key, window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [key]);

  useIsoLayoutEffect(() => {
    if (navType === "POP" && positions.has(key)) {
      window.scrollTo({ top: positions.get(key), behavior: "instant" });
      return;
    }
    if (hash) {
      // defer so the target section has rendered
      const id = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return () => clearTimeout(id);
    }
    if (navType !== "POP") window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key, navType]);

  return null;
}
