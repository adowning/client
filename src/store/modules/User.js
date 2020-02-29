import Parse from 'parse'
import uuid from 'uuid'
// import db from '../database'
// const users = db.get('users')

const mutations = {
  SET_CURRENT_USER: (state, { user }) => {
    //console.log(user)
    state.currentUser = { ...state.currentUser, user }
  },
  SET_CURRENT_CREDS: (state, { credentials }) => {
    state.credentials = credentials
  },
  REMOVE_CURRENT_USER: state => {
    state.currentUser = null
  },
  ADD_USER({ users }, user) {
    users.push(user)
  },
  REMOVE_USER({ users }, id) {
    const i = users.findIndex(u => u.id === id)
    if (i === -1) return
    users.splice(i, 1)
  },
  END_UPDATING(state) {
    state.index = -1
  },
  START_UPDATING(state, id) {
    const i = state.users.findIndex(u => u.id === id)
    if (i !== -1) state.index = i
  },
  SET_USERS(state, users) {
    users.forEach(u => {
      const i = state.users.findIndex(us => us.id === u.id)
      if (i === -1) state.users.push(u)
    })
  },
}
const getters = {
  currentUser(state, getters) {
    return state.currentUser
  },
  currentUserCreds(state, getters) {
    return state.credentials
  },
  isUpdating: ({ index }) => index !== -1,
  userToUpdate: ({ index, users }) => users[index] || undefined,
}

const actions = {
  LOGIN: async (context, { name, password }) => {
    //console.log(name, password)
    try {
      let creds
      if (!name || !password) {
        creds = context.dispatch()
      }
      await Parse.User.logOut()
      await Parse.User.logIn(name, password)
      var user = parseApi.currentUser()
      var currentCredentials = { username: name, password: password }
      // context.dispatch('SET_LOADING', false)
      context.commit('SET_CURRENT_USER', user)
      context.commit('SET_CURRENT_CREDS', currentCredentials)
      return context.dispatch('setSubscriptions', false)
    } catch (e) {
      console.error(e)
      context.dispatch('SET_LOADING', false)
      global.updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'fa-exclamation',
        text: e,
        errorCode: e.code,
      })
      return context.commit('REMOVE_CURRENT_USER')
    }
  },
  LOGOUT: async context => {
    try {
      await Parse.User.logOut()
      context.dispatch('SET_LOADING', false)
      context.commit('SET_CURRENT_CREDS', null)
      return context.commit('REMOVE_CURRENT_USER')
    } catch (e) {
      context.dispatch('SET_LOADING', false)
      return context.commit('REMOVE_CURRENT_USER')
    }
  },
  fetchDB({ commit }) {
    commit('SET_USERS', users.value())
  },
  addUser({ commit, state }, user) {
    const newUser = { ...user, id: uuid() }
    users.push(newUser).write()
    commit('ADD_USER', newUser)
  },
  removeUser({ commit, state }, id) {
    const i = users.findIndex(u => u.id === id)
    if (i === -1) return
    users.splice(i, 1).write()
    commit('REMOVE_USER', id)
  },
  updateUser({ commit, state }) {
    const user = state.users[state.index]
    users
      .map(u => {
        if (u.id === user.id) return user
      })
      .write()
    commit('END_UPDATING')
  },
}

export default {
  namespaced: false,
  state: {
    currentUser: null,
    credentials: {},
    index: -1,
    users: [],
  },
  actions,
  getters,
  mutations,
}
