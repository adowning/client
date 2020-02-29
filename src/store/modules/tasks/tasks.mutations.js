export default {
  /* Task input name */
  // setTaskNameToCreate: (state, taskNameToCreate) => (state.taskNameToCreate = taskNameToCreate),

  /* Tasks */
  // setTasks: (state, tasks) => (state.tasks = tasks),
  // setUserTask: (state, task) => Object.assign(state.userTask, task),
  setUserTask: (state, task) => (state.userTask = task),

  updateTask: (state, payload) => {
    !state.tasks ? (state.tasks = []) : null
    const item = state.tasks.find(item => item.objectId == payload.objectId)
    if (item != undefined) Object.assign(item, payload)
    state.tasks.sort((a, b) => b.isClocked - a.isClocked)
  },
  addTasks: (state, tasks) => {
    !state.tasks ? (state.tasks = []) : null
    tasks.forEach(task => {
      state.tasks.push(task)
    })
    state.tasks.sort((a, b) => b.isClocked - a.isClocked)
  },
  removeTaskById: (state, taskId) => {
    const index = state.tasks.findIndex(task => task.id === taskId)
    state.tasks.splice(index, 1)
  },
  removeAllTasks: state => {
    state.tasks = []
  },

  // /* Tasks deletion */
  // addTaskDeletionPending: (state, taskId) => state.taskDeletionPending.push(taskId),
  // removeTaskDeletionPending: (state, taskId) => {
  //   const index = state.tasks.findIndex(task => task.id === taskId)
  //   state.taskDeletionPending.splice(index, 1)
  // },

  // /* Task creation */
  // setTaskCreationPending: (state, value) => (state.taskCreationPending = value),
}
