import { getDevicesByUser } from '@/api/parseApi'
import { ipcRenderer } from 'electron'
import axios from 'axios'
const os = require('os')
let address
const Pushy = require('pushy-electron')
import Parse from 'parse'

async function registerPushy() {
  return await Pushy.register({ appId: '5e3f6f1b74ffaa115ddb215b' })
}

export default {
  /**
   * Fetch devices of current loggedin user
   */
  getCurrentDevice: async ({ commit, dispatch }) => {
    return new Promise(async resolve => {
      // var result = await ipcRenderer.invoke('get-machine-id')
      var result = await registerPushy()
      var query = new Parse.Query('Device')
      query.equalTo('deviceId', result)
      var device
      try {
        device = await query.first()
      } catch (e) {
        console.log(e)
      }
      if (device == undefined) {
        var deviceInfo = await dispatch('generateCurrentDevice', 'auto-configured', result)
        var Device = Parse.Object.extend('Device')
        var device = new Parse.Object(deviceInfo)
        await device.save()
        commit('setCurrentDevice', device.toJSON())
        resolve(device.toJSON())
      } else {
        commit('setCurrentDevice', device.toJSON())
        resolve(device)
      }
    })
  },
  // })

  getCurrentDeviceId: async ({ rootState, commit }) => {
    return new Promise(async resolve => {
      ipcRenderer.send('get-machine-id')
      ipcRenderer.on('get-machine-id', async (event, result) => {
        resolve(result)
      })
    })
  },
  generateCurrentDevice: async ({ commit, rootState }, label, data) => {
    return new Promise(async resolve => {
      // var data = await ipcRenderer.invoke('get-machine-id')
      // var ipAddress = await axios.get('https://ipinfo.io')
      var ip = require('ip')
      //console.log(ip.address())
      const computerName = os.hostname()
      var pushyId = await registerPushy()
      var deviceInfo = {
        // deviceId: data,
        label: label,
        pushyId: pushyId,
        computerName: computerName,
        ipAddressInternal: ip.address(),
        // ipAddressPublic: ipAddress,
      }
      resolve(deviceInfo)
      // router.push('/dashboard')
    })
    // ipcRenderer.send('get-machine-id')
  },
  /**
   * Create a device for current loggedin user
   */
  registerDevice: async ({ commit, rootState, dispatch }, label) => {
    return new Promise(async resolve => {
      var deviceInfo = await dispatch('generateCurrentDevice', label)
      let device = await parseApi.registerDevice(deviceInfo)
      console.log(device)
      if (device == 404) {
        resolve(404)
      } else {
        // commit('setCurrentDevice', device)
        resolve(device)
        // resolve(router.push('/dashboard'))
      }
    })
  },
  // return new Promise(async resolve => {
  //   await ipcRenderer.once('get-machine-id', async (event, data) => {
  //     // var ipAddress = await axios.get('https://ipinfo.io')
  //     var ip = require('ip')
  //     //console.log(ip.address())
  //     const computerName = os.hostname()
  //     var pushyId = await registerPushy()
  //     //console.log(pushyId)
  //     var deviceInfo = {
  //       deviceId: data,
  //       label: label,
  //       pushyId: pushyId,
  //       computerName: computerName,
  //       ipAddressInternal: ip.address(),
  //       // ipAddressPublic: ipAddress,
  //     }
  //     let device = await parseApi.registerDevice(deviceInfo)
  //     //console.log(device)

  //     if (device == 404) {
  //       resolve(404)
  //     } else {
  //       commit('setCurrentDevice', device)
  //       // router.push('/dashboard')
  //     }
  //   })
  //   ipcRenderer.send('get-machine-id')
  // })
  // },

  /**
   * Create a new device for current loggedin user and reset device name input
   */
  triggerAddDeviceAction: ({ dispatch, state, commit }) => {
    if (state.deviceNameToCreate === '') return

    const device = { name: state.deviceNameToCreate }
    commit('setDeviceNameToCreate', '')
    dispatch('createUserDevice', device)
  },

  /**
   * Delete a user device from its id
   */
  deleteUserDevice: async ({ rootState, commit, getters }, deviceId) => {
    if (getters.isDeviceDeletionPending(deviceId)) return

    const userDevicesDb = new UserDevicesDB(rootState.authentication.user.id)

    commit('addDeviceDeletionPending', deviceId)
    await userDevicesDb.delete(deviceId)
    commit('removeDeviceById', deviceId)
    commit('removeDeviceDeletionPending', deviceId)
  },
}
