import { find } from 'lodash'

export default {
  /**
   * Check if a device has deletion pending
   */
  isDeviceDeletionPending: state => deviceId => state.deviceDeletionPending.includes(deviceId),

  /**
   * Get device by id
   */
  getDeviceById: state => deviceId => find(state.devices, device => device.id === deviceId),
  getDevicesByUserId: state => userId => find(state.devices, device => device.user.objectId === userId),
}
