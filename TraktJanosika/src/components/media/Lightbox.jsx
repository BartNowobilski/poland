import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../../i18n/context";
import { useModal } from "../../lib/useModal";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "../ui/Icon";
import "./Lightbox.css";

/**
 * Fullscreen image viewer.
 *   items:   [{ image, alt, caption?, render? }]   (image = manifest image)
 *   index:   open at this item; null = closed
 *   onClose / onIndex
 * Only the current image and its two neighbours are mounted, so a gallery of
 * hundreds of photos never loads more than three full-size files at once.
 * Keyboard: ← → Home End Esc · Touch: swipe left/right, swipe down to close.
 */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const open = index != null && items.length > 0;
  const count = items.length;

  const go = useCallback(
    (delta) => onIndex((((index ?? 0) + delta) % count + count) % count),
    [index, count, onIndex]
  );

  useModal(ref, open, onClose, { initialFocus: ".lightbox__close" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Home") onIndex(0);
      else if (e.key === "End") onIndex(count - 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, go, onIndex, count]);

  // swipe gestures
  const touch = useRef(null);
  const [drag, setDrag] = useState(0);
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse") return;
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e) => {
    if (!touch.current) return;
    setDrag(e.clientX - touch.current.x);
  };
  const onPointerUp = (e) => {
    if (!touch.current) return;
    const dx = e.clientX - touch.current.x;
    const dy = e.clientY - touch.current.y;
    touch.current = null;
    setDrag(0);
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
  };

  if (!open) return null;

  const current = items[index];
  const visible = count > 1 ? [index - 1, index, index + 1].map((i) => (i + count) % count) : [index];

  return createPortal(
    <div
      ref={ref}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.lightboxLabel}
    >
      <div className="lightbox__bar">
        <p className="lightbox__counter numeral" aria-live="polite">
          {index + 1} <span>/</span> {count}
        </p>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label={t.gallery.close}>
          <CloseIcon className="icon" />
        </button>
      </div>

      <div
        className="lightbox__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {[...new Set(visible)].map((i) => {
          const item = items[i];
          const img = item.image;
          const isCurrent = i === index;
          return (
            <figure
              key={img.id ?? img.src}
              className={`lightbox__slide ${isCurrent ? "is-current" : ""}`}
              aria-hidden={!isCurrent}
              style={isCurrent && drag ? { transform: `translateX(${drag}px)`, transition: "none" } : undefined}
            >
              <picture>
                {img.sources?.avif && <source type="image/avif" srcSet={img.sources.avif} sizes="100vw" />}
                {img.sources?.webp && <source type="image/webp" srcSet={img.sources.webp} sizes="100vw" />}
                <img
                  src={img.src}
                  alt={item.alt}
                  width={img.width}
                  height={img.height}
                  decoding="async"
                  draggable={false}
                />
              </picture>
            </figure>
          );
        })}
      </div>

      {count > 1 && (
        <>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label={t.gallery.prev}>
            <ChevronLeftIcon className="icon" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label={t.gallery.next}>
            <ChevronRightIcon className="icon" />
          </button>
        </>
      )}

      <div className="lightbox__caption">
        <p>{current.caption ?? current.alt}</p>
        {current.render && <span className="lightbox__tag">{t.common.visualisation}</span>}
      </div>
    </div>,
    document.body
  );
}
