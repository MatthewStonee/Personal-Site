import { computed, reactive } from 'vue'
import vuetify from '../plugins/vuetify'

export const THEME_STORAGE_KEY = 'site-theme'

const validThemes = new Set(['dark', 'light'])
const themeState = reactive({
  name: 'dark',
})

function normalizeTheme(name) {
  return validThemes.has(name) ? name : 'dark'
}

function setStoredTheme(name) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(THEME_STORAGE_KEY, name)
}

function syncDocumentTheme(name) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = name
  document.documentElement.style.colorScheme = name
}

export function setTheme(name) {
  const nextTheme = normalizeTheme(name)

  themeState.name = nextTheme
  vuetify.theme.global.name.value = nextTheme
  syncDocumentTheme(nextTheme)
  setStoredTheme(nextTheme)
}

export function initializeTheme() {
  const storedTheme = typeof window === 'undefined'
    ? 'dark'
    : window.localStorage.getItem(THEME_STORAGE_KEY)

  setTheme(storedTheme || 'dark')
}

export function toggleTheme() {
  setTheme(themeState.name === 'dark' ? 'light' : 'dark')
}

export function useSiteTheme() {
  const themeName = computed(() => themeState.name)
  const isDarkTheme = computed(() => themeState.name === 'dark')
  const themeIcon = computed(() => isDarkTheme.value ? 'mdi-weather-sunny' : 'mdi-weather-night')
  const themeLabel = computed(() => isDarkTheme.value ? 'Switch to light mode' : 'Switch to dark mode')
  const themeActionText = computed(() => isDarkTheme.value ? 'Light mode' : 'Dark mode')

  return {
    themeActionText,
    themeIcon,
    themeLabel,
    themeName,
    toggleTheme,
  }
}
