import { useEffect, useRef } from "react";

/* Shared behaviour for dialogs (mobile menu, lightbox, residence details):
   - everything outside the dialog becomes `inert` (no focus, hidden from AT)
   - body scroll lock, Escape closes the top-most dialog only
   - focus moves in on open and returns to the trigger on close
   Supports stacking (e.g. a lightbox opened from a residence dialog). */

const stack = [];

function inertOutside(el) {
  const changed = [];
  let node = el;
  while (node && node !== document.body) {
    const parent = node.parentElement;
    if (!parent) break;
    for (const sibling of parent.children) {
      if (sibling !== node && !sibling.inert && sibling.tagName !== "SCRIPT") {
        sibling.inert = true;
        changed.push(sibling);
      }
    }
    node = parent;
  }
  return () => changed.forEach((s) => (s.inert = false));
}

/**
 * @param {React.RefObject<HTMLElement>} ref   dialog element
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {{ initialFocus?: string }} options  CSS selector inside the dialog
 */
export function useModal(ref, open, onClose, { initialFocus } = {}) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;

    const trigger = document.activeElement;
    const token = {};
    stack.push(token);
    const restoreInert = inertOutside(el);
    document.body.classList.add("is-locked");

    const target =
      (initialFocus && el.querySelector(initialFocus)) ||
      el.querySelector("button, [href], input, [tabindex]:not([tabindex='-1'])");
    target?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === "Escape" && stack[stack.length - 1] === token) {
        e.stopPropagation();
        closeRef.current();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      stack.splice(stack.indexOf(token), 1);
      restoreInert();
      if (!stack.length) document.body.classList.remove("is-locked");
      if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
    };
  }, [ref, open, initialFocus]);
}
