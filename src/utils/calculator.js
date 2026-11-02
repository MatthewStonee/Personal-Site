// Calculator logic as pure state transitions, so the component only wires buttons to them.
// State: `current` is the displayed entry, `previous` and `operator` hold a pending operation,
// and `startNew` means the next digit starts a fresh entry instead of appending.

export const ERROR = 'Error'

const MAX_LENGTH = 16

const OPERATIONS = {
  '+': (a, b) => a + b,
  '−': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
}

export function initialState() {
  return { current: '', previous: null, operator: null, startNew: false }
}

// Rounds away floating-point noise (0.1 + 0.2) and keeps long results inside the display.
export function formatResult(value) {
  if (!Number.isFinite(value)) return ERROR
  const rounded = Number(value.toPrecision(12))
  const text = String(rounded)
  return text.length > MAX_LENGTH ? rounded.toExponential(6) : text
}

function calculate(previous, current, operator) {
  return formatResult(OPERATIONS[operator](parseFloat(previous), parseFloat(current)))
}

// The entry that typing continues from: empty after an operator, `=`, or an error.
function entryOf(state) {
  return state.startNew || state.current === ERROR ? '' : state.current
}

export function inputDigit(state, digit) {
  const entry = entryOf(state)
  if (entry.length >= MAX_LENGTH) return state
  return { ...state, current: entry === '0' ? digit : entry + digit, startNew: false }
}

export function inputDot(state) {
  const entry = entryOf(state)
  if (entry.includes('.')) return state
  return { ...state, current: entry === '' ? '0.' : `${entry}.`, startNew: false }
}

export function chooseOperator(state, operator) {
  if (state.current === ERROR) return state

  // "2 + 3 +" finishes the pending "2 + 3" before starting the next operation.
  if (state.operator && state.previous !== null && !state.startNew) {
    const result = calculate(state.previous, state.current, state.operator)
    if (result === ERROR) return { ...initialState(), current: ERROR, startNew: true }
    return { current: result, previous: result, operator, startNew: true }
  }

  // Pressing another operator before the next number just swaps the operator.
  return { ...state, previous: state.current || '0', operator, startNew: true }
}

export function equals(state) {
  if (!state.operator || state.previous === null || state.current === ERROR) {
    return { ...state, startNew: true }
  }
  const current = calculate(state.previous, state.current || state.previous, state.operator)
  return { current, previous: null, operator: null, startNew: true }
}

export function toggleSign(state) {
  const { current } = state
  if (current === '' || current === ERROR || Number(current) === 0) return state
  return { ...state, current: current.startsWith('-') ? current.slice(1) : `-${current}` }
}

export function percent(state) {
  if (state.current === '' || state.current === ERROR) return state
  return { ...state, current: formatResult(parseFloat(state.current) / 100) }
}
