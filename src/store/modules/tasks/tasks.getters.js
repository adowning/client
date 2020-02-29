import { find } from 'lodash'

export default {
  /**
   * Check if a task has deletion pending
   */
  // isTaskDeletionPending: state => taskId => state.taskDeletionPending.includes(taskId),
  /**
   * Get task by id
   */
  getTaskById: state => taskId => find(state.tasks, task => task.id === taskId),
  getOpenTasksByProfile: state => profileId =>
    find(state.tasks, task => {
      if (task.profile == profileId && task.isOpen == true) {
        return true
      } else {
        return []
      }
    }),
}
