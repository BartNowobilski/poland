import { useEffect, useRef, useState } from "react";
import { loadScript, loadStyle } from "../../lib/loadAsset";
import { ExpandIcon } from "../ui/Icon";
import "./Panorama.css";

const PANNELLUM_JS = "/vendor/pannellum/pannellum.js";
const PANNELLUM_CSS = "/vendor/pannellum/pannellum.css";

/**
 * 360° panorama (Pannellum, self-hosted, loaded on demand).
 * Starts as a gently auto-rotating, non-interactive preview so it never traps
 * page scrolling on touch screens; one click/tap hands control to the visitor.
 */
export default function Panorama({ src, poster, label, activateLabel, hint }) {
  const frameRef = useRef(null);
  const viewerEl = useRef(null);
  const viewer = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);

  // only fetch the library when the viewer approaches the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(frameRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    Promise.all([loadScript(PANNELLUM_JS), loadStyle(PANNELLUM_CSS)])
      .then(() => {
        if (cancelled || !window.pannellum) return;
        viewer.current = window.pannellum.viewer(viewerEl.current, {
          type: "equirectangular",
          panorama: src,
          autoLoad: true,
          autoRotate: reduce ? 0 : -1.5,
          showControls: false,
          compass: false,
          draggable: false,
          mouseZoom: false,
          keyboardZoom: false,
          hfov: 100,
        });
        viewer.current.on("load", () => !cancelled && setReady(true));
      })
      .catch(() => {
        /* keep the poster if the viewer can't start (e.g. no WebGL) */
      });
    return () => {
      cancelled = true;
      viewer.current?.destroy?.();
      viewer.current = null;
    };
  }, [near, src]);

  const activate = () => {
    const v = viewer.current;
    if (!v) return;
    // Pannellum has no runtime "draggable" setter — re-create it interactively
    // at the same view (the image is already cached).
    const pitch = v.getPitch();
    const yaw = v.getYaw();
    const hfov = v.getHfov();
    v.destroy();
    viewer.current = window.pannellum.viewer(viewerEl.current, {
      type: "equirectangular",
      panorama: src,
      autoLoad: true,
      showControls: true,
      showFullscreenCtrl: true,
      showZoomCtrl: true,
      compass: false,
      pitch,
      yaw,
      hfov,
    });
    setActive(true);
  };

  return (
    <div
      ref={frameRef}
      className={`panorama ${ready ? "is-ready" : ""} ${active ? "is-active" : ""}`}
      style={poster && near ? { "--poster": `url("${poster}")` } : undefined}
    >
      <div ref={viewerEl} className="panorama__viewer" role="img" aria-label={label} />
      {!active && (
        <button type="button" className="panorama__activate" onClick={activate} disabled={!ready}>
          <span className="panorama__badge numeral" aria-hidden="true">
            360°
          </span>
          <span className="panorama__cta">
            <ExpandIcon className="icon" />
            {activateLabel}
          </span>
        </button>
      )}
      {active && <p className="panorama__hint">{hint}</p>}
    </div>
  );
}
