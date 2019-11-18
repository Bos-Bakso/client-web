import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'


import './assets/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Leaflet
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// vue-toasted
import Toasted from 'vue-toasted';

// popover
import Popover  from 'vue-js-popover'

Vue.use(Popover)


delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})



Vue.use(BootstrapVue)
Vue.use(Toasted)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
