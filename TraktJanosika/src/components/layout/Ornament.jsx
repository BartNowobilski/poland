/* Restrained Podhale motifs, drawn as fine-line SVG (decorative, aria-hidden).
 *
 *   <Ornament />                    parzenica with hairlines — section divider
 *   <Ornament variant="mark" />     parzenica only — above headings
 *   <Ornament variant="rosette" />  six-petal carved rosette (rozeta)
 *   <MountainRidge />               Tatra skyline silhouette (fills currentColor)
 *
 * Colour follows `currentColor`; size via CSS width.
 */
import "./Ornament.css";

const HALF = (
  <>
    <path d="M120 56c7-9 25-15 25-28 0-11-12-15-17-9-4 5 1 11 6 8 3-2 2-6-1-6" />
    <path d="M139 42.5c11 3 19-4 17-11-2-5-8-4-7 0" />
  </>
);

function Parzenica() {
  return (
    <>
      <path d="M120 7l3 4-3 4-3-4z" fill="currentColor" stroke="none" />
      <path d="M120 18v5" />
      <path d="M120 46c-4-6-4-13 0-19 4 6 4 13 0 19Z" />
      <g>{HALF}</g>
      <g transform="translate(240 0) scale(-1 1)">{HALF}</g>
    </>
  );
}

export default function Ornament({ variant = "divider", className = "" }) {
  if (variant === "rosette") {
    return (
      <svg
        viewBox="0 0 96 96"
        className={`ornament ornament--rosette ${className}`}
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
          <circle cx="48" cy="48" r="22" />
          <circle cx="48" cy="48" r="25.5" strokeDasharray=".1 3.2" strokeWidth="1.4" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M48 48A22 22 0 0 1 48 26A22 22 0 0 1 48 48"
              transform={`rotate(${deg} 48 48)`}
            />
          ))}
          <circle cx="48" cy="48" r="1.6" />
        </g>
      </svg>
    );
  }

  const withLines = variant === "divider";
  return (
    <svg
      viewBox={withLines ? "0 0 240 64" : "76 0 88 64"}
      className={`ornament ornament--${variant} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <Parzenica />
        {withLines && (
          <>
            <path d="M162 32h74M4 32h74" strokeOpacity=".5" />
            <circle cx="159" cy="32" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="81" cy="32" r="1.2" fill="currentColor" stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}

export function MountainRidge({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`ridge ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M0 120V94l70-16 52 8 64-28 38 10 52-34 30 14 46-30 26 18 40-10 58 30 46-8 52 22 60-46 28 14 44-36 24 12 30-16 52 38 42-12 64 30 58-14 48 20 56-24 40 10 46-18 60 30 46-8 54 22 114-8v58Z"
      />
    </svg>
  );
}
