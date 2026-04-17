import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('router defines global titles and a catch-all 404 route', () => {
  const router = read('src/router/index.js');

  assert.match(router, /path:\s*'\/:pathMatch\(\.\*\)\*'/);
  assert.match(router, /meta:\s*\{\s*title:\s*'Not Found'/);
  assert.match(router, /path:\s*'\/user'[\s\S]*meta:\s*\{\s*title:\s*'Create User'/);
  assert.match(router, /path:\s*'\/edit\/:id'[\s\S]*meta:\s*\{\s*title:\s*'Edit User'/);
  assert.match(router, /router\.afterEach\(\(to\)\s*=>/);
  assert.match(router, /document\.title\s*=\s*title\s*\?\s*`\$\{title\} \| Matthew Stone`\s*:\s*'Matthew Stone'/);
});

test('routed views rely on the global title hook instead of local document.title writes', () => {
  const home = read('src/views/Home.vue');
  const weather = read('src/views/Weather.vue');
  const nba = read('src/views/NBA.vue');
  const onerm = read('src/views/OneRM.vue');
  const calculator = read('src/components/CalcComponent.vue');

  assert.doesNotMatch(home, /document\.title/);
  assert.doesNotMatch(weather, /document\.title/);
  assert.doesNotMatch(nba, /document\.title/);
  assert.doesNotMatch(onerm, /document\.title/);
  assert.doesNotMatch(calculator, /document\.title/);
});

test('seo assets advertise the site and public routes', () => {
  const html = read('index.html');
  const robots = read('public/robots.txt');
  const sitemap = read('public/sitemap.xml');

  assert.match(html, /meta name="description"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /property="og:description"/);
  assert.match(html, /property="og:url"/);
  assert.match(html, /name="twitter:card"/);
  assert.match(html, /rel="canonical"/);

  assert.match(robots, /Sitemap:\s*https:\/\/www\.matthewstone\.co\/sitemap\.xml/);

  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/about/);
  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/onerm/);
  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/calculator/);
  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/todo/);
  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/weather/);
  assert.match(sitemap, /https:\/\/www\.matthewstone\.co\/NBA/);
});

test('theme state is centralized and exposed through the app bar', () => {
  const themeModule = read('src/composables/useSiteTheme.js');
  const appBar = read('src/components/AppBar.vue');
  const appShell = read('src/App.vue');

  assert.match(themeModule, /site-theme/);
  assert.match(themeModule, /toggleTheme/);
  assert.match(themeModule, /document\.documentElement\.dataset\.theme/);
  assert.match(appBar, /toggleTheme/);
  assert.match(appBar, /themeLabel/);
  assert.match(appShell, /GlobalErrorToast/);
  assert.match(appShell, /data-theme/);
});

test('main bootstrap wires global errors and pwa registration', () => {
  const main = read('src/main.js');
  const viteConfig = read('vite.config.js');

  assert.match(main, /app\.config\.errorHandler/);
  assert.match(main, /registerSW/);
  assert.match(viteConfig, /VitePWA/);
  assert.match(viteConfig, /navigateFallback:\s*'index\.html'/);
  assert.match(viteConfig, /globPatterns/);
});

test('loading states use skeletons and not-found view exists', () => {
  const weather = read('src/views/Weather.vue');
  const nba = read('src/views/NBA.vue');
  const notFound = read('src/views/NotFound.vue');
  const errorToast = read('src/components/GlobalErrorToast.vue');

  assert.match(weather, /v-skeleton-loader/);
  assert.match(nba, /v-skeleton-loader/);
  assert.match(notFound, /Page not found/);
  assert.match(errorToast, /v-snackbar/);
});
