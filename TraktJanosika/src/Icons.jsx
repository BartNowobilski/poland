import React from "react";
/* =========================
   UI BITS
========================= */

/* ---------- Field (form input wrapper) ---------- */
export function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      {textarea ? (
        <textarea name={name} rows={4} required={required} />
      ) : (
        <input name={name} type={type} required={required} />
      )}
    </label>
  );
}

/* ---------- NearbyCard ---------- */
export function NearbyCard({ icon: Icon, text }) {
  return (
    <div className="nearby-card">
      <Icon />
      <p>{text}</p>
    </div>
  );
}

/* ---------- Icons ---------- */

export function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path d="M3 20l7-12 4 7 2-3 5 8H3z" fill="currentColor" />
    </svg>
  );
}

export function TreesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path
        d="M12 2l4 7h-3l3 5h-3l2 4H9l2-4H8l3-5H8l4-7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BikeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <circle cx="6.5" cy="17.5" r="3.5" fill="currentColor" />
      <circle cx="17.5" cy="17.5" r="3.5" fill="currentColor" />
      <path
        d="M10 17.5h3l-3-7h5l2 3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path
        d="M3 14l2-5a3 3 0 012.8-2h8.4A3 3 0 0119 9l2 5v4h-2a2 2 0 01-4 0H9a2 2 0 01-4 0H3v-4z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path
        d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path
        d="M3 6h18v12H3z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M3 6l9 7 9-7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="svg" aria-hidden="true">
      <path
        d="M6 2h4l2 5-2 2a14 14 0 006 6l2-2 5 2v4a2 2 0 01-2 2C10 21 3 14 2 4a2 2 0 012-2z"
        fill="currentColor"
      />
    </svg>
  );
}
