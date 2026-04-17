# Personal Site — AGENTS.md

## Project Overview
Matthew Stone's personal website — a Vue.js 3 SPA hosted on Firebase. Showcases projects/tools including a fitness calculator, weather app, NBA scores, todo list, and calculator.

Live site: https://www.matthewstone.co

## Tech Stack
- **Vue 3.5** with Vue Router 4 (history mode, lazy-loaded routes)
- **Vuetify 3** — primary UI framework (Material Design, dark theme)
- **Firebase 9** — Firestore (user CRUD) + Hosting
- **Axios** — HTTP client (imported directly in components that need it)
- **Moment.js** — date utils (imported directly in components that need it)
- **SASS** — CSS preprocessor
- **Vite 5** — build tooling (replaces Vue CLI 5 / Webpack as of the Vue 3 migration)

## Project Structure
```
index.html        # Vite entry point (at repo root, not in public/)
vite.config.js    # Vite config — plugins, alias, envPrefix
src/
  views/          # Page-level routed components
  components/     # Reusable components (AppBar, CalcComponent, etc.)
  router/         # Vue Router config (index.js)
  plugins/        # Vuetify setup (vuetify.js)
  fb.js           # Firebase init + Firestore CRUD helpers (v9 modular SDK)
  main.js         # App entry point (createApp)
public/
  _redirects
  favicon.ico
  Matthew Stone Resume.pdf
.github/workflows/
  firebase-hosting-merge.yml       # Auto-deploys to live site on push to master
  firebase-hosting-pull-request.yml # Deploys preview on PRs
  main.yml                          # Firebase functions deployment
```

## Routes
| Path | View | Description |
|------|------|-------------|
| `/` | Home.vue | Landing / bio |
| `/about` | About.vue | About page |
| `/onerm` | OneRM.vue | 1RM calculator + kilo/lbs converter |
| `/calculator` | Calculator.vue | Simple calculator |
| `/todo` | Todo.vue | Todo list (localStorage) |
| `/weather` | Weather.vue | Weather via OpenWeather API + geolocation |
| `/NBA` | NBA.vue | NBA scores via RapidAPI |
| `/user` | UserCreate.vue | Firebase user creation |
| `/edit/:id` | Edit.vue | Firebase user editing |

## Dev Commands
```bash
npm install        # Install dependencies (no flags required)
npm run serve      # Vite dev server on localhost:8080
npm run build      # Production build → dist/
npm run preview    # Serve the production build locally
npm run lint       # ESLint
npm run deploy     # Build + firebase deploy
```

## Environment Variables
All secrets live in `.env` (gitignored — never commit this file). Required keys:
```
VUE_APP_OPENWEATHER_KEY=
VUE_APP_OPENAI_KEY=
VUE_APP_RAPIDAPI_KEY=
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_AUTH_DOMAIN=
VUE_APP_FIREBASE_PROJECT_ID=
VUE_APP_FIREBASE_STORAGE_BUCKET=
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=
VUE_APP_FIREBASE_APP_ID=
VUE_APP_FIREBASE_MEASUREMENT_ID=
```

`vite.config.js` sets `envPrefix: ['VITE_', 'VUE_APP_']`, so existing `VUE_APP_*` keys continue to work without renaming GitHub Actions secrets. New variables should prefer the `VITE_` prefix. Access env vars via `import.meta.env.VUE_APP_FOO` — `process.env` is not defined in the browser.

## Deployment
- **CI/CD:** GitHub Actions auto-deploys to Firebase Hosting on every push to `master`
- **Manual:** `npm run deploy` (requires `firebase login`)
- **Docker:** `docker build -t personal-site . && docker run -p 8080:8080 personal-site`
- All `VUE_APP_*` environment variables must be added as **GitHub Actions secrets** (Settings → Secrets and variables → Actions) for the live site to function — they are injected into the build via `firebase-hosting-merge.yml`

## Conventions
- Views go in `src/views/`, reusable components in `src/components/`
- Vuetify 3 components handle all UI (no Bootstrap)
- Scoped CSS (`<style scoped>`) in all components
- Static images imported at the top of the `<script>` block (`import foo from '../images/foo.jpg'`) — dynamic `require()` does not work in Vite
- NBA team logos at `src/assets/Teams/{code}.png`, loaded via `import.meta.glob`
- No Vuex / Pinia — local component state or Firebase for persistence
- External links use `href` + `target="_blank"` on Vuetify components (not `window.open`)
- Options API is the default; `<script setup>` is acceptable when it makes composables (e.g. `useDisplay()`) meaningfully cleaner
- Relative `.vue` imports must include the `.vue` extension (Vite does not auto-resolve it)

## NBA (`NBA.vue`) Notes
- API stores games in UTC; NBA games played in ET evening become the next day in UTC. Date sent to API is always +1 day from the selected date to compensate.
- Score row uses CSS grid with `60px 1fr 1fr 20px 1fr 1fr 60px` columns — logo columns must match `max-width` on `v-img` (currently 60px)
- `v-date-picker` v-models a JS `Date` object (not a string). A computed derives the `YYYY-MM-DD` display string via moment. `onDateSelected` closes the menu and refetches games.

> To-Do / Future Improvements have been moved to Notion: https://www.notion.so/33def31f8222815594fac792c259d669
