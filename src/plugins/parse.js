import Parse from 'parse'
// import firebase from 'firebase/auth'
global.Parse = Parse
import DollarParse from './DollarParse'
import { ParseQuery } from '../api/ParseQuery'
import ParseFunction from '../api/ParseFunction'
// import { VueParseItem, isFunction, isQuery } from './VueParse'
// import { getLoggedInUsers } from '../api/parseApi.js/index.js'
import ParseApi from '@/api/parseApi'
function isQuery(item) {
  return 'object' in item
}
function isFunction(item) {
  return 'function' in item
}

function prop() {
  return (target, property) => {
    return {
      set(value) {
        this.set(property, value)
      },
      get() {
        return this.get(property)
      },
    }
  }
}
function model(name) {
  return target => {
    const original = target
    var f = function(...args) {
      const instance = new original(...args)
      instance.className = name
      return instance
    }
    f.prototype = original.prototype
    Parse.Object.registerSubclass(name, f)
    return f
  }
}

async function setupQueries() {
  const parse = this.$options.parse
  if (!parse) {
    this.$parse = new DollarParse([])
    global.$parse = this.$parse

    return
  }
  const reqs = []

  for (var key in parse) {
    const definition = parse[key]
    if (isFunction(definition)) {
      const req = new ParseFunction({
        vue: this,
        name: key,
        definition,
      })
      reqs.push(req)
      continue
    }
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
  this.$parse.launch()
}

const mixin = {
  data() {
    if (!this.$parse) return {}
    const result = {}
    this.$parse.enumerate().forEach(x => {
      result[x] = []
    })
    return result
  },
  beforeCreate: setupQueries,
  created: launchQueries,
  destroyed() {
    if (!this.$parse) return
    this.$parse.destroy()
  },
}

export async function handleParseError(err) {
  console.log(err.code)
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      await Parse.User.logOut()
      // await firebase.auth().signOut()
      // ... // If web browser, render a log in screen
      // ... // If Express.js, redirect the user to the log in route
      break

    // ... // Other Parse API errors that you want to explicitly handle
  }
}

const install = async (Vue, options) => {
  if (!options) throw new TypeError('You must provide parse options')
  if (!options.parse) options.parse = 'parse'
  Parse.initialize(options.appId, options.key, options.key)
  Parse.serverURL = options.serverURL
  Parse.liveQueryServerURL = options.liveQueryServerURL
  console.log(options.liveQueryServerURL)

  Parse.enableLocalDatastore()
  // initializeApi(options.store)
  const parseApi = new ParseApi()
  parseApi.init(options)
  // parseApi.logoutUser()

  global.parseApi = parseApi
  var _user = await parseApi.currentUser()
  if (_user != null) {
    // parseApi.hydrateAll(user)
    var user = _user.toJSON()
    options.store.dispatch('authentication/autoLogin', user)
  } else {
    parseApi.logoutUser()
  }
  // global['vue-parse-onerror'] = options.onerror
  // Vue.mixin(mixin)
  // try {
  //   var user = Parse.User.current()
  //   if (user == null) {
  //     var creds = options.store.getters.credentials
  //     if (creds == undefined) {
  //       return options.router.push('/')
  //     }
  //     console.log('auto logging in ')
  //     var user = await Parse.User.logIn(creds.username, creds.password)
  //     if (user == null) {
  //       return options.router.push('/')
  //     }
  //   } else {
  //     //check to see if session is good
  //     try {
  //       var config = await Parse.Config.get()
  //     } catch (e) {
  //       global.updateBus.$emit('showSnackBar', {
  //         show: true,
  //         color: 'error',
  //         icon: 'fa-exclamation',
  //         text: e,
  //         errorCode: e.code,
  //       })
  //       return options.router.push('/')
  //     }
  //     console.log(config)
  //   }
  //   return options.store.dispatch('setSubscriptions')
  // } catch (e) {
  //   console.log(e)
  //   return options.router.push('/')
  // }
}
export function extend(definition) {
  return definition
}
export default install
// export * from './decorators'
// export * from './vue'
