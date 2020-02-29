import { router } from '@/router'
import { isNil } from 'lodash'
import { ipcRenderer } from 'electron'
// import { logout } from '@/api/parseApi'
// import { createNewUserFromFirebaseAuthUser } from '@/util/helpers'
// import UsersDB from '@/firebase/users-db'
import axios from 'axios'
import { stat } from 'fs'
const Pushy = require('pushy-electron')

async function registerPushy() {
  return await Pushy.register({ appId: '5e3f6f1b74ffaa115ddb215b' })
}

const api = axios.create({
  baseURL: 'https://api.ashdevtools.com',
  timeout: 1000,
  headers: { 'X-Parse-Application-Id': 'AndrewsApp' },
})
export default {
  // setUser: async ({ commit, dispatch }, user) => {

  // },
  changeCurrentProfile: async ({ commit, dispatch }, payload) => {
    parseApi.changeCurrentProfile(payload)
  },

  login: async ({ commit, dispatch }, credentials) => {
    // commit('setCurrentUser', undefined)
    // commit('timesheets/setTimesheets', null, { root: true })
    // commit('callrecords/setCallrecords', null, { root: true })
    //console.log(credentials)

    return new Promise(async resolve => {
      // var data = await ipcRenderer.invoke('get-machine-id')
      var data = await registerPushy()
      //console.log(credentials)
      console.log(';')

      let user = await parseApi.loginUser(credentials.name, credentials.password, data)
      console.log(user)

      if (user == 404) {
        resolve(404)
      } else {
        commit('setCurrentUser', user)
        await parseApi.hydrateAll(user)
        router.push('/dashboard')
      }
    })
  },

  autoLogin: async ({ commit, dispatch }, user) => {
    // commit('setCurrentUser', undefined)
    // commit('timesheets/setTimesheets', null, { root: true })
    // commit('callrecords/setCallRecords', null, { root: true })
    if (!user) dispatch('logout', { root: true })

    commit('setCurrentUser', user)
    await parseApi.hydrateAll(user)
    return
    // const currentRouter = router.app.$route
  },

  setupSubscriptionCurentUser: async ({ commit, dispatch }, id) => {
    // let query = new Parse.Query('User')
    // query.equalTo('objectId', id)
    // let subscription = await query.subscribe()
    // subscription.on('create', object => {
    //   commit('setCurrentUser', object.toJSON())
    // })
    // subscription.on('update', object => {
    //   commit('setCurrentUser', object.toJSON())
    // })
    // subscription.on('delete', () => {
    //   commit('setCurrentUser', null)
    // })
  },
  /**
   * Callback fired when user logout
   */
  logout: async ({ commit }) => {
    // await logout()
    commit('setCurrentUser', undefined)
    commit('timesheets/setTimesheets', null, { root: true })
    commit('callrecords/setCallrecords', null, { root: true })
    commit('profiles/setUserProfile', null, { root: true })
    commit('profiles/removeAllProfiles', null, { root: true })
    // const currentRouter = router.app.$route
    router.push('/login')
  },
}
