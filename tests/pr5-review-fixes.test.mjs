import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('theme storage access degrades gracefully when localStorage is unavailable', () => {
  const themeModule = read('src/composables/useSiteTheme.js');

  assert.match(themeModule, /try\s*\{[\s\S]*localStorage\.getItem/);
  assert.match(themeModule, /catch\s*\(/);
  assert.match(themeModule, /try\s*\{[\s\S]*localStorage\.setItem/);
});

test('mobile drawer project icons do not hardcode white in the light theme drawer', () => {
  const appBar = read('src/components/AppBar.vue');

  assert.doesNotMatch(appBar, /<v-icon color="white">\{\{ item\.icon \}\}<\/v-icon>/);
});

test('weather view relies on router meta for document titles', () => {
  const weather = read('src/views/Weather.vue');

  assert.doesNotMatch(weather, /document\.title/);
});
