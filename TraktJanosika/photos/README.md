# Photos — originals

Put original, full-resolution photos here. They are **never modified** and are
not deployed; the site uses optimised copies generated into `public/img/`.

```
photos/
  architecture/    exterior photos of the homes
  interiors/       interior photos
  surroundings/    landscape, Białka, Tatras, nearby attractions
  lifestyle/       seasons, people, everyday life
  construction/    construction progress, ideally one folder per visit:
    2026-03/         photos/construction/2026-03/fundamenty-01.jpg
  renderings/      new architectural visualisations
```

The **first folder decides the gallery category**. Deeper folders are only for
your own organisation.

## Adding photos

1. Copy the files into the right folder. Use simple names (letters, digits,
   dashes); Polish characters are fine and get transliterated.
2. Run:

   ```bash
   npm run images
   ```

   This creates AVIF + JPEG versions in several sizes, a blurred placeholder,
   and updates `src/content/image-manifest.json`. Only new or changed files
   are processed.
3. That's it: the photo now appears in the gallery under its category.

**Image id** = path inside `photos/`, lower-case, with `/` replaced by `-`,
without the extension:

| file | id |
| --- | --- |
| `photos/interiors/salon-zima.jpg` | `interiors-salon-zima` |
| `photos/construction/2026-03/fundamenty-01.jpg` | `construction-2026-03-fundamenty-01` |

Use the id to:

- give a photo a proper **alt text**, position or the `featured` flag (homepage
  gallery) in `src/content/gallery.js`;
- attach photos to a **construction update** in `src/content/progress.js`;
- use photos for a **house** (`cover`, `gallery`, `floorPlans`) in
  `src/content/residences.js`.

## Replacing or removing

- Replace: overwrite the file with the same name and run `npm run images`.
- Remove: delete the file and run `npm run images` — its derivatives are
  deleted too.

## Tips

- Export at least 2560 px on the long edge for full-width photos.
- JPEG, PNG, WebP, TIFF and AVIF are accepted. iPhone HEIC photos: export
  them as JPEG first (Photos → File → Export).
- Do not add stock photos or images you don't have the rights to.
- **Location data:** this repository is public and originals keep their
  metadata. Phone photos usually contain GPS coordinates — export them
  without location (iPhone: Share → Options → turn off "Location") before
  adding them here. The website copies in `public/img/` never contain any
  metadata (it is stripped automatically).
- iPhone HEIC files can be converted on a Mac with:
  `sips -s format jpeg -s formatOptions 95 IMG_0001.HEIC --out photos/interiors/name.jpg`
