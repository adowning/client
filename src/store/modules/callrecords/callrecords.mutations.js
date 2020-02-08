import _ from 'lodash'

export default {
  /* CallRecord input name */
  // setCallRecordNameToCreate: (state, callrecordNameToCreate) => (state.callrecordNameToCreate = callrecordNameToCreate),

  /* CallRecords */
  setCallrecords: (state, callrecords) => (state.callrecords = callrecords),
  // setCurrentUsersCallRecords: (state, currentUsersCallRecords) => (state.currentUsersCallRecords = currentUsersCallRecords),
  addCallrecord: (state, callrecord) => state.callrecords.push(callrecord),

  addCallrecords: (state, callrecords) => {
    !state.callrecords ? (state.callrecords = []) : null
    // state.callrecords = callrecords/
    callrecords.forEach(callrecord => {
      callrecord.type = 'callrecord'
      callrecord.startTimestamp = callrecord.startTime
      callrecord.endTimestamp = callrecord.endTime

      state.callrecords.push(callrecord)
    })
  },

  removeCallrecordById: (state, callrecordId) => {
    const index = state.callrecords.findIndex(callrecord => callrecord.id === callrecordId)
    state.callrecords.splice(index, 1)
  },
  removeAllCallrecordsByUserId: (state, employee) => {
    !state.callrecords ? (state.callrecords = []) : null

    _.remove(state.callrecords, function(n) {
      return n.employee == employee
    })

    // state.callrecords = _.remove(state.callrecords, obj => removeItem.indexOf(obj.user.id) > -1)
    // const index = state.callrecords.findIndex(callrecord => callrecord.user.id === userId)
    // state.callrecords.splice(index, 1)
  },
  removeAllCallrecords: state => {
    state.callrecords = []
  },

  // state.callrecords = _.remove(state.callrecords, obj => removeItem.indexOf(obj.user.id) > -1)
  // const index = state.callrecords.findIndex(callrecord => callrecord.user.id === userId)
  // state.callrecords.splice(index, 1)

  /* CallRecords deletion */
  // addCallRecordDeletionPending: (state, callrecordId) => state.callrecordDeletionPending.push(callrecordId),
  // removeCallRecordDeletionPending: (state, callrecordId) => {
  //   const index = state.callrecords.findIndex(callrecord => callrecord.id === callrecordId)
  //   state.callrecordDeletionPending.splice(index, 1)
  // },

  // /* CallRecord creation */
  // setCallRecordCreationPending: (state, value) => (state.callrecordCreationPending = value),
}
