import { useEffect, useRef, useState } from "react";
import "./Picture.css";

/**
 * Responsive, layout-stable image.
 *
 * `image` is either a path string or a manifest entry:
 *   {
 *     src: "/img/h2-1280.jpg",             // fallback <img> src
 *     width: 3840, height: 2560,           // intrinsic size → reserves space (no CLS)
 *     srcset: "/img/h2-640.jpg 640w, …",   // optional JPEG srcset
 *     sources: { avif: "…", webp: "…" },   // optional modern-format srcsets
 *     placeholder: "data:image/…",         // optional tiny blurred preview
 *     color: "#b8a58c",                    // optional dominant colour
 *     position: "50% 40%",                 // optional focal point for crops
 *   }
 *
 * Props:
 *   ratio     CSS aspect-ratio for the frame ("4 / 5"); defaults to intrinsic ratio
 *   fit       "cover" | "contain"
 *   priority  above-the-fold: eager load + fetchpriority=high, no fade
 *   sizes     standard `sizes` attribute (defaults to full width)
 */
export default function Picture({
  image,
  alt,
  ratio,
  fit = "cover",
  sizes = "100vw",
  priority = false,
  className = "",
  imgClassName = "",
  position,
  ...rest
}) {
  const img = typeof image === "string" ? { src: image } : image ?? {};
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(priority);

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [img.src]);

  const frameRatio =
    ratio ?? (img.width && img.height ? `${img.width} / ${img.height}` : undefined);

  const style = {
    aspectRatio: frameRatio,
    "--ph-color": img.color,
    "--ph-image": img.placeholder ? `url("${img.placeholder}")` : undefined,
  };

  return (
    <div
      className={[
        "picture",
        `picture--${fit}`,
        loaded && "is-loaded",
        priority && "is-priority",
        frameRatio && "picture--framed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      {...rest}
    >
      <picture>
        {img.sources?.avif && (
          <source type="image/avif" srcSet={img.sources.avif} sizes={sizes} />
        )}
        {img.sources?.webp && (
          <source type="image/webp" srcSet={img.sources.webp} sizes={sizes} />
        )}
        <img
          ref={ref}
          src={img.src}
          srcSet={img.srcset}
          sizes={img.srcset ? sizes : undefined}
          width={img.width}
          height={img.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          className={imgClassName}
          style={{ objectPosition: position ?? img.position }}
        />
      </picture>
    </div>
  );
}
