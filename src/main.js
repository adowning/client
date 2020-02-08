import Vue from 'vue'

import App from './App.vue'
import { router } from './router'
import store from './store'
import VueCharts from 'vue-chartjs'
import { Bar, Donut } from 'vue-chartjs'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import ParseVue from './plugins/parse'
import '@/util/register-service-worker'
import '@/util/handle-network-status'

import VueMoment from 'vue-moment'
Vue.use(VueMoment)

import VueElectron from 'vue-electron'
Vue.use(VueElectron)

import ReactiveSearch from '@appbaseio/reactivesearch-vue'
Vue.use(ReactiveSearch)

import InstantSearch from 'vue-instantsearch'
Vue.use(InstantSearch)

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.config.productionTip = false

Vue.prototype.$updateBus = new Vue()
global.updateBus = Vue.prototype.$updateBus

Vue.use(ParseVue, {
  appId: 'AndrewsApp',
  store: store,
  // router: router,
  key: process.env.VUE_APP_PARSE_MASTERKEY,
  serverURL: 'http://localhost:1337/parse',
  liveQueryServerURL: 'ws://localhost:1337/parse',
  // serverURL: 'http://35.184.15.252:1337/parse',
  // liveQueryServerURL: 'ws://35.184.15.252:1337/parse',
  onerror: e =>
    global.updateBus.$emit('showSnackBar', {
      show: true,
      color: 'error',
      icon: 'mdi-debug',
      text: `${e}`,
      code: e.code,
    }),
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
