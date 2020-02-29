/**
 * Create new user from firebase auth user infos
 */
// eslint-disable-next-line
import moment from 'moment'
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
  const providerData = firebaseAuthUser.providerData[0]
  const { displayName, photoURL, email } = providerData
  const userDb = new UsersDB()
  const user = {
    displayName,
    photoURL,
    email,
  }

  return userDb.create(user, firebaseAuthUser.uid)
}

export const generateUserStats = async store => {
  const user = store.state.authentication.user
  var timesheets = store.state.timesheets.timesheets.filter(function(sheet) {
    return moment(sheet.startTimestamp) > new moment().subtract(30, 'days')
  })
  //console.log(timesheets.length)

  var callrecords = store.state.callrecords.callrecords.filter(function(callrecord) {
    return moment(callrecord.startTimestamp) > new moment().subtract(30, 'days')
  })
  //console.log(callrecords.length)
  var i = 0
  var activities = []
  for (var x = 0; x < 30; x++) {
    var now = moment()
    var day = now.subtract(x, 'days')
    var logToday = false
    timesheets.forEach(sheet => {
      if (now.isSame(sheet.startTime, 'days')) {
        logToday = true
        var start = sheet.startTime
        // //console.log(i++)
        callrecords.forEach(call => {
          //console.log(call, sheet.starTimestamp)
          if (call.starTime < sheet.endTimestamp && call.startTime >= sheet.starTimestamp) {
            activities.add(call)
          }
        })
      }
    })
    if (logToday == true) {
    }
  }
  //console.log(activities.length)
  return activities
}
