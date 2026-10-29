import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('walkthrough route is lazy-loaded with a title and listed in the projects menu', () => {
  const router = read('src/router/index.js');
  const appBar = read('src/components/AppBar.vue');

  assert.match(router, /path:\s*'\/walkthrough'[\s\S]*?import\('\.\.\/views\/Walkthrough\.vue'\)[\s\S]*?title:\s*'3D Apartment Walkthrough'/);
  assert.match(appBar, /route:\s*"\/walkthrough"/);
});

test('walkthrough view iframes the static page and passes the site theme in the hash', () => {
  const view = read('src/views/Walkthrough.vue');

  assert.match(view, /<iframe/);
  assert.match(view, /title="3D apartment walkthrough"/);
  assert.match(view, /allow="fullscreen"/);
  assert.match(view, /\/apartment-walkthrough\.html#theme=\$\{themeName\.value\}/);
});

test('static walkthrough page is a full document that reads its theme from the hash', () => {
  const page = read('public/apartment-walkthrough.html');

  assert.match(page, /^<!doctype html>/i);
  assert.match(page, /location\.hash/);
  assert.match(page, /hashchange/);
  assert.match(page, /three@0\.160\.0/);
});

test('no static file shadows the /walkthrough route', () => {
  // Static files win over the SPA rewrite on Firebase, and Workbox's precache resolves
  // clean URLs (/walkthrough -> /walkthrough.html), so either name would hide the Vue view.
  assert.equal(existsSync(new URL('../public/walkthrough.html', import.meta.url)), false);
  assert.equal(existsSync(new URL('../public/walkthrough/index.html', import.meta.url)), false);
});

test('sitemap lists the walkthrough page', () => {
  assert.match(read('public/sitemap.xml'), /https:\/\/www\.matthewstone\.co\/walkthrough</);
});
