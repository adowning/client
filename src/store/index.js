import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import Timesheet from './modules/Timesheet'
import Callrecord from './modules/Callrecord'
import Subscriptions from './modules/Subscriptions'
import authentication from './modules/authentication'
import timesheets from './modules/timesheets'
import profiles from './modules/profiles'
import callrecords from './modules/callrecords'
import devices from './modules/devices'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
  },
  getters: {
    isLoading: state => {
      return state.loading
    },
  },
  mutations: {
    saveLoading(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    setLoading(context, payload) {
      context.commit('saveLoading', payload)
    },
    reset(context) {
      context.state = {}
    },
  },
  modules: {
    authentication,
    app,
    timesheets,
    profiles,
    callrecords,
    devices,
    tasks,
    // User,
    // Timesheet,
    // Callrecord,
    // Subscriptions,
  },
  // state: {
  //   loading: false,
  // },
  // actions,
  // mutations,
  // getters,
})
