import bus from './bus'
import Vue from 'vue'

let vueplugin = {}

vueplugin.install = function (Vue, options) {
  Vue.prototype.$bus = bus
}

Vue.use(vueplugin)
