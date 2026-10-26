import { CATEGORIES, GALLERY } from "../content/gallery";
import { PROGRESS } from "../content/progress";
import { localize } from "../i18n/context";
import { getImage, hasImage, imagesInCategory } from "./images";

/** "2026-03" → "marzec 2026" / "March 2026"; "2026-03-14" → "14 marca 2026". */
export function formatDate(date, lang) {
  const [y, m, d] = date.split("-").map(Number);
  const value = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  const locale = lang === "pl" ? "pl-PL" : "en-GB";
  const opts = d
    ? { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    : { month: "long", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(locale, opts).format(value);
}

/** Progress entries, newest first, with resolved images. */
export function buildProgress(lang) {
  return [...PROGRESS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((entry) => {
      const title = localize(entry.title, lang);
      const dateLabel = formatDate(entry.date, lang);
      return {
        ...entry,
        title,
        text: localize(entry.text, lang),
        dateLabel,
        items: entry.photos.filter(hasImage).map((id, i) => ({
          id,
          image: getImage(id),
          alt: `${title} — ${dateLabel} (${i + 1})`,
          category: "construction",
        })),
      };
    });
}

/**
 * Every gallery item, localized:
 *   explicit GALLERY entries (in order) → auto-discovered photos/<category>/ files
 *   → construction photos from progress.js (newest first).
 */
export function buildGallery(lang) {
  const listed = new Set();
  const items = [];

  for (const entry of GALLERY) {
    const image = getImage(entry.id, entry.position ? { position: entry.position } : undefined);
    if (!image) continue;
    listed.add(entry.id);
    items.push({ ...entry, image, alt: localize(entry.alt, lang), caption: localize(entry.caption, lang) });
  }

  // construction photos belong in progress.js; skip any also listed above
  const progressItems = buildProgress(lang)
    .flatMap((e) => e.items)
    .filter((p) => !listed.has(p.id) && listed.add(p.id));

  for (const { id: category, label } of CATEGORIES) {
    imagesInCategory(category)
      .filter((id) => !listed.has(id))
      .forEach((id, i) => {
        listed.add(id);
        items.push({
          id,
          category,
          render: category === "renderings",
          image: getImage(id),
          alt: `${localize(label, lang)} — Trakt Janosika (${i + 1})`,
        });
      });
  }

  return [...items, ...progressItems];
}

/** Categories that actually have photos, plus a "renderings" filter when it is a real subset. */
export function availableCategories(items) {
  return CATEGORIES.filter(({ id }) => {
    if (id === "renderings") {
      const renders = items.filter((i) => i.render || i.category === "renderings").length;
      return renders > 0 && renders < items.length;
    }
    return items.some((i) => i.category === id);
  });
}

export function filterGallery(items, category) {
  if (!category) return items;
  if (category === "renderings") return items.filter((i) => i.render || i.category === "renderings");
  return items.filter((i) => i.category === category);
}
