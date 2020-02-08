'use strict'
import { machineId, machineIdSync } from 'node-machine-id'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
let win
let workerWin
let createdAppProtocol = false
let mapWin

async function getMachineId() {
  let id = await machineId()
  return id
}

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

function createWindow() {
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
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    // closing the main (visible) window should quit the App
    app.quit()
  })
}

function createWorker(devPath, prodPath) {
  // create hidden worker window
  workerWin = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    workerWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    if (!process.env.IS_TEST) workerWin.webContents.openDevTools()
  } else {
    workerWin.loadURL(`app://./${prodPath}`)
  }

  workerWin.on('closed', () => {
    workerWin = null
  })
}

function sendWindowMessage(targetWindow, message, payload) {
  if (typeof targetWindow === 'undefined') {
    console.log('Target window does not exist')
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

  // create the main application window
  createWindow()

  // create the background worker window
  createWorker('worker', 'worker.html')
  createMapWindow('maps', 'maps.html')

  ipcMain.on('window-message-from-worker', (event, arg) => {
    console.log('got msg')
    sendWindowMessage(win, 'message-from-worker', arg)
  })
  ipcMain.on('get-machine-id', async (event, arg) => {
    console.log('get-machine-id')
    var machineId = await getMachineId()

    sendWindowMessage(win, 'get-machine-id', machineId)
  })
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
