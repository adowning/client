import _ from 'lodash'

export default {
  /* Device input name */
  setDeviceNameToCreate: (state, deviceNameToCreate) => (state.deviceNameToCreate = deviceNameToCreate),

  /* Devices */
  setDevices: (state, devices) => (state.devices = devices),
  // setCurrentUsersDevices: (state, currentUsersDevices) => (state.currentUsersDevices = currentUsersDevices),
  addDevice: (state, device) => state.devices.push(device),
  updateDevice: (state, device) => {
    for (var i in state.devices) {
      if (state.devices[i].id == device.id) {
        console.log('foudn it')
        state.devices[i] = device
        break //Stop this loop, we found it!
      }
    }
  },

  addDevices: (state, devices) => {
    !state.devices ? (state.devices = []) : null
    devices.forEach(sheet => {
      sheet.type = 'device'
      state.devices.push(sheet)
    })
  },

  removeDeviceById: (state, deviceId) => {
    const index = state.devices.findIndex(device => device.id === deviceId)
    state.devices.splice(index, 1)
  },
  removeAllDevicesByUserId: (state, userId) => {
    !state.devices ? (state.devices = []) : null

    _.remove(state.devices, function(n) {
      return n.userId == userId
    })

    // state.devices = _.remove(state.devices, obj => removeItem.indexOf(obj.user.id) > -1)
    // const index = state.devices.findIndex(device => device.user.id === userId)
    // state.devices.splice(index, 1)
  },
  /* Devices deletion */
  addDeviceDeletionPending: (state, deviceId) => state.deviceDeletionPending.push(deviceId),
  removeDeviceDeletionPending: (state, deviceId) => {
    const index = state.devices.findIndex(device => device.id === deviceId)
    state.deviceDeletionPending.splice(index, 1)
  },

  /* Device creation */
  setDeviceCreationPending: (state, value) => (state.deviceCreationPending = value),
}
