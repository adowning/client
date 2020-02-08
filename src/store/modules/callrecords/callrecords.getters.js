import { find } from 'lodash'

export default {
  /**
   * Check if a callrecord has deletion pending
   */
  isCallRecordDeletionPending: state => callrecordId => state.callrecordDeletionPending.includes(callrecordId),

  /**
   * Get callrecord by id
   */
  getCallRecordById: state => callrecordId => find(state.callrecords, callrecord => callrecord.id === callrecordId),
  getCallRecordsByUserId: state => userId => find(state.callrecords, callrecord => callrecord.user.objectId === userId),
}
