import Parse from 'parse'
global.Parse = Parse
import DollarParse from './DollarParse'
import { ParseQuery } from '../api/ParseQuery'
import store from '@/store'
export const ACTIVITY = Parse.Object.extend('ActivityTest')
export const USER = Parse.Object.extend('User')
export const TIMESHEET = Parse.Object.extend('Timesheet')
export const CUSTOMER = Parse.Object.extend('Customer')

function isQuery(item) {
  return 'object' in item
}

function isFunction(item) {
  return 'function' in item
}

export const handleParseError = (store, error) => {
  // eslint-disable-next-line no-console
  console.error('Parse error:', error)
  // eslint-disable-next-line no-console
  console.warn('Force logout.')
  store.dispatch(MODULES.User.actions.logout)
}

async function setupQueries() {
  const parse = this.$options.parse
  //console.log(parse)
  if (!parse || parse == undefined) {
    this.$parse = new DollarParse([])
    return
  }
  const reqs = []
  for (var key in parse) {
    const definition = parse[key]
    // if (isFunction(definition)) {
    //   const req = new ParseFunction({
    //     vue: this,
    //     name: key,
    //     definition,
    //   })
    //   reqs.push(req)
    //   continue
    // }
    if (isQuery(definition)) {
      const req = new ParseQuery({
        vue: this,
        name: key,
        definition,
      })
      reqs.push(req)
    }
  }
  this.$parse = new DollarParse(reqs)
}

async function launchQueries() {
  if (!this.$parse) return
  // //console.log('launching', this.$parse)

  this.$parse.launch()
}

class ParseVue {
  constructor(reqs) {
    //console.log(reqs)
    this.reqs = reqs
  }
  async install(Vue, options) {
    //console.log('Installing the parse plugin')
    Parse.LiveQuery.on('open', () => {
      //console.log('socket connection established')
    })
    await Parse.initialize(
      process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
      process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
      process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
    )

    Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
    Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL

    // //console.log(process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL)
    // var client = new Parse.LiveQueryClient({
    //   applicationId: process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
    //   serverURL: 'ws://localhost:1338/parse', // Example: 'wss://livequerytutorial.back4app.io'
    //   masterKey: process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
    // })
    // client.open()

    // var query = new Parse.Query('Timesheet')
    // var q = new Parse.Query('User')

    // query.ascending('startTimestamp')
    // var subscription = client.subscribe(query)
    // var s = client.subscribe(q)
    // s.on('update', object => {
    //   //console.log('update', object)
    //   // context.dispatch('update' + className, object)
    // })
    // const liveQueryList = await Parse.Cloud.run('getLiveQueryList')
    // //console.log(liveQueryList)
    // // const query = new Parse.Query('Timesheet')
    // // let subscription = await query.subscribe()
    // subscription.on('update', object => {
    //   //console.log('update', object)
    //   // context.dispatch('update' + className, object)
    // })

    //  async [ACTIONS.setSubscriptions]({ commit }) {
    //   const liveQueryList = await Parse.Cloud.run('getLiveQueryList')
    //   for (var className of liveQueryList) {
    //     const query = new Parse.Query(className)
    //
    //     subscription.on('create', object => {
    //       //console.log('create')
    //       context.dispatch('create' + className, object)
    //     })
    //     subscription.on('update', object => {
    //       //console.log('update')
    //       context.dispatch('update' + className, object)
    //     })
    //     subscription.on('delete', object => {
    //       //console.log('delete')
    //       context.dispatch('delete' + className, object)
    //     })
    //   }
    //   commit(MUTATIONS.saveSubscriptions, liveQueryList)
    // }

    Vue.mixin({
      // computed: {
      //   user: {
      //     get() {
      //       try {
      //         return Parse.User.current().toJSON()
      //       } catch (e) {
      //         return null
      //       }
      //     },
      //   },
      // },
      beforeCreate: setupQueries,
      created: launchQueries,
      destroyed() {
        if (!this.$parse) return
        this.$parse.destroy()
      },
    })
    global['vue-parse-onerror'] = e =>
      this.updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'mdi-debug',
        text: `${e}`,
        code: e.code,
      })

    //console.log('finished installing parse')
  }

  launch() {
    this.reqs.forEach(x => {
      x.launch()
    })
  }
  destroy() {
    this.reqs.forEach(x => x.destroy())
  }

  enumerate() {
    return this.reqs.map(x => x.name)
  }

  async wait() {
    await Promise.all(this.reqs.map(x => x.promise))
  }

  get logIn() {
    return Parse.User.logIn.bind(Parse.User)
  }

  get logOut() {
    return Parse.User.logOut
  }

  get run() {
    return Parse.Cloud.run
  }

  get getJobsData() {
    return Parse.Cloud['getJobsData']
  }

  get startJob() {
    return Parse.Cloud['startJob']
  }

  get getJobStatus() {
    return Parse.Cloud['getJobStatus']
  }
}

export default new ParseVue()
