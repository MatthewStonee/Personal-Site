// The NBA schedules games by US Eastern calendar day, but the API filters games by UTC day.
// An Eastern day spans two UTC days, so the NBA view fetches both and keeps the games that
// tip off on the Eastern date that was picked.

const NBA_TIME_ZONE = 'America/New_York'

// en-CA formats dates as YYYY-MM-DD.
const easternDateFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: NBA_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function toEasternDate(isoTimestamp) {
  return easternDateFormat.format(new Date(isoTimestamp))
}

// Calendar date of a local Date (what the date picker returns) as YYYY-MM-DD.
export function toDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addDays(dateString, days) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10)
}

export function utcDatesFor(easternDate) {
  return [easternDate, addDays(easternDate, 1)]
}

export function gamesOnEasternDate(games, easternDate) {
  return games
    .filter((game) => game.date?.start && toEasternDate(game.date.start) === easternDate)
    .sort((a, b) => Date.parse(a.date.start) - Date.parse(b.date.start))
}

// Every game on a UTC day is final once the following UTC day has ended too,
// so those results can be reused for the rest of the session.
export function isSettledUtcDate(utcDate, now = new Date()) {
  return addDays(utcDate, 2) <= now.toISOString().slice(0, 10)
}
