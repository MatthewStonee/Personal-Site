import { computed, reactive } from 'vue'

const defaultChrome = {
  appBarBackground: null,
  appBarBorderColor: null,
  appBarForeground: null,
  appBarMuted: null,
}

const pageChromeState = reactive({ ...defaultChrome })

export function setPageChrome(chrome = {}) {
  Object.assign(pageChromeState, defaultChrome, chrome)
}

export function resetPageChrome() {
  Object.assign(pageChromeState, defaultChrome)
}

export function usePageChrome() {
  const appBarBackground = computed(() => pageChromeState.appBarBackground)
  const appBarBorderColor = computed(() => pageChromeState.appBarBorderColor)
  const appBarForeground = computed(() => pageChromeState.appBarForeground)
  const appBarMuted = computed(() => pageChromeState.appBarMuted)

  return {
    appBarBackground,
    appBarBorderColor,
    appBarForeground,
    appBarMuted,
    resetPageChrome,
    setPageChrome,
  }
}
