import assert from 'node:assert/strict';
import test from 'node:test';
import {
  addDays,
  gamesOnEasternDate,
  isSettledUtcDate,
  toDateString,
  toEasternDate,
  utcDatesFor,
} from '../src/utils/nbaDates.js';

const game = (id, start) => ({ id, date: { start } });

test('an Eastern date is covered by that UTC day and the next', () => {
  assert.deepEqual(utcDatesFor('2026-10-30'), ['2026-10-30', '2026-10-31']);
  assert.deepEqual(utcDatesFor('2026-12-31'), ['2026-12-31', '2027-01-01']);
  assert.equal(addDays('2028-02-28', 1), '2028-02-29');
});

test('games land on their Eastern tip-off date on both sides of daylight saving time', () => {
  // EDT (UTC-4): 7 PM on Oct 30 is 23:00Z that day, 8 PM is 00:00Z the next day.
  assert.equal(toEasternDate('2026-10-30T23:00:00.000Z'), '2026-10-30');
  assert.equal(toEasternDate('2026-10-31T00:00:00.000Z'), '2026-10-30');
  assert.equal(toEasternDate('2026-10-31T19:00:00.000Z'), '2026-10-31');
  // EST (UTC-5) from Nov 1: 7 PM on Nov 2 is 00:00Z on Nov 3.
  assert.equal(toEasternDate('2026-11-03T00:00:00.000Z'), '2026-11-02');
  assert.equal(toEasternDate('2026-11-03T05:00:00.000Z'), '2026-11-03');
});

test('only games tipping off on the picked Eastern date are kept, in tip-off order', () => {
  // Start times the live site got back when Oct 30, 2026 was picked, plus a 7 PM Oct 30 game
  // that the old "+1 day" request never fetched.
  const games = [
    game('POR@UTA', '2026-10-31T19:00:00.000Z'),
    game('LAL@GSW', '2026-10-31T02:00:00.000Z'),
    game('IND@MIA', '2026-10-31T00:00:00.000Z'),
    game('7pm-oct-30', '2026-10-30T23:00:00.000Z'),
    game('ATL@NOP', '2026-10-31T23:00:00.000Z'),
    game('no-start', undefined),
  ];

  assert.deepEqual(gamesOnEasternDate(games, '2026-10-30').map((g) => g.id), ['7pm-oct-30', 'IND@MIA', 'LAL@GSW']);
  assert.deepEqual(gamesOnEasternDate(games, '2026-10-31').map((g) => g.id), ['POR@UTA', 'ATL@NOP']);
});

test('picker dates are read as local calendar dates', () => {
  assert.equal(toDateString(new Date(2026, 9, 30, 23, 59)), '2026-10-30');
  assert.equal(toDateString(new Date(2026, 0, 5)), '2026-01-05');
});

test('a UTC day is settled once the following UTC day has ended', () => {
  const now = new Date('2026-11-02T12:00:00.000Z');

  assert.equal(isSettledUtcDate('2026-10-31', now), true);
  assert.equal(isSettledUtcDate('2026-11-01', now), false);
  assert.equal(isSettledUtcDate('2026-11-02', now), false);
});
