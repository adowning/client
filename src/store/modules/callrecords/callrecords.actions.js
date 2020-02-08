import { getCallRecordsByUser } from '@/api/parseApi'

export default {
  /**
   * Fetch callrecords of current loggedin user
   */
  getUserCallRecords: async ({ rootState, commit }, user) => {
    const callrecords = await getCallRecordsByUser(user)
    commit('addCallRecords', callrecords)
  },

  /**
   * Create a callrecord for current loggedin user
   */
  createUserCallRecord: async ({ commit, rootState }, callrecord) => {
    const userCallRecordDb = new UserCallRecordsDB(rootState.authentication.user.id)

    commit('setCallRecordCreationPending', true)
    const createdCallRecord = await userCallRecordDb.create(callrecord)
    commit('addCallRecord', createdCallRecord)
    commit('setCallRecordCreationPending', false)
  },

  /**
   * Create a new callrecord for current loggedin user and reset callrecord name input
   */
  triggerAddCallRecordAction: ({ dispatch, state, commit }) => {
    if (state.callrecordNameToCreate === '') return

    const callrecord = { name: state.callrecordNameToCreate }
    commit('setCallRecordNameToCreate', '')
    dispatch('createUserCallRecord', callrecord)
  },

  /**
   * Delete a user callrecord from its id
   */
  deleteUserCallRecord: async ({ rootState, commit, getters }, callrecordId) => {
    if (getters.isCallRecordDeletionPending(callrecordId)) return

    const userCallRecordsDb = new UserCallRecordsDB(rootState.authentication.user.id)

    commit('addCallRecordDeletionPending', callrecordId)
    await userCallRecordsDb.delete(callrecordId)
    commit('removeCallRecordById', callrecordId)
    commit('removeCallRecordDeletionPending', callrecordId)
  },
}
