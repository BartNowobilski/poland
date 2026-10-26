/* Brand logo — original artwork, transparent padding trimmed only.
   `light` renders it in ivory for dark backgrounds (colour change only). */
export default function Logo({ light = false, className = "" }) {
  return (
    <picture>
      <source type="image/avif" srcSet="/brand/logo-240.avif 1x, /brand/logo-480.avif 2x" />
      <source type="image/webp" srcSet="/brand/logo-240.webp 1x, /brand/logo-480.webp 2x" />
      <img
        src="/brand/logo-240.png"
        srcSet="/brand/logo-240.png 1x, /brand/logo-480.png 2x"
        width="240"
        height="109"
        alt="Trakt Janosika"
        className={`logo ${light ? "logo--light" : ""} ${className}`}
        decoding="async"
      />
    </picture>
  );
}
