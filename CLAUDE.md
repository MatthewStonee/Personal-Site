# Personal Site — CLAUDE.md

## Project Overview
Matthew Stone's personal website — a Vue.js 2 SPA hosted on Firebase. Showcases projects/tools including a fitness calculator, weather app, NBA scores, todo list, and calculator.

Live site: https://www.matthewstone.co

## Tech Stack
- **Vue 2.6** with Vue Router 3 (history mode, lazy-loaded routes)
- **Vuetify 2.6** — primary UI framework (Material Design, dark theme)
- **Firebase 9.9** — Firestore (user CRUD) + Hosting
- **Axios** — HTTP client (available globally as `this.$http`)
- **Moment.js** — date utils (available globally as `this.moment`)
- **SASS** — CSS preprocessor
- **Vue CLI 5** / Webpack — build tooling

## Project Structure
```
src/
  views/          # Page-level routed components
  components/     # Reusable components (AppBar, CalcComponent, etc.)
  router/         # Vue Router config (index.js)
  plugins/        # Vuetify setup (vuetify.js)
  fb.js           # Firebase init + Firestore CRUD helpers
  main.js         # App entry point
public/
  index.html
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
npm install --legacy-peer-deps   # Install dependencies (--legacy-peer-deps required due to peer dep conflicts)
npm run serve                    # Dev server (localhost:8080, or 8081 if 8080 is in use)
npm run build                    # Production build → dist/
npm run lint                     # ESLint
npm run deploy                   # Build + firebase deploy
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

## Deployment
- **CI/CD:** GitHub Actions auto-deploys to Firebase Hosting on every push to `master`
- **Manual:** `npm run deploy` (requires `firebase login`)
- **Docker:** `docker build -t personal-site . && docker run -p 8080:8080 personal-site`
- GitHub Actions uses `--legacy-peer-deps` in the workflow files
- All `VUE_APP_*` environment variables must be added as **GitHub Actions secrets** (Settings → Secrets and variables → Actions) for the live site to function — they are injected into the build via `firebase-hosting-merge.yml`

## Conventions
- Views go in `src/views/`, reusable components in `src/components/`
- Vuetify components preferred for UI; Bootstrap classes exist in older components
- Scoped CSS (`<style scoped>`) in all components
- Static images imported via `require('../images/...')`
- NBA team logos at `src/assets/Teams/{code}.png`
- No Vuex — local component state or Firebase for persistence
- External links use `href` + `target="_blank"` on Vuetify components (not `window.open`)

## NBA (`NBA.vue`) Notes
- API stores games in UTC; NBA games played in ET evening become the next day in UTC. Date sent to API is always +1 day from the selected date to compensate.
- Score row uses CSS grid with `60px 1fr 1fr 20px 1fr 1fr 60px` columns — logo columns must match `max-width` on `v-img` (currently 60px)
- Date picker uses `onDateSelected` method to reliably close menu and fetch games

> To-Do / Future Improvements have been moved to Notion: https://www.notion.so/33def31f8222815594fac792c259d669

