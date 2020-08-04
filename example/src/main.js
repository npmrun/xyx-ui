import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ABC from '../../lib/library.udm'
import '../../lib/library.css'
console.log(ABC)
Vue.use(ABC);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
