import Vue from 'vue'
import path from 'path'
import MapApp from './components/maps/MapApp.vue'
import { PythonShell } from 'python-shell'
const { remote } = window.require('electron')
console.log('My path:', remote.app.getAppPath())

let pyshell = new PythonShell(remote.app.getAppPath() + '/keep.py')

// sends a message to the Python script via stdin
pyshell.send('hello')

pyshell.on('message', function(message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message)
})

// end the input stream and allow the process to exit
pyshell.end(function(err, code, signal) {
  if (err) throw err
  console.log('The exit code was: ' + code)
  console.log('The exit signal was: ' + signal)
  console.log('finished')
  console.log('finished')
})
new Vue({
  render: h => h(MapApp),
}).$mount('#mapApp')
