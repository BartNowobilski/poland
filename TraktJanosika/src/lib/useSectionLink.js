import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Returns `go(hash)` — scrolls to a homepage section.
 * On the homepage it scrolls in place (and updates the URL hash);
 * from other routes it navigates to "/#hash" and ScrollManager finishes the job.
 */
export function useSectionLink() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (hash, event) => {
      if (pathname !== "/") {
        event?.preventDefault();
        navigate(hash ? `/#${hash}` : "/");
        return;
      }
      event?.preventDefault();
      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
        return;
      }
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${hash}`);
      }
    },
    [pathname, navigate]
  );
}
