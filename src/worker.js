import Parse from 'parse/node'
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
import store from '@/store/'
let cam
let isRunning = true
let isReady = false
Parse.initialize('AndrewsApp', process.env.VUE_APP_PARSE_MASTERKEY, process.env.VUE_APP_PARSE_MASTERKEY)
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER_URL
Parse.liveQueryServerURL = process.env.VUE_APP_PARSE_SERVER_LIVE_QUERY_URL

import { PythonShell } from 'python-shell'

let initCamera = async (width, height) => {
  cam = document.getElementById('cam')
  cam.width = width
  cam.height = height

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
      width: width,
      height: height,
    },
  })
  cam.srcObject = stream

  return new Promise(resolve => {
    cam.onloadedmetadata = () => {
      resolve(cam)
    }
  })
}

let notifyRenderer = (command, payload) => {
  // notify renderer
  ipcRenderer.send('window-message-from-worker', {
    command: command,
    payload: payload,
  })
}

let onReady = () => {
  PythonShell.run('./util/keep.py', null, function(err) {
    if (err) throw err
    console.log('finished')
  })

  notifyRenderer('test', {})
}

let loadNet = async () => {
  //   let detectionNet = faceapi.nets.ssdMobilenetv1
  //   await detectionNet.load('/data/weights')
  //   await faceapi.loadFaceExpressionModel('/data/weights')

  if (!isReady) {
    isReady = true
    onReady()
  }

  notifyRenderer('test', { stuff: 'stuff' })
  return null
}

loadNet()
  .then(net => {
    //console.log('Network has loaded', process.env.VUE_APP_PARSE_SERVER_URL)
    // return initCamera(640, 480)
    // start()
  })
  .then(video => {
    //console.log('Camera was initialized')
    // detectExpressions()
  })
