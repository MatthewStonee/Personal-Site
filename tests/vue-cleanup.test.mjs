import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

function read(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('user management components use the repo default Options API style', () => {
  const userCreate = read('src/components/UserCreate.vue');
  const userList = read('src/components/UserList.vue');
  const firebaseModule = read('src/fb.js');

  assert.doesNotMatch(userCreate, /setup\s*\(/);
  assert.doesNotMatch(userCreate, /reactive\s*\(/);
  assert.match(userCreate, /data\s*\(\)\s*\{/);
  assert.match(userCreate, /methods:\s*\{/);
  assert.match(userCreate, /async onSubmit\s*\(/);

  assert.doesNotMatch(userList, /setup\s*\(/);
  assert.match(userList, /data\s*\(\)\s*\{/);
  assert.match(userList, /created\s*\(\)\s*\{/);
  assert.match(userList, /beforeUnmount\s*\(\)\s*\{/);
  assert.match(firebaseModule, /export const subscribeToUsers =/);
});

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

test('cleanup views no longer ship empty style blocks', () => {
  const stocks = read('src/views/Stocks.vue');
  const table = read('src/views/Table.vue');
  const todo = read('src/views/Todo.vue');

  assert.doesNotMatch(stocks, /<style[\s\S]*<\/style>/);
  assert.doesNotMatch(table, /<style[\s\S]*<\/style>/);
  assert.doesNotMatch(todo, /<style[\s\S]*<\/style>/);
});
