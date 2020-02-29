'use strict'
import { machineId, machineIdSync } from 'node-machine-id'
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')
// const fetch = require('node-fetch')
import fetch from 'node-fetch'
import { app, protocol, Notification, BrowserWindow, BrowserView, ipcMain } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const gotTheLock = app.requestSingleInstanceLock()
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.argv.includes('--debug')
import Parse from 'parse/node'
let currentUser
let _machineId
let win
let notesWin
let createdAppProtocol = false
let mapWin
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

// fetch(process.env.VUE_APP_PARSE_SERVER_URL + '/health')
//   .then(res => res.json())
//   .then(json => console.log(json))

Parse.initialize(
  process.env.VUE_APP_PARSE_SERVER_APPLICATION_ID,
  undefined,
  process.env.VUE_APP_PARSE_SERVER_JAVASCRIPT_KEY,
)
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL
Parse.enableLocalDatastore()
Parse.User.enableUnsafeCurrentUser()
console.log(process.env.VUE_APP_PARSE_SERVER_URL)
console.log(Parse.User.current())
;(async function() {
  // targetWindow.webContents.send(message, payload)
})()

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

async function getMachineId() {
  _machineId = await machineId()
  console.log(_machineId)
  return _machineId
}

function sendStatusToWindow(text) {
  log.info(text)
  win.webContents.send('message', text)
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', err => {
  sendStatusToWindow('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', progressObj => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  sendStatusToWindow(log_message)
})
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded')
})
// protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      corsEnabled: true,
      supportFetchAPI: true,
    },
  },
])

// only allow single instance of application
if (!isDev) {
  if (gotTheLock) {
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow && mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    })
  } else {
    app.quit()
    process.exit(0)
  }
} else {
  // require('electron-debug')({
  //   showDevTools: !(process.env.RENDERER_REMOTE_DEBUGGING === 'true'),
  // })
}
function createMapWindow(devPath, prodPath) {
  // create hidden worker window
  mapWin = new BrowserWindow({
    width: 1200,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  let view = new BrowserView()
  mapWin.setBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  view.webContents.loadURL('https://electronjs.org')

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    mapWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    if (!process.env.IS_TEST) mapWin.webContents.openDevTools()
  } else {
    mapWin.loadURL(`app://./${prodPath}`)
  }

  mapWin.on('closed', () => {
    mapWin = null
  })
}

async function createWindow(devPath, prodPath) {
  // create the game UI window
  win = new BrowserWindow({
    width: 2400,
    height: 790,
    fullscreen: false,
    autoHideMenuBar: true,
    kiosk: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  })
  // let view = new BrowserView({ show: false })
  // win.setBrowserView(view)
  // view.setBounds({ x: 48, y: 0, width: 2352, height: 790 })
  // view.webContents.loadURL('https://electronjs.org')

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // view.webContents.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    await win.loadURL('app://./index.html')
    // notesWin.loadURL(`app://./${prodPath}`)
    // view.webContents.loadURL(`app://./${prodPath}`)
  }
  await getMachineId()
  await Parse.User.logIn('asdf', 'asdf')
  console.log(_machineId)
  var query = new Parse.Query('Device')
  query.equalTo('deviceId', _machineId)
  var device = await query.first()
  console.log(device)
  console.log(Parse.User.current().toJSON())
  currentUser = Parse.User.current().toJSON()

  sendWindowMessage(win, 'set-user', currentUser)
  win.on('closed', () => {
    // closing the main (visible) window should quit the App
    app.quit()
  })
}

function createNotes(devPath, prodPath) {
  // create hidden notesWin window
  notesWin = new BrowserWindow({
    width: 1200,
    height: 750,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    notesWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    if (!process.env.IS_TEST) notesWin.webContents.openDevTools()
  } else {
    notesWin.loadURL(`app://./${prodPath}`)
  }

  notesWin.on('closed', () => {
    notesWin = null
  })
}

function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === 'undefined') {
    //console.log('Target window does not exist')
    return
  }

  targetWindow.webContents.send(message, payload)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  // create the main application window
  createWindow('notes', 'notes.html')

  // create the background worker window
  // createNotes('notes', 'notes.html')
  // createMapWindow('maps', 'maps.html')
  autoUpdater.checkForUpdatesAndNotify()
  ipcMain.on('notification', (event, arg) => {
    //console.log('got msg')
    var notification = new Notification({ title: 'asdf', body: arg.message })
    notification.show()
  })
  ipcMain.on('window-message-from-worker', (event, arg) => {
    //console.log('got msg')
    sendWindowMessage(win, 'message-from-worker', arg)
  })
  ipcMain.handle('get-machine-id', async (event, arg) => {
    //console.log('get-machine-id')
    var machineId = await getMachineId()
    return machineId
    // event.reply(machineId)
    // sendWindowMessage(win, 'get-machine-id', machineId)
  })
  ipcMain.on('get-user', async (event, arg) => {
    console.log('arg')
    sendWindowMessage(win, 'get-user', currentUser)
  })
  ipcMain.on('user-login', async (event, arg) => {
    console.log('arg')
    _currentUser = arg
  })
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  if (!createdAppProtocol) {
    createProtocol('app')
    createdAppProtocol = true
  }

  win.webContents.openDevTools()
})
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
// ipcMain.on('notification', (event, arg) => {
//   //console.log('got msg')
//   var notification = new Notification({ title: arg.title, body: arg.message })
//   notification.show()
// })
