import ParseApi from '../../../api/parseApi'

export default {
  /**
   * Fetch tasks of current loggedin task
   */
  // getUserTask: async ({ rootState, commit }, user) => {
  //   //console.log(user)
  //   const task = await getUserTask(user)
  //   commit('setUserTask', task)
  // },
  changeCurrentTask: async ({ rootState, commit }, payload) => {
    var _task = rootState.tasks.userTask
    parseApi.changeCurrentTask(_task, payload)
    // const query = new Parse.Query(TASK)
    // var task = await query.get(Parse.User.current().get('task').id)
    // task.set(payload.field, payload.value)
    // await task.save()
    // Task.set(payload.field, payload.value)
  },
  getTasks: async ({ rootState, commit }) => {
    const tasks = await getTasks()
    commit('addTasks', tasks)
  },
}
