import _ from 'lodash'

export default {
  /* Timesheet input name */
  setTimesheetNameToCreate: (state, timesheetNameToCreate) => (state.timesheetNameToCreate = timesheetNameToCreate),

  /* Timesheets */
  setTimesheets: (state, timesheets) => (state.timesheets = timesheets),
  // setCurrentUsersTimesheets: (state, currentUsersTimesheets) => (state.currentUsersTimesheets = currentUsersTimesheets),
  addTimesheet: (state, timesheet) => state.timesheets.push(timesheet),
  updateTimesheet: (state, timesheet) => {
    for (var i in state.timesheets) {
      if (state.timesheets[i].id == timesheet.id) {
        //console.log('foudn it')
        state.timesheets[i] = timesheet
        break //Stop this loop, we found it!
      }
    }
  },

  addTimesheets: (state, timesheets) => {
    !state.timesheets ? (state.timesheets = []) : null
    timesheets.forEach(sheet => {
      sheet.type = 'timesheet'
      state.timesheets.push(sheet)
    })
  },

  removeTimesheetById: (state, timesheetId) => {
    const index = state.timesheets.findIndex(timesheet => timesheet.id === timesheetId)
    state.timesheets.splice(index, 1)
  },
  removeAllTimesheetsByProfileId: (state, profileId) => {
    !state.timesheets ? (state.timesheets = []) : null

    _.remove(state.timesheets, function(n) {
      return n.profileId == profileId
    })

    // state.timesheets = _.remove(state.timesheets, obj => removeItem.indexOf(obj.user.id) > -1)
    // const index = state.timesheets.findIndex(timesheet => timesheet.user.id === userId)
    // state.timesheets.splice(index, 1)
  },
  /* Timesheets deletion */
  addTimesheetDeletionPending: (state, timesheetId) => state.timesheetDeletionPending.push(timesheetId),
  removeTimesheetDeletionPending: (state, timesheetId) => {
    const index = state.timesheets.findIndex(timesheet => timesheet.id === timesheetId)
    state.timesheetDeletionPending.splice(index, 1)
  },

  /* Timesheet creation */
  setTimesheetCreationPending: (state, value) => (state.timesheetCreationPending = value),
}
