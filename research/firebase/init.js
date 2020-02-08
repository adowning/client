import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
var firebaseConfig = {
  apiKey: 'AIzaSyDpphkFacb-a_vtf0WGEQHkiKcJh2jJVfg',
  authDomain: 'asdf123-1537543048053.firebaseapp.com',
  databaseURL: 'https://asdf123-1537543048053.firebaseio.com',
  projectId: 'asdf123-1537543048053',
  storageBucket: 'asdf123-1537543048053.appspot.com',
  messagingSenderId: '368973798321',
  appId: '1:368973798321:web:8066c7360e0b7bcd787b90',
  measurementId: 'G-NG19H0KT6S',
}
// var db = firebase.firestore()
// console.log(db)
firebase.initializeApp(firebaseConfig)
// import * as firebase from 'firebase'

// const config = {
//   apiKey: 'AIzaSyDpphkFacb-a_vtf0WGEQHkiKcJh2jJVfg',
//   authDomain: 'asdf123-1537543048053.firebaseapp.com',
//   databaseURL: 'https://asdf123-1537543048053.firebaseio.com',
//   projectId: 'asdf123-1537543048053',
//   storageBucket: 'asdf123-1537543048053.appspot.com',
//   messagingSenderId: '368973798321',
//   appId: '1:368973798321:web:8066c7360e0b7bcd787b90',
//   measurementId: 'G-NG19H0KT6S',
// }

// firebase.initializeApp(config)

// const database = firebase.database()
// const githubAuthProvider = new firebase.auth.GithubAuthProvider()

// export { firebase, githubAuthProvider, database as default }
