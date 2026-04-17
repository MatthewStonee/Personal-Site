import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const homeView = readFileSync(
  new URL('../src/views/Home.vue', import.meta.url),
  'utf8',
);
const appBar = readFileSync(
  new URL('../src/components/AppBar.vue', import.meta.url),
  'utf8',
);
const appShell = readFileSync(
  new URL('../src/App.vue', import.meta.url),
  'utf8',
);

test('homepage hero keeps GitHub as its only visible action', () => {
  assert.doesNotMatch(homeView, /Download Resume/);
  assert.match(homeView, /View GitHub/);
});

test('homepage hero copy is specific to Matthew and his work', () => {
  assert.match(homeView, /Engineer looking to further my knowledge in everything tech!/);
  assert.match(homeView, /There are some simple web apps on this website that were built while learning different aspects of Vue\.js and web development!/);
});

test('homepage portrait includes descriptive alt text', () => {
  assert.match(homeView, /alt="Portrait of Matthew Stone"/);
});

test('homepage hero accounts for the persistent app bar in its viewport height', () => {
  assert.match(homeView, /calc\(100svh - var\(--app-bar-height\)\)/);
});

test('app bar promotes resume while keeping matthewstone as the home link', () => {
  assert.match(appBar, /nav-resume/);
  assert.match(appBar, /matthewstone/);
  assert.match(appBar, /:to="\{ name: 'home' \}"/);
  assert.doesNotMatch(appBar, /GitHub/);
});

test('app shell declares a dark color scheme for native UI elements', () => {
  assert.match(appShell, /color-scheme:\s*dark/);
});

test('app shell defines the muted blue accent token', () => {
  assert.match(appShell, /--accent-color:\s*#7c8fb8/);
});
