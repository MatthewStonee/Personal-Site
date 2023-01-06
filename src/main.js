import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import moment from 'moment'
import axios from 'axios'

Vue.prototype.moment = moment
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
