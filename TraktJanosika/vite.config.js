import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hero image id — keep in sync with IMAGES.aerial in src/content/images.js
const HERO_IMAGE = 'bialka'

/* Injects <link rel="preload"> for the hero image (AVIF srcset + version from
   the generated manifest) so the browser starts the LCP download immediately. */
function heroPreload() {
  return {
    name: 'hero-preload',
    transformIndexHtml() {
      const manifest = JSON.parse(readFileSync(new URL('./src/content/image-manifest.json', import.meta.url)))
      const link = (id, media) => {
        const e = manifest.images[id]
        if (!e) return null
        const fmt = (e.formats ?? ['avif'])[0]
        return {
          tag: 'link',
          attrs: {
            rel: 'preload',
            as: 'image',
            type: `image/${fmt}`,
            imagesrcset: e.widths.map((w) => `/img/${id}-${w}.${fmt}?v=${e.v} ${w}w`).join(', '),
            imagesizes: '100vw',
            media,
            fetchpriority: 'high',
          },
          injectTo: 'head',
        }
      }
      // must match PORTRAIT_MEDIA in src/components/media/Picture.jsx
      return [
        link(`${HERO_IMAGE}-portrait`, '(max-aspect-ratio: 4/5)'),
        link(HERO_IMAGE, '(min-aspect-ratio: 4.01/5)'),
      ].filter(Boolean)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), heroPreload()],
})
