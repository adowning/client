import Vue from 'vue'
const Pushy = require('pushy-electron')
import { ipcRenderer } from 'electron'
import App from './App.vue'
import { router } from './router'
import store from './store'
import VueCharts from 'vue-chartjs'
import { Bar, Donut } from 'vue-chartjs'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import Parse from 'parse'
import '@/util/register-service-worker'
import '@/util/handle-network-status'
import ParseApi from '@/api/parseApi'
import './services/notifications'

Pushy.listen()

// Pushy.register({ appId: '5e3f6f1b74ffaa115ddb215b' })
//   .then(function(deviceToken) {
//     // Print device token to console
//     //console.log('Pushy device token: ' + deviceToken)
//     // Listen for push notifications
//     Pushy.setNotificationListener(data => {
//       // Print notification payload data
//       // let myNotification = new Notification('Title', {
//       //   body: data.message,
//       // })
//       //console.log('Received notification: ' + JSON.stringify(data))
//       ipcRenderer.send('notification', data)
//       // myNotification.onclick = () => {
//       //   //console.log('Notification clicked')
//       // }
//       // Display an alert with the "message" payload value
//       // alert('Received notification: ' + data.message)
//     })
//     // Make sure the device is registered
//     if (Pushy.isRegistered()) {
//       // Subscribe the device to a topic
//       Pushy.subscribe('news')
//         .then(() => {
//           // Subscribe successful
//           // alert('Subscribed to topic successfully')
//         })
//         .catch(err => {
//           // Handle errors
//           console.error(err)
//         })
//     }
//   })
//   .catch(function(err) {
//     // Handle registration errors
//     alert('Pushy Error: ' + err.message)
//   })

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
console.log('start')
Vue.config.productionTip = false
Vue.prototype.$updateBus = new Vue()
global.updateBus = Vue.prototype.$updateBus
;(async function() {
  // ipcRenderer.on('set-user', async (event, result) => {
  Parse.initialize(
    process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
    process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
    process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
  )
  Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
  Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL
  Parse.enableLocalDatastore()
  console.log('sending to store')
  var device = await store.dispatch('devices/getCurrentDevice')
  console.log('sending to store', device)

  const parseApi = new ParseApi(store, device)
  global.parseApi = parseApi
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
})()

// })
// var device = await store.dispatch('devices/getCurrentDevice')

// var device = await store.dispatch('devices/getCurrentDevice')
// parseApi.setDevice(device)

// Vue.use(ParseVue, {
//   appId: 'AndrewsApp',
//   store: store,
//   // router: router,
//   key: process.env.VUE_APP_PARSE_MASTERKEY,
//   serverURL: 'http://localhost:1337/parse',
//   liveQueryServerURL: 'ws://localhost:1337/parse',
//   // serverURL: 'http://35.184.15.252:1337/parse',
//   // liveQueryServerURL: 'ws://35.184.15.252:1337/parse',
//   onerror: e =>
//     global.updateBus.$emit('showSnackBar', {
//       show: true,
//       color: 'error',
//       icon: 'mdi-debug',
//       text: `${e}`,
//       code: e.code,
//     }),
// })
