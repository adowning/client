// import '@babel/polyfill'
import Vue from 'vue'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './utils/vueplugin'
import InputWithButton from './components/vuetifyExtend/InputWithButton.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.component('InputWithButton', InputWithButton)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
