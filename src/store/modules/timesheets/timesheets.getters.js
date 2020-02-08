import { find } from 'lodash'

export default {
  /**
   * Check if a timesheet has deletion pending
   */
  isTimesheetDeletionPending: state => timesheetId => state.timesheetDeletionPending.includes(timesheetId),

  /**
   * Get timesheet by id
   */
  getTimesheetById: state => timesheetId => find(state.timesheets, timesheet => timesheet.id === timesheetId),
  getTimesheetsByUserId: state => userId => find(state.timesheets, timesheet => timesheet.user.objectId === userId),
}
