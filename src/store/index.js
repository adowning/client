import Vue from 'vue'
import Vuex from 'vuex'
// import User from './modules/User'
import Timesheet from './modules/Timesheet'
import Callrecord from './modules/Callrecord'
import Subscriptions from './modules/Subscriptions'
import authentication from './modules/authentication'
import timesheets from './modules/timesheets'
import profiles from './modules/profiles'
import callrecords from './modules/callrecords'

import app from './modules/app'

Vue.use(Vuex)

// const mutations = {
//   SAVE_LOADING: (state, loading) => {
//     state.loading = loading
//     // Vue.set(state.loading, loading) /* false means user not found */
//   },
// }
// const getters = {
//   loading(state, getters) {
//     return state.loading
//   },
// }
// const actions = {
//   SET_LOADING: ({ commit, state }, { loading }) => {
//     // return state.users[id]
//     //   ? Promise.resolve(state.users[id])
//     //   : fetchUser(id).then(user => commit('SET_USER', { id, user }))
//     return commit('SAVE_LOADING', { loading })
//   },
// }

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
