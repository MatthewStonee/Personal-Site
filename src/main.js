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

app.use(router)
app.use(vuetify)
app.mount('#app')

registerSW({
  immediate: true,
})
