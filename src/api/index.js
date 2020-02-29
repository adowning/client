import './onsipHelpers'
import './parseApi'
// import Parse from 'parse'
// global.Parse = Parse

// // // declare sub claParse.Usersses
// export const BME280 = Parse.Object.extend('BME280')
// export const USER = Parse.Object.extend('User')

// export const handleParseError = (store, error) => {
//   // eslint-disable-next-line no-console
//   console.error('Parse error:', error)
//   // eslint-disable-next-line no-console
//   console.warn('Force logout.')
//   store.dispatch(MODULES.User.actions.logout)
// }

// class ParseVue {
//   constructor(reqs) {
//     Parse.initialize(
//       process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
//       process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
//       process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
//     )
//     Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
//     Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL
//     this.reqs = reqs
//   }
//   async install(vue, options) {
//     //console.log('Installing the CommentsOverlay plugin!')
//     if (!options) throw new TypeError('You must provide parse options')
//     if (!options.parse) options.parse = 'parse'
//     Parse.initialize(options.appId, options.key, options.key)
//     Parse.serverURL = options.serverURL
//     Parse.liveQueryServerURL = options.liveQueryServerURL
//     var user = Parse.User.current()
//     //console.log(user)
//     if (user != null) {
//       await options.store.dispatch('initialize')
//     }
//     global['vue-parse-onerror'] = options.onerror
//     //console.log('finished installing parse')
//   }

//   launch() {
//     this.reqs.forEach(x => {
//       x.launch()
//     })
//   }
//   destroy() {
//     this.reqs.forEach(x => x.destroy())
//   }

//   enumerate() {
//     return this.reqs.map(x => x.name)
//   }

//   async wait() {
//     await Promise.all(this.reqs.map(x => x.promise))
//   }

//   get logIn() {
//     return Parse.User.logIn.bind(Parse.User)
//   }

//   get logOut() {
//     return Parse.User.logOut
//   }

//   get user() {
//     return Parse.User.current()
//   }

//   get run() {
//     return Parse.Cloud.run
//   }

//   get getJobsData() {
//     return Parse.Cloud['getJobsData']
//   }

//   get startJob() {
//     return Parse.Cloud['startJob']
//   }

//   get getJobStatus() {
//     return Parse.Cloud['getJobStatus']
//   }
// }

// export default new ParsePlugin()
