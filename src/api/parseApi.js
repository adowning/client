import moment from 'moment'
import { fetchSdrs, Sdr2Callrecord } from './onsipHelpers'
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { handleParseError } from '../plugins/parse'
import { ParseQuery } from './ParseQuery'
import CreateQuery from './CreateQuery'
import { ipcMain, ipcRenderer } from 'electron'

export default class ParseApi {
  static device
  constructor(store, device) {
    this.store = store
    this.device = device

    this.client = new Parse.LiveQueryClient({
      applicationId: 'AndrewsApp',
      // serverURL: 'ws://parse-andrews.herokuapp.com/parse',
      serverURL: 'ws://localhost:1337/parse',
      // javascriptKey: '',
      masterKey: process.env.VUE_APP_PARSE_MASTERKEY,
    })
    this.client.on('error', error => {
      this.handleParseError(error)
    })
    this.client.on('open', () => {
      //console.log('connected to live query server')
    })
    this.client.open()
  }
  async handleParseError(err) {
    console.error(err)
    switch (err.code) {
      case 209:
        console.log('handleing err')
        Parse.User.logOut().then(() => {
          updateBus.$emit('showSnackBar', {
            show: true,
            color: 'error',
            icon: 'mdi-debug',
            text: `device not found`,
            code: 444,
          })
          this.store.dispatch('authentication/logout')
        })
      case 444:
        console.log('handleing err')
        Parse.User.logOut().then(() => {
          updateBus.$emit('showSnackBar', {
            show: true,
            color: 'error',
            icon: 'mdi-debug',
            text: `device not found`,
            code: 444,
          })
          this.store.dispatch('authentication/logout')
        })
      case 101:
        if (err.message == 'Object not found.') {
          updateBus.$emit('showSnackBar', {
            show: true,
            color: 'error',
            icon: 'mdi-debug',
            text: `${err}`,
            code: err.code,
          })
        } else {
          Parse.User.logOut().then(() => {
            var currentUser = Parse.User.current() // this will now be null
            updateBus.$emit('showSnackBar', {
              show: true,
              color: 'error',
              icon: 'mdi-debug',
              text: `${err}`,
              code: err.code,
            })
            this.store.dispatch('authentication/logout')
          })
        }
        if (err.message == 'Error: Object not found') {
        }
        // Parse.User.logOut().then(() => {
        //   var currentUser = Parse.User.current() // this will now be null
        //   updateBus.$emit('showSnackBar', {
        //     show: true,
        //     color: 'error',
        //     icon: 'mdi-debug',
        //     text: `${err}`,
        //     code: err.code,
        //   })
        //   this.store.dispatch('authentication/logout')
        // })

        break
      case 119:
        Parse.User.logOut().then(() => {
          var currentUser = Parse.User.current() // this will now be null
          updateBus.$emit('showSnackBar', {
            show: true,
            color: 'error',
            icon: 'mdi-debug',
            text: 'User Not Allowed',
            code: err.code,
          })

          this.store.dispatch('authentication/logout')
        })

        break
      case Parse.Error.INVALID_SESSION_TOKEN:
        // await Parse.User.logOut()
        // await firebase.auth().signOut()
        this.store.dispatch('authentication/logout')

        Parse.User.logOut().then(() => {
          var currentUser = Parse.User.current() // this will now be null
          updateBus.$emit('showSnackBar', {
            show: true,
            color: 'error',
            icon: 'mdi-debug',
            text: `${err}`,
            code: err.code,
          })
          this.store.dispatch('authentication/logout')
        })
        // this.store.dispatch('authentication/logout')
        // updateBus.$emit('showSnackBar', {
        //   show: true,
        //   color: 'error',
        //   icon: 'mdi-debug',
        //   text: `${err}`,
        //   code: err.code,
        // })
        break
      default:
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

  async exists(thisClass, field, obj) {
    var ThisClass = Parse.Object.extend(thisClass),
      query = new Parse.Query(ThisClass)
    query.equalTo(field, obj)
    var exists = await query.first()
    return exists != undefined
  }
  // async getDeviceById(machineId) {
  //   // var deviceId = await store.dispatch('devices/getCurrentDevice')
  //   // var Device = Parse.Object.extend('Device')
  //   var query = ParseQuery.getQuery()
  //   var query = new Parse.Query(Device)
  //   query.equalTo('deviceId', deviceId)
  //   return await query.first()
  // }
  // async registerDevice(machineId) {
  //   var Device = Parse.Object.extend('Device')
  //   var device = new Parse.Object(Device)
  //   return await device.save()
  // }
  async getclasses() {
    try {
      return await Parse.Cloud.run('getLiveQueryList')
    } catch (err) {
      handleParseError(err)
    }
  }
  currentUser() {
    try {
      return Parse.User.current()
    } catch (err) {
      this.handleParseError(err)
    }
  }

  async getParseConfig() {
    try {
      return await Parse.Config.get()
    } catch (err) {
      this.handleParseError(err)
    }
  }
  // async getDeviceById(machineId) {
  //   var Device = Parse.Object.extend('Device')
  //   var query = new Parse.Query(Device)
  //   query.equalTo('deviceId', machineId)
  //   var device = await query.first()
  //   //console.log(device)
  //   return device
  // }
  currentUserProfile() {
    try {
      return Parse.User.current().get('profile')
    } catch (err) {
      this.handleParseError(err)
    }
  }

  // async registerDevice(deviceInfo) {
  //   let Device = Parse.Object.extend('Device')
  //   let device = new Device(deviceInfo)
  //   // let query = CreateQuery.createQuery('Device')
  //   try {
  //     device = await device.save()
  //     return device.toJSON()
  //   } catch (err) {
  //     this.handleParseError(err)
  //   }
  // }

  async loginUser(username, password, machineId) {
    //console.log(username, password, machineId)

    var parseUser
    // var Device = Parse.Object.extend('Device')
    // var query = new Parse.Query(Device)
    // query.equalTo('deviceId', machineId)
    // var device = await query.first()
    // //console.log(device)
    // if (device == undefined) {
    //   // return 404
    // }
    try {
      parseUser = await Parse.User.logIn(username, password, { installationId: machineId })

      // var profile = Parse.User.current().get('profile')
      // parseUser.set('currentDevice', device)
      // this.store.commit('profiles/setUserProfile', profile)
      await ipcRenderer.send('user-login', parseUser.toJSON())
      await parseUser.save()
      return parseUser.toJSON()
    } catch (err) {
      this.handleParseError(err)
    }
  }

  async logoutUser() {
    Parse.User.logOut()
      .then(() => {
        this.store.dispatch('authentication/logout')
      })
      .catch(err => {
        console.log(err)
        // this.handleParseError(err)
      })
  }
  async setUserAvatar(file, form) {
    var parseFile = new Parse.File(file, {
      base64: form.image.currentSrc,
    })
    var Profile = Parse.Object.extend('Profile')
    var query = new Parse.Query(Profile)
    var profile = await query.get(Parse.User.current().get('profile').id)
    //console.log(profile)

    try {
      await parseFile.save()
      profile.set('avatar', parseFile)
      await profile.save()
    } catch (err) {
      return this.handleParseError(err)
    }
  }

  async hydrateAll(parseUser) {
    if (!parseUser) return null
    var User = Parse.Object.extend('User')
    var uquery = new Parse.Query(User)
    try {
      var u = await uquery.get(parseUser.objectId)
    } catch (err) {
      return this.handleParseError(err)
    }
    if (!u.isDataAvailable()) {
      await myObject.fetch()
    }
    var profile = u.get('profile')
    // this.hydrateUserProfile(u)
    // this.hydrateProfiles()
    this.hydrateUsers()
    this.hydrateTimesheetsByUser(profile)
    this.hydrateCalls()
    this.startListening()
  }

  async startListening() {
    const sessionToken = await (await Parse.Session.current()).get('sessionToken')
    const liveQueryList = await Parse.Cloud.run('getLiveQueryList')
    // //console.log(JSON.parse(liveQueryList).classNames)
    for (var schema of JSON.parse(liveQueryList).classNames) {
      // //console.log(schema, sessionToken)
      let query = new Parse.Query(schema)
      // let subscription = this.client.subscribe(query, sessionToken)
      try {
        let subscription = await query.subscribe()
        subscription.on('update', (object, original) => {
          //console.log('update', schema)
          if (object.className == 'Profile' && object.id == Parse.User.current().get('profile').id) {
            //console.log('setting user profile')
            this.store.commit('profiles/setUserProfile', object.toJSON())
            this.store.commit('profiles/updateProfile', object.toJSON())
          }
          if (object.className == 'Profile' && object.id != Parse.User.current().get('profile').id) {
            //console.log('setting profile')
            this.store.commit('profiles/updateProfile', object.toJSON())
          }
          if (object.className == 'Timesheet') {
            //console.log('updating timesheet', object)
            this.store.commit('timesheets/updateTimesheet', object.toJSON())
          }
        })
        subscription.on('create', object => {
          //console.log('created ', object)
          if (object.className == 'Timesheet') {
            this.store.commit('timesheets/addTimesheet', object.toJSON())
          }
        })
      } catch (err) {
        return this.handleParseError(err)
      }
    }
    return null
  }

  // async hydrateUserProfile(u) {
  //   const query = new Parse.Query('Profile')
  //   query.equalTo('username', u.get('username'))
  //   try {
  //     var _profile = await query.first()
  //     await _profile.unPin()
  //     await _profile.pinWithName('UserProfile')
  //     const profile = _profile.toJSON()
  //     return this.store.commit('profiles/setUserProfile', profile)
  //   } catch (err) {
  //     console.error(err)
  //     return this.handleParseError(err)
  //   }
  // }

  async createTimesheetForCurrentProfile() {
    var d = this.currentDevice

    await Parse.Cloud.run('clock-user', {
      username: 'admin',
    })
  }
  async hydrateUsers() {
    const query = new Parse.Query('User')
    query.limit(200)
    var _profiles
    try {
      _profiles = await query.find()
      await Parse.Object.unPinAllObjectsWithName('User')
      await Parse.Object.pinAllWithName('User', _profiles)
      const profiles = _profiles.map(profile => profile.toJSON())
      this.store.commit('profiles/removeAllProfiles')
      this.store.commit('profiles/addProfiles', profiles)
      // const squery = new Parse.Query('Profile')
      // let subscription = await client.subscribe(squery, )
      // subscription.on('update', (object, original) => {
      //   //console.log('update')
      // })
    } catch (err) {
      console.error(err)
      return this.handleParseError(err)
    }
  }

  async changeCurrentProfile(_profile, payload) {
    // const params = { id: Parse.User.current().id, payload: payload }
    // try {
    //   const ratings = await Parse.Cloud.run('updateUser', params)
    // } catch (err) {
    //   return this.handleParseError(err)
    // }
    const query = new Parse.Query('Profile')
    var profile = await query.get(_profile.objectId)
    // //console.log(profile)
    profile.set(payload.field, payload.value)
    try {
      await profile.save()
    } catch (err) {
      console.error(err)
      return this.handleParseError(err)
    }
  }

  async hydrateTimesheetsByUser(profile) {
    const query = new Parse.Query('Timesheet')
    query.descending('startTimestamp')
    query.equalTo('profile', profile)
    query.limit(100)
    var _sheets
    try {
      _sheets = await query.find()

      await Parse.Object.unPinAllObjectsWithName('UsersTimesheets')
      await Parse.Object.pinAllWithName('UsersTimesheets', _sheets)
      const sheets = _sheets.map(sheet => sheet.toJSON())

      this.store.commit('timesheets/removeAllTimesheetsByProfileId', profile.id)
      this.store.commit('timesheets/addTimesheets', sheets)
    } catch (err) {
      console.error(err)
      return this.handleParseError(err)
    }
  }

  async hydrateCalls() {
    try {
      var query = new Parse.Query('Callrecord')
      query.descending('startTime')
      // query.equalTo('employee', parseUser.id)
      query.limit(500)

      var _callrecords = await query.find()

      await Parse.Object.unPinAllObjectsWithName('Callrecords')
      await Parse.Object.pinAllWithName('Callrecords', _callrecords)
      const callrecords = _callrecords.map(callrecord => callrecord.toJSON())
      this.store.commit('callrecords/removeAllCallrecords')
      this.store.commit('callrecords/addCallrecords', callrecords)
    } catch (err) {
      console.error(err)
      return this.handleParseError(err)
    }
  }

  cloneToParseObject(sourceObject, parseObject) {
    Object.keys(sourceObject).forEach(key => {
      parseObject.set(key, sourceObject[key])
    })
  }
  saveTask(task) {
    let taskObj = new Task(task)
    taskObj.set('user', Parse.User.current()) // relate user
    return taskObj.save()
  }

  updateTask(task) {
    const taskQuery = new Parse.Query(Task)
    taskQuery.equalTo('user', Parse.User.current())
    taskQuery.equalTo('uuid', task.uuid)
    return taskQuery.find().then(res => {
      const obj = res[0]
      if (obj) {
        cloneToParseObject(task, obj)
        return obj.save()
      } else {
        // create new object if not exit.
        return saveTask(task)
      }
    })
  }
  getBackupTime() {
    const user = Parse.User.current()
    const userQuery = new Parse.Query(Parse.User)
    const taskQuery = new Parse.Query(Task)
    if (user) {
      userQuery.equalTo('objectId', user.get('objectId'))
      return taskQuery.find().then(res => {
        const obj = res[0]
        if (obj) {
          return Promise.resolve(obj.backupTime)
        }
      })
    } else {
      return Promise.reject('parse user unavailable.')
    }
  }
  setBackupTime(time) {
    const user = Parse.User.current()
    if (user) {
      user.set('backupTime', time)
      return user.save()
    } else {
      return Promise.reject('parse user unavailable.')
    }
  }
  fetchFromServer(backupTime) {
    const projectQuery = new Parse.Query(Project)
    const taskQuery = new Parse.Query(Task)
    const user = Parse.User.current()
    projectQuery.equalTo('user', user)
    taskQuery.equalTo('user', user)
    if (backupTime) {
      projectQuery.greaterThan('updateTime', backupTime)
      taskQuery.greaterThan('updateTime', backupTime)
    }
    return Promise.all([projectQuery.find(), taskQuery.find()]).then(values => {
      const projects = []
      const tasks = []
      values[0].forEach(p => {
        // projects.push(parseObjectToObject(p))
        projects.push(p.toJSON())
      })
      values[1].forEach(t => {
        // tasks.push(parseObjectToObject(t))
        tasks.push(t.toJSON())
      })
      // //console.log(projects,tasks)
      return Promise.resolve({ projects: projects, tasks: tasks })
    })
  }
  //@ts-ignore
  // window.fetchFromServer = fetchFromServer;
  pushToServer(projects, tasks, newBackupTime) {
    return Parse.Cloud.run('batch-synchronize', {
      projects: projects,
      tasks: tasks,
      newBackupTime: newBackupTime || moment().format(),
    })
  }
}
