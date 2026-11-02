import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeTheme } from './composables/useSiteTheme'
import { showGlobalError } from './stores/errorToast'

const app = createApp(App)

initializeTheme()

app.config.errorHandler = (error, instance, info) => {
  console.error('Unhandled Vue error', error, info, instance)
  showGlobalError('Something went wrong in the app. Please refresh and try again.')
}

// After a deploy, a tab still running the previous build can request lazy chunks that no longer
// exist. Reload to pick up the new build, at most once per 10 seconds so a real failure can't loop.
const CHUNK_RELOAD_KEY = 'chunk-reload-at'
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (Date.now() - Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0) < 10000) return
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()))
  } catch (_error) {
    return
  }
  event.preventDefault()
  window.location.reload()
})

app.use(router)
app.use(vuetify)
app.mount('#app')

registerSW({
  immediate: true,
})
