# Personal Site — AGENTS.md

## Project Overview
Matthew Stone's personal website — a Vue.js 3 SPA hosted on Firebase. Showcases projects/tools including a fitness calculator, weather app, NBA scores, todo list, calculator, and a 3D apartment walkthrough.

Live site: https://matthewstone.co (`www.matthewstone.co` redirects here, so canonical/sitemap URLs use the apex host)

## Tech Stack
- **Vue 3.5** with Vue Router 4 (history mode, lazy-loaded routes)
- **Vuetify 3** — primary UI framework (Material Design, dark theme)
- **Firebase Hosting** — static hosting; Firestore rules deny all client access (the site stores no data)
- **vite-plugin-pwa** — Workbox service worker that precaches the app shell
- **SASS** — CSS preprocessor
- **Vite 5** — build tooling (replaces Vue CLI 5 / Webpack as of the Vue 3 migration)

## Project Structure
```
index.html        # Vite entry point (at repo root, not in public/); holds the SPA's CSP meta tag
vite.config.js    # Vite config — plugins, alias, envPrefix, service worker
firebase.json     # Hosting headers/caching/rewrites + Firestore rules wiring
firestore.rules   # Deny-all Firestore rules
src/
  views/          # Page-level routed components
  components/     # Reusable components (AppBar, CalcComponent, etc.)
  composables/    # Shared reactive state (theme, app bar chrome)
  stores/         # Tiny reactive stores (global error toast)
  utils/          # Pure, unit-tested logic (nbaDates.js, calculator.js)
  router/         # Vue Router config (index.js) — titles, canonical URLs
  plugins/        # Vuetify setup (vuetify.js)
  main.js         # App entry point (createApp)
public/
  apartment-walkthrough.html  # Standalone Three.js walkthrough, iframed by /walkthrough
  favicon.ico, icon-192.png, favicon.png (512), apple-touch-icon.png
  Matthew Stone Resume.pdf
  robots.txt, sitemap.xml
tests/            # node:test suites (npm test)
.github/workflows/
  firebase-hosting-merge.yml       # Lint + test + build, deploys the live site on push to master
  firebase-hosting-pull-request.yml # Same checks, deploys a preview channel for same-repo PRs
```

## Routes
| Path | View | Description |
|------|------|-------------|
| `/` | Home.vue | Landing / bio |
| `/about` | About.vue | About page |
| `/onerm` | OneRM.vue | 1RM calculator + kilo plate visualizer |
| `/calculator` | components/CalcComponent.vue | Simple calculator |
| `/todo` | Todo.vue | Todo list (localStorage) |
| `/weather` | Weather.vue | Weather via OpenWeather API + geolocation |
| `/NBA` | NBA.vue | NBA scores via RapidAPI |
| `/walkthrough` | Walkthrough.vue | First-person 3D apartment walkthrough (iframe) |
| `/:pathMatch(.*)*` | NotFound.vue | 404 page (marked `noindex`; Hosting still returns 200) |

## Dev Commands
```bash
npm install        # Install dependencies (no flags required)
npm run serve      # Vite dev server on localhost:8080
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally (service worker + CSP active)
npm run lint       # ESLint
npm test           # node:test suites in tests/
npm run deploy     # Build + firebase deploy (hosting and Firestore rules)
```

## Environment Variables
Keys live in `.env` (gitignored — never commit this file). Required keys:
```
VUE_APP_OPENWEATHER_KEY=
VUE_APP_RAPIDAPI_KEY=
```

Vite inlines every `import.meta.env.VUE_APP_*` / `VITE_*` value into the client bundle, so these keys are public by nature. Use free-tier keys (a dedicated RapidAPI app for this site), rotate them if they're abused, and never put a key that can incur charges in a `VUE_APP_`/`VITE_` variable — that needs a server-side proxy.

`vite.config.js` sets `envPrefix: ['VITE_', 'VUE_APP_']`, so existing `VUE_APP_*` keys continue to work without renaming GitHub Actions secrets. New variables should prefer the `VITE_` prefix. Access env vars via `import.meta.env.VUE_APP_FOO` — `process.env` is not defined in the browser.

