// import Pushy from 'pushy-electron'
const Pushy = require('pushy-electron')

;(async function() {
  Pushy.register({ appId: '5e3f6f1b74ffaa115ddb215b' })
    .then(function(deviceToken) {
      // Print device token to console
      console.log('Pushy device token: ' + deviceToken)
      // Listen for push notifications
      Pushy.setNotificationListener(data => {
        // Print notification payload data
        let myNotification = new Notification('Title', {
          body: data.message,
        })
        console.log('Received notification: ' + JSON.stringify(data))
        ipcRenderer.send('notification', data)
        myNotification.onclick = () => {
          console.log('Notification clicked')
        }
        // Display an alert with the "message" payload value
        alert('Received notification: ' + data.message)
      })
      // Make sure the device is registered
      if (Pushy.isRegistered()) {
        // Subscribe the device to a topic
        Pushy.subscribe('news')
          .then(() => {
            // Subscribe successful
            console.log('Subscribed to topic successfully')
          })
          .catch(err => {
            // Handle errors
            console.error(err)
          })
      }
    })
    .catch(function(err) {
      // Handle registration errors
      alert('Pushy Error: ' + err.message)
    })
})()

// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // All of the Node.js APIs are available in this process.

// const { ipcRenderer } = require('electron')
// const {
//   START_NOTIFICATION_SERVICE,
//   NOTIFICATION_SERVICE_STARTED,
//   NOTIFICATION_SERVICE_ERROR,
//   NOTIFICATION_RECEIVED,
//   TOKEN_UPDATED,
// } = require('electron-push-receiver/src/constants')

// // Listen for service successfully started
// ipcRenderer.on(NOTIFICATION_SERVICE_STARTED, (_, token) => {
//   console.log('notification setarted')
//   fetch('https://onesignal.com/api/v1/players', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       app_id: 'MWFlOTM0ZjUtY2JhYi00MWVmLTkyMmYtMDNiYTc1NGYyNDkz',
//       identifier: token,
//       device_model: 'Electron',
//       device_type: 1,
//     }),
//   })
//     .then(res => {
//       return res.json()
//     })
//     .then(body => {
//       console.log(body)
//     })
// })

// // Handle notification errors
// ipcRenderer.on(NOTIFICATION_SERVICE_ERROR, (_, error) => {
//   console.log('notification error', error)
// })

// // Send FCM token to backend
// ipcRenderer.on(TOKEN_UPDATED, (_, token) => {
//   console.log('token updated', token)
// })

// // Display notification
// ipcRenderer.on(NOTIFICATION_RECEIVED, (_, serverNotificationPayload) => {
//   // check to see if payload contains a body string, if it doesn't consider it a silent push
//   if (serverNotificationPayload.notification.body) {
//     // payload has a body, so show it to the user
//     console.log('display notification', serverNotificationPayload)
//     let myNotification = new Notification(serverNotificationPayload.notification.title, {
//       body: serverNotificationPayload.notification.body,
//     })

//     myNotification.onclick = () => {
//       console.log('Notification clicked')
//     }
//   } else {
//     // payload has no body, so consider it silent (and just consider the data portion)
//     console.log('do something with the key/value pairs in the data', serverNotificationPayload.data)
//   }
// })

// // Start service
// const senderId = '368973798321' // <-- replace with FCM sender ID from FCM web admin under Settings->Cloud Messaging
// console.log('starting service and registering a client')
// ipcRenderer.send(START_NOTIFICATION_SERVICE, senderId)
