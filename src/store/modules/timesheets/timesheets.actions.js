import { getTimesheetsByUser } from '@/api/parseApi'

export default {
  /**
   * Fetch timesheets of current loggedin user
   */
  getUserTimesheets: async ({ rootState, commit }, user) => {
    //console.log(user)
    const timesheets = await getTimesheetsByUser(user)
    commit('addTimesheets', timesheets)
  },

  /**
   * Create a timesheet for current loggedin user
   */
  createUserTimesheet: async ({ commit, rootState }, timesheet) => {
    const userTimesheetDb = new UserTimesheetsDB(rootState.authentication.user.id)

    commit('setTimesheetCreationPending', true)
    const createdTimesheet = await userTimesheetDb.create(timesheet)
    commit('addTimesheet', createdTimesheet)
    commit('setTimesheetCreationPending', false)
  },

  /**
   * Create a new timesheet for current loggedin user and reset timesheet name input
   */
  triggerAddTimesheetAction: ({ dispatch, state, commit }) => {
    if (state.timesheetNameToCreate === '') return

    const timesheet = { name: state.timesheetNameToCreate }
    commit('setTimesheetNameToCreate', '')
    dispatch('createUserTimesheet', timesheet)
  },

  /**
   * Delete a user timesheet from its id
   */
  deleteUserTimesheet: async ({ rootState, commit, getters }, timesheetId) => {
    if (getters.isTimesheetDeletionPending(timesheetId)) return

    const userTimesheetsDb = new UserTimesheetsDB(rootState.authentication.user.id)

    commit('addTimesheetDeletionPending', timesheetId)
    await userTimesheetsDb.delete(timesheetId)
    commit('removeTimesheetById', timesheetId)
    commit('removeTimesheetDeletionPending', timesheetId)
  },
}
