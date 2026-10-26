import { useCallback, useState } from "react";
import { SITE } from "../content/site";

/**
 * Submits the inquiry form to Formspree (same endpoint & payload as before).
 * status: "idle" | "sending" | "success" | "error" | "network-error"
 */
export function useInquiry() {
  const [status, setStatus] = useState("idle");

  const submit = useCallback(async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const data = new FormData(form);
      data.append("_subject", "New inquiry from Trakt Janosika website");
      data.append("_url", window.location.href);

      const res = await fetch(SITE.integrations.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Formspree error:", await res.json().catch(() => res.status));
        setStatus("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("network-error");
    }
  }, []);

  return { status, submit };
}
