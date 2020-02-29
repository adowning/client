import { TIMESHEET, handleParseError } from '@/plugins/parse'
// import * as db from '../../db'
import moment from 'moment'
export const SET_ALL_TIMESHEETS = {
  setAllTimesheets: 'setAllTimesheets',
  saveTimesheets: 'saveTimesheets',
}

export const GETTERS = {
  getTimesheets: 'getTimesheets',
}

export const MUTATIONS = {
  setTimesheets: 'setTimesheets',
  setLabel: 'setLabel',
  pushTimesheet: 'pushTimesheet',
  addTimesheet: 'addTimesheet',
  updateTimesheet: 'updateTimesheet',
  removeTimesheet: 'removeTimesheet',
  setTimesheet: 'setTimesheet',
}

export const ACTIONS = {
  hydrateUserTimesheets: 'hydrateUserTimesheets',
  subscribeToTimesheets: 'subscribeToTimesheets',
  saveTimesheets: 'saveTimesheets',
  updateTimesheets: 'updateTimesheets',
  setTimesheet: 'setTimesheet',
}

export default {
  state: {
    timesheets: [],
  },
  actions: {
    async [ACTIONS.hydrateUserTimesheets](context) {
      const query = new Parse.Query(TIMESHEET)
      query.equalTo('userId', parseApi.currentUser().id)
      // query.limit(100)
      var results = await query.find()

      results = results.sort((a, b) => b.get('startTimestamp') - a.get('startTimestamp'))
      let timesheets = []
      results.forEach(entity => {
        let timesheet = Object.assign({}, entity.attributes)
        timesheet.id = entity.id
        timesheets.push(timesheet)
      })(timesheets.length)
      context.commit(MUTATIONS.setTimesheets, timesheets)
    },

    [ACTIONS.setTimesheet](context, timesheet) {
      // export function setTask(task:ITask,actionTypes?:string) {
      const timesheets = context.state.timesheets.slice()

      const oldTimesheet = timesheets.find(t => t.id === timesheet.id)

      if (oldTimesheet) {
        // update
        Object.assign(oldTimesheet, timesheet, {
          updateTime: moment().format(),
        })
        // db.updateTimesheet(oldTimesheet)
        return context.commit(MUTATIONS.setTimesheets, timesheets)
      } else {
        // create
        // db.saveTimesheet(timesheet)
        return context.commit(MUTATIONS.addTimesheet, timesheet)
      }
    },
    [ACTIONS.setAllTimesheets]({ commit }, timesheetsFromDB) {
      commit(MUTATIONS.setTimesheets, timesheetsFromDB)
    },

    async [ACTIONS.subscribeToTimesheets](context) {
      const query = new Parse.Query(TIMESHEET)
      query.equalTo('profileId', Parse.User.current().get('profileId'))

      var results = await query.find()
      results = results.sort((a, b) => b.get('startTimestamp') - a.get('startTimestamp'))
      let timesheets = []
      results.forEach(entity => {
        let timesheet = Object.assign({}, entity.attributes)
        timesheet.id = entity.id
        timesheets.push(timesheet)
      })

      context.commit(MUTATIONS.setTimesheets, timesheets)

      let subscription = await query.subscribe()

      subscription.on('create', object => {
        //console.log('create')

        // let timesheet = Object.assign({}, object.attributes)
        // timesheet.id = object.id
        // context.commit(MUTATIONS.addTimesheet, timesheet)
        context.dispatch('updateTimesheets')
      })
      subscription.on('delete', object => {
        //console.log('delete')

        // let timesheet = Object.assign({}, object.attributes)
        // timesheet.id = object.id
        // context.commit(MUTATIONS.addTimesheet, timesheet)
        context.dispatch('updateTimesheets')
      })
      subscription.on('update', object => {
        //console.log('update')
        // let timesheet = Object.assign({}, object.attributes)
        // timesheet.id = object.id
        // context.commit(MUTATIONS.updateTimesheet, timesheet)

        // if (item != -1) {
        //   //console.log(item)
        context.dispatch('updateTimesheets')
        // context.commit(MUTATIONS.removeTimesheet, timesheet)
        // context.commit(MUTATIONS.addTimesheet, timesheet)
        // }
      })
      // query.equalTo('profileId', Parse.User.current().get('profile').id)
      // query
      //   .find()
      //   .then(results => {
      //     results = results.sort(
      //       (a, b) => b.get('startTimestamp') - a.get('startTimestamp')
      //     )

      //     let timesheets = []
      //     results.forEach(entity => {
      //       let timesheet = Object.assign({}, entity.attributes)
      //       timesheet.id = entity.id
      //       timesheets.push(timesheet)
      //     })
      //     context.commit(MUTATIONS.setTimesheets, timesheets)
      //   })
      //   .then(async () => {
      //     // subscribe to new values
      //     let subscription = await query.subscribe()

      //     // //console.log(query)
      //     subscription.on('create', object => {
      //       let timesheet = Object.assign({}, entity.attributes)
      //       timesheet.id = entity.id
      //       commit(MUTATIONS.pushTimesheet, timesheet)
      //     })
      //     subscription.on('update', object => {
      //       //console.log('updating')
      //       let timesheet = Object.assign({}, object.attributes)
      //       const item = context.state.Timesheet.timesheets.filter(
      //         x => x.id === timesheet.id
      //       )

      //       if (item == -1) context.commit(MUTATIONS.pushTimesheet, timesheet)
      //       // else Vue.set(this.vue.$data[this.name], item, data)
      //     })
      //   }),
      //   error => {
      //     handleParseError(this, error)
      //   }
    },
    [ACTIONS.saveTimesheets]({ state }) {
      // process all timesheets
      state.timesheets.forEach(timesheet => {
        // process each entity
        const query = new Parse.Query(TIMESHEET)
        query.get(timesheet.id).then(entity => {
          // update entity if label changed
          if (entity.get('label') != timesheet.label) {
            entity.set('label', timesheet.label)
            entity.save().then(
              () => {
                // success
              },
              error => {
                // eslint-disable-next-line no-console
                console.error('Updating failed', error)
              },
            )
          }
        })
      })
    },
  },
  getters: {
    [GETTERS.getTimesheets]: state => {
      return state.timesheets
    },
  },
  mutations: {
    [MUTATIONS.setTimesheets](state, timesheets) {
      // state.timesheets.push[timesheet]

      state.timesheets = timesheets
    },
    [MUTATIONS.addTimesheet](state, timesheet) {
      state.timesheets.push[timesheet]
    },
    [MUTATIONS.setLabel](state, { index, label }) {
      state.timesheets[index].label = label
    },
    [MUTATIONS.updateTimesheet](state, timesheet) {
      state.timesheets.push[timesheet]
      // for (var i in state.timesheets) {
      //   if (state.timesheets[i].id == timesheet.id) {
      //     state.timesheets[i] = timesheet
      //     break //Stop this loop, we found it!
      //   }
      // }
    },
    [MUTATIONS.removeTimesheet](state, timesheet) {
      state.timesheets = state.timesheets.filter(x => x.id != timesheet.id)
    },
  },
}
