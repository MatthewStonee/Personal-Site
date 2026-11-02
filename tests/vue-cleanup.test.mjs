import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('about page contains professional bio content instead of placeholder copy', () => {
  const about = read('src/views/About.vue');

  assert.doesNotMatch(about, /This is an about page/);
  assert.match(about, /Senior Systems Engineer at CPE ST3/);
  assert.match(about, /B\.S\. Computer Science, UCF/);
  assert.match(about, /side projects/i);
});

test('one rep max view names the Brzycki formula constants', () => {
  const oneRm = read('src/views/OneRM.vue');

  assert.match(oneRm, /Brzycki formula/);
  assert.match(oneRm, /const BRZYCKI_BASE_COEFFICIENT = 1\.0278/);
  assert.match(oneRm, /const BRZYCKI_REPS_COEFFICIENT = 0\.0278/);
});

test('placeholder pages are gone and views ship no empty style blocks', () => {
  const router = read('src/router/index.js');

  assert.doesNotMatch(router, /Stocks\.vue|'\/stocks'/);
  assert.equal(existsSync(new URL('../src/views/Stocks.vue', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/views/Table.vue', import.meta.url)), false);
  assert.doesNotMatch(read('src/views/Todo.vue'), /<style[^>]*>\s*<\/style>/);
});
