import { getDevicesByUser } from '@/api/parseApi'
import { ipcRenderer } from 'electron'

export default {
  /**
   * Fetch devices of current loggedin user
   */
  getUserDevices: async ({ rootState, commit }, user) => {
    console.log(user)
    const devices = await getDevicesByUser(user)
    commit('addDevices', devices)
  },

  /**
   * Create a device for current loggedin user
   */
  registerDevice: async ({ commit, rootState }, label) => {
    return new Promise(async resolve => {
      var result = await ipcRenderer.once('get-machine-id', async (event, data) => {
        var device = {
          deviceId: data,
          label: label,
          ipAddress: ipAddress,
        }
        let device = await parseApi.registerDevice(credentials.name, credentials.password, data)
        console.log(user)

        if (user == 404) {
          resolve(404)
        } else {
          commit('setCurrentUser', user)
          await parseApi.hydrateAll(user)
          // await parseApi.startListening()
          // const currentRouter = router.app.$route
          router.push('/dashboard')
        }
      })
      ipcRenderer.send('get-machine-id')
    })
  },

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
