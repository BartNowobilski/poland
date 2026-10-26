/* Build-time prerendering entry (see scripts/prerender.mjs).
   Renders a route to static HTML in Polish, the primary language. */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import Root from "./Root.jsx";
import pl from "./i18n/pl.js";

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <Root />
      </StaticRouter>
    </StrictMode>
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

/* Per-page <head> values for the static HTML (client updates them on language switch). */
export const PAGES = [
  { url: "/", file: "index.html", title: pl.meta.title, description: pl.meta.description, canonical: "/" },
  {
    url: "/gallery",
    file: "gallery.html",
    title: pl.meta.galleryTitle,
    description: pl.meta.galleryDescription,
    canonical: "/gallery",
  },
  { url: "/__not-found", file: "404.html", title: pl.meta.notFoundTitle, description: pl.meta.description, noindex: true },
];