## Deployment
- **CI/CD:** GitHub Actions runs lint and tests, then auto-deploys to Firebase Hosting on every push to `master`; same-repo PRs get a preview channel
- **Manual:** `npm run deploy` (requires `firebase login`)
- **Firestore rules only:** `firebase deploy --only firestore:rules`
- **Docker:** `docker build --build-arg VUE_APP_OPENWEATHER_KEY=... --build-arg VUE_APP_RAPIDAPI_KEY=... -t personal-site . && docker run -p 8080:8080 personal-site` (`.dockerignore` keeps `.env` out of the image)
- GitHub Actions secrets: `VUE_APP_OPENWEATHER_KEY`, `VUE_APP_RAPIDAPI_KEY`, `FIREBASE_SERVICE_ACCOUNT_PERSONAL_SITE_5BCA5`
- The deploy action is pinned to a commit SHA (it receives the deploy credentials); bump the SHA deliberately

## Security headers, CSP and caching
- `firebase.json` sets `nosniff`, `X-Frame-Options: SAMEORIGIN`, referrer and permissions policies, immutable caching for hashed `/assets/**`, and `no-cache` for HTML, SPA routes and `sw.js`.
- The Content-Security-Policy is a `<meta>` tag in `index.html` and another in `apartment-walkthrough.html` (so each page has exactly one policy and `npm run preview` enforces it). Calling a new third-party API means adding its origin to `connect-src` in `index.html`, or the browser blocks the request.

## Service worker
- Precaches only the app shell (`js/css/html/woff2`); images and fonts are cached at runtime on first use.
- `navigateFallbackDenylist` keeps navigations to real files (anything whose URL ends in a file extension, like the resume PDF) out of the SPA fallback. Without it the service worker answers them with `index.html`.

## Conventions
- Views go in `src/views/`, reusable components in `src/components/`
- Vuetify 3 components handle all UI (no Bootstrap)
- Scoped CSS (`<style scoped>`) in all components
- Static images imported at the top of the `<script>` block (`import foo from '../images/foo.jpg'`) — dynamic `require()` does not work in Vite
- Photos: strip metadata (EXIF/GPS) and size them to about 2× their display size before committing
- NBA team logos at `src/assets/Teams/{code}.png` (120px PNGs), loaded via an eager `import.meta.glob` with `?url`
- No Vuex / Pinia — local component state, or a small reactive module in `src/composables/` / `src/stores/` when state is shared
- Logic worth testing goes in `src/utils/` as plain functions so `node --test` can import it without Vite
- External links use `href` + `target="_blank"` on Vuetify components (not `window.open`)
- Options API is the default; `<script setup>` is acceptable when it makes composables (e.g. `useDisplay()`) meaningfully cleaner
- Relative `.vue` imports must include the `.vue` extension (Vite does not auto-resolve it)

## NBA (`NBA.vue`) Notes
- The API filters games by UTC day, but the NBA schedules by US Eastern day, and one Eastern day spans two UTC days. `NBA.vue` fetches both (`utcDatesFor`) and keeps the games whose `date.start` falls on the picked date in `America/New_York` (`gamesOnEasternDate`); see `src/utils/nbaDates.js`. Finished days are cached for the session to save API quota.
- Score row uses CSS grid with `60px 1fr 1fr 20px 1fr 1fr 60px` columns — logo columns must match `max-width` on `v-img` (currently 60px)
- `v-date-picker` v-models a JS `Date` object (not a string). A computed derives the `YYYY-MM-DD` string with `toDateString`. `onDateSelected` closes the menu and refetches games.

## Walkthrough (`Walkthrough.vue`) Notes
- The walkthrough is a self-contained static page, `public/apartment-walkthrough.html`: Three.js 0.160.0 from jsDelivr via an importmap, textures generated in code, no assets. Vite copies it to `dist/` untouched — edit it directly.
- Its CSP `<meta>` allows inline scripts, jsDelivr and Google Fonts; update it if the page loads anything from another origin.
- Floor plans are JSON in its `<script type="application/json" id="plan-data">` block (feet; origin at the NW corner, +x east, +z south). In its console, `__wt.selfTest()` reports areas and any rooms unreachable from the front door.
- `Walkthrough.vue` only iframes it, passing the site theme as `#theme=dark|light`. A hash change restyles the HUD without reloading the 3D scene.
- Don't name the static file after the route: Firebase serves static files before the SPA rewrite, and the Workbox precache resolves `/walkthrough` to `walkthrough.html`, so the Vue view would be bypassed.

> To-Do / Future Improvements have been moved to Notion: https://www.notion.so/33def31f8222815594fac792c259d669
