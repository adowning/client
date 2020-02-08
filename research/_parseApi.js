import Parse from 'parse'
import axios from 'axios'
// const pApi = axios.create({
//   baseURL: 'https://api.parse.com/parse',
//   timeout: 1000,
//   headers: { 'X-Parse-Application-Id': 'AndrewsApp', 'X-Parse-Master-Key': 'Asdfasdf1234' },
// })
var store

async function handleParseError(err) {
  console.log(err.code)
  switch (err.code) {
    case 101:
      // await Parse.User.logOut()
      // await firebase.auth().signOut()
      this.store.dispatch('logout')
      updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'mdi-debug',
        text: `${err}`,
        code: err.code,
      })
      break
    case Parse.Error.USER_INVALID_LOGIN_PARAMS:
      // await Parse.User.logOut()
      // await firebase.auth().signOut()
      store.dispatch('logout')
      updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'mdi-debug',
        text: `${err}`,
        code: err.code,
      })
      break
    case Parse.Error.INVALID_SESSION_TOKEN:
      // await Parse.User.logOut()
      // await firebase.auth().signOut()
      store.dispatch('logout')
      updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'mdi-debug',
        text: `${err}`,
        code: err.code,
      })
      break
    default:
      console.log(err.code)

      updateBus.$emit('showSnackBar', {
        show: true,
        color: 'error',
        icon: 'mdi-debug',
        text: `${err}`,
        code: err.code,
      })
    // ... // Other Parse API errors that you want to explicitly handle
  }
}
async function getclasses() {
  try {
    return await Parse.Cloud.run('getLiveQueryList')
  } catch (err) {
    handleParseError(err)
  }
}

export const initializeApi = async function(store) {
  console.log(store)
  let LiveQueryClient = Parse.LiveQueryClient
  const classes = getclasses()
  this.store = store
  let client = new LiveQueryClient({
    applicationId: 'AndrewsApp',
    // serverURL: 'ws://parse-andrews.herokuapp.com/parse',
    serverURL: 'ws://api.ashdevtools.com/parse',
    // javascriptKey: '',
    masterKey: 'Asdfasdf1234',
  })
}

export async function getMe() {
  return await pApi.get('/sessions/me')
}
export async function getLoggedInUsers() {
  return await pApi.get('/sessions/')
}

// import algoliasearch from 'algoliasearch'

const getClasses = async function() {
  reutrn
}
export const getCurrentUser = async function() {
  const _user = await Parse.User.current()
  // var lts = null
  // try {
  //   lts = _user.get("lastTimesheet")
  // } catch (e) {
  //   return null
  // }

  if (_user) {
    var user = _user.toJSON()
    // user.lastTimesheet = lts
    return user
  } else {
    console.log('no user')
    return null
  }
}
export const getUsers = async function() {
  const query = new Parse.Query(Parse.User)
  var _users = await query.find()
  var users = _users.map(user => user.toJSON())
  // console.log(user);
  return users
}
// export const currentUserTimecards = async function() {
//   const query = new Parse.Query('Timepunch')
//   query.equalTo('user', Parse.User.current())
//   query.equalTo('type', 'out')
//   var _cards = await query.find()

//   // var cards = _cards.map(card => {
//   //   card.jsonInpunch = card.get("inPunch");
//   //   // console.log(card.jsonInpunch);

//   //   return card.toJSON();
//   // });
//   // for (var card of _cards) {
//   //   // var incard = card.get("inPunch");
//   // }
//   return _cards
// }
export const changeCurrentUser = async function(payload) {
  const _user = await Parse.User.current()
  _user.set(payload.field, payload.value)
  await _user.save()
  return
}

export const getTimesheetsByUser = async function(userId) {
  if (typeof userId != 'string') {
    userId = userId.objectId
  }
  const User = Parse.Object.extend('User')
  var user = new User()
  user.id = userId
  const query = new Parse.Query('Timesheet')
  query.descending('in_timestamp')
  query.equalTo('user', user)
  query.limit(1000)
  var _sheets
  try {
    _sheets = await query.find()
    console.log(_sheets.length)
    return _sheets.map(sheet => sheet.toJSON())
  } catch (err) {
    return handleParseError(err)
  }
}
// export const getPartners = async function() {
//   const Customer = Parse.Object.extend("Customer");
//   const query = new Parse.Query(Customer);
//   query.limit(10000);
//   var _customers = await query.find();
//   return _customers.map(customer => customer.toJSON());
// };
// const fs = require('fs');
// const browser = index.browseAll();
// let hits = [];

// browser.on('result', content => {
//   hits = hits.concat(content.hits);
// });
export const getPartners = async function() {
  const browser = index.browseAll()
  let hits = []

  browser.on('result', content => {
    hits = hits.concat(content.hits)
    console.log(hits)
  })
  browser.on('end', () => {
    return hits
  })

  browser.on('error', err => {
    throw err
  })
}

export const loginUser = async function(username, password) {
  var _user
  try {
    _user = await Parse.User.logIn(username, password)
    var user = _user.toJSON()
    return user
  } catch (err) {
    handleParseError(err)
  }
}
export const logout = async function() {
  try {
    await Parse.User.logOut()
  } catch (err) {
    handleParseError(err)
  }
}
export const isLoggedIn = function() {
  const _user = Parse.User.current()
  if (_user) {
    return true
  } else {
    return false
  }
}

export const startListening = async function(store) {
  const sessionToken = Parse.Session.current().sessionToken
  const liveQueryList = await Parse.Cloud.run('getLiveQueryList')

  for (var schema of liveQueryList) {
    let query = new Parse.Query(schema)
    let subscription = client.subscribe(query, sessionToken)
    subscription.on('update', (object, original) => {
      store.dispatch('update', schema, object, original)
    })
    subscription.on('create', (object, original) => {
      store.dispatch('create', schema, object, original)
    })
    subscription.on('delete', (object, original) => {
      store.dispatch('delete', schema, object, original)
    })
    query.find({
      success: results => {
        console.log(JSON.stringify(results))
      },
      error: err => {
        console.log('err : ' + JSON.stringify(err))
      },
    })
  }
}

// const algoliaClient = algoliasearch('59EXPAJLR4', 'a0374c5218e3f50ccf554a5b2ca5e3ee')
// const index = algoliaClient.initIndex('accounts')

// export const initialize = async () => {
//   await Parse.initialize('AndrewsApp', 'Asdfasdf1234')

//   Parse.serverURL = process.env.VUE_APP_PARSE_SERVER
//   Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_WS
//   setTimeout(function() {
//     //do what you need here
//   }, 3000)

//   client.open()
// }
