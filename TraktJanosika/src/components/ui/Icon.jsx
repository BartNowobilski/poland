/* Fine-line icon set (24px grid, 1.5 stroke) — inherits currentColor. */

function Svg({ className = "icon", children, title, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const ArrowIcon = (p) => (
  <Svg {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </Svg>
);
export const ArrowDownIcon = (p) => (
  <Svg {...p}>
    <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" />
  </Svg>
);
export const ChevronLeftIcon = (p) => (
  <Svg {...p}>
    <path d="m15 5-7 7 7 7" />
  </Svg>
);
export const ChevronRightIcon = (p) => (
  <Svg {...p}>
    <path d="m9 5 7 7-7 7" />
  </Svg>
);
export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M5 5l14 14M19 5 5 19" />
  </Svg>
);
export const MailIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </Svg>
);
export const PhoneIcon = (p) => (
  <Svg {...p}>
    <path d="M5 3.5h3.2l1.6 4.3-2.1 1.4a11.5 11.5 0 0 0 7.1 7.1l1.4-2.1 4.3 1.6V19a1.5 1.5 0 0 1-1.5 1.5C10.4 20.5 3.5 13.6 3.5 5A1.5 1.5 0 0 1 5 3.5Z" />
  </Svg>
);
export const MapPinIcon = (p) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-6.1-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21Z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </Svg>
);
export const MountainIcon = (p) => (
  <Svg {...p}>
    <path d="m2.5 19.5 6.5-11 3.6 6 2.4-3.6 6.5 8.6Z" />
    <path d="m7.3 11.4 1.7 1.3 1.5-1.4" />
  </Svg>
);
export const TreesIcon = (p) => (
  <Svg {...p}>
    <path d="M8 21v-4M8 3l4.5 7.5H10l3.5 6.5h-11L6 10.5H3.5Z" />
    <path d="M17 21v-3M16 7.5l4.5 10.5h-7" />
  </Svg>
);
export const WaterIcon = (p) => (
  <Svg {...p}>
    <path d="M2.5 9c1.6 0 1.6-1.2 3.2-1.2S7.3 9 8.9 9s1.6-1.2 3.1-1.2S13.6 9 15.2 9s1.6-1.2 3.1-1.2S19.9 9 21.5 9" />
    <path d="M2.5 13.5c1.6 0 1.6-1.2 3.2-1.2s1.6 1.2 3.2 1.2 1.6-1.2 3.1-1.2 1.6 1.2 3.2 1.2 1.6-1.2 3.1-1.2 1.6 1.2 3.2 1.2" />
    <path d="M2.5 18c1.6 0 1.6-1.2 3.2-1.2S7.3 18 8.9 18s1.6-1.2 3.1-1.2S13.6 18 15.2 18s1.6-1.2 3.1-1.2S19.9 18 21.5 18" />
  </Svg>
);
export const SpaIcon = (p) => (
  <Svg {...p}>
    <path d="M3 16.5c2.2 1.6 4.2 1.6 6 0s3.8-1.6 6 0 4.2 1.6 6 0" />
    <path d="M3 20.5c2.2 1.6 4.2 1.6 6 0s3.8-1.6 6 0 4.2 1.6 6 0" />
    <path d="M8 12.5c-1.2-1.6-1.2-3.4 0-5s1.2-3.4 0-5M12 12.5c-1.2-1.6-1.2-3.4 0-5s1.2-3.4 0-5M16 12.5c-1.2-1.6-1.2-3.4 0-5s1.2-3.4 0-5" />
  </Svg>
);
export const SkiIcon = (p) => (
  <Svg {...p}>
    <circle cx="15.5" cy="4.5" r="1.6" />
    <path d="m3 15 18 6M9 10.5l4-2.5 2 3.5-3 3 2 4M13 8l3.5 3.5L20 10" />
  </Svg>
);
export const BikeIcon = (p) => (
  <Svg {...p}>
    <circle cx="5.5" cy="16.5" r="3.5" />
    <circle cx="18.5" cy="16.5" r="3.5" />
    <path d="M5.5 16.5 9 9h6.5l3 7.5M9 9 12 16.5h-1M15 5.5h2l-1.5 3.5" />
  </Svg>
);
export const CarIcon = (p) => (
  <Svg {...p}>
    <path d="M4 16.5v-4l2-5a2 2 0 0 1 1.9-1.3h8.2A2 2 0 0 1 18 7.5l2 5v4" />
    <path d="M3 16.5h18v2H3zM4.5 12.5h15" />
    <circle cx="7.5" cy="14.5" r=".6" fill="currentColor" />
    <circle cx="16.5" cy="14.5" r=".6" fill="currentColor" />
  </Svg>
);
export const ExpandIcon = (p) => (
  <Svg {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Svg>
);
export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
