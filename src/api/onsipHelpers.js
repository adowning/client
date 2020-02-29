import Parse from 'parse'
// import Fuse from 'fuse.js'
// import { storage } from '@/utils/firebase'
import onsipHelpers from './onsipHelpers'
const camelcaseKeys = require('camelcase-keys')
import moment from 'moment'
import axios from 'axios'
const baseUrl = 'https://api.onsip.com/api'

var customers
var sessionId
var profiles
var tokenUrl =
  'https://www.jnctn.com/restapi?Output=json&Action=SessionCreate&Username=ash@andrewsgroup.onsip.com&Password=Sugarlips42!'
async function setSessionId() {
  const token = await axios.get(tokenUrl).then(
    function(httpResponse) {
      sessionId = httpResponse.data.Response.Context.Session.SessionId
      // //console.log(httpResponse.data.Response.Context.Session.SessionId)
      return httpResponse.data.Response.Context.Session.SessionId
    },
    function(httpResponse) {
      console.error('Request failed with response code ' + httpResponse.status)
    },
  )
  sessionId = token
  return token
}

export async function fetchSdrs(start, end) {
  if (sessionId == undefined) {
    sessionId = await setSessionId()
  }
  return await axios.post(
    `${baseUrl}?Output=json&Action=SdrBrowse&SessionId=${sessionId}&StartDateTime=${start}&EndDateTime=${end}&Limit=999`,
  )
}
export async function downloadRecording(activity) {
  // Create a reference to the file we want to download
  // storage
  //   .refFromURL(
  //     'https://firebasestorage.googleapis.com/v0/b/phonerecs/o/' +
  //       activity.recordingLocation
  //   )
  //   .getDownloadURL()
  //   .then(async function(url) {
  //     axios({
  //       url: url,
  //       method: 'GET',
  //       responseType: 'blob' // important
  //     }).then(response => {
  //       const url = window.URL.createObjectURL(new Blob([response.data]))
  //       const link = document.createElement('a')
  //       link.href = url
  //       link.setAttribute('download', 'asdf.wav')
  //       document.body.appendChild(link)
  //       link.click()
  //     })

  //     //do axios thing here
  //   })
  // await axios.get(
  //   'https://firebasestorage.googleapis.com/v0/b/phonerecs/o/Call Recording/2019/12/17/2019-12-17_17-26-09_mark_18176623722.wav'
  // )

  // var recordingRef = storage.ref('phonerecs/' + activity.recordingLocation)
  //firebasestorage.googleapis.com/v0/b/asdf123-1537543048053.appspot.com/o/Call%20Recording%2F2020%2F01%2F21%2F2020-01-21_11-47-35_john.c_19034298984.wav
  // Get the download URL
  //https://firebasestorage.googleapis.com/v0/b/asdf123-1537543048053.appspot.com/o/phonerecs%2FCall%20Recording%2F2020%2F01%2F21%2F2020-01-21_11-47-35_john.c_19034298984.wav
  //2020-01-21_17-47-35_john.c_19034298984.wav
  // recordingRef
  //   .getDownloadURL()
  //   .then(async function(url) {
  // Insert url into an <img> tag to "download"
  //   var xhr = new XMLHttpRequest();
  // xhr.responseType = 'blob';
  // xhr.onload = function(event) {
  //   var blob = xhr.response;
  // };
  // xhr.open('GET', url);
  // xhr.send();
  return await axios
    .get(
      'https://firebasestorage.googleapis.com/v0/b/phonerecs/o/Call%20Recording%2F2019%2F12%2F17%2F2019-12-17_17-26-09_mark_18176623722.wav?alt=media&token=',
    )
    // })
    .catch(function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break

        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break

        case 'storage/canceled':
          // User canceled the upload
          break

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break
      }
    })
}
function buildFilename(direction, employeeName, date, phoneNumber) {
  //gs://phonerecs/Call Recording/2019/12/17/2019-12-17_17-26-09_mark_18176623722.wav
  //https://storage.cloud.google.com/phonerecs/Call%20Recording/2019/12/17/2019-12-17_17-26-09_mark_18176623722.wav?authuser=0
  var url = ''
  if (direction == 'incoming') {
    // url = `gs://phonerecs/Call Recording/${date.year}/${date.month}/${date.day}/${date.year}-${date.month}-${date.year}_${date.hour}-${date.minute}-${date.second}_${employeeName}_${phoneNumber}.wav`
    url = `Call Recording/${moment(date).format('YYYY/MM/DD/YYYY-MM-DD_HH-mm-ss')}_${employeeName}_${phoneNumber}.wav`
  } else {
    url = `Call Recording/${moment(date).format('YYYY/MM/DD/YYYY-MM-DD_HH-mm-ss')}_${phoneNumber}_${employeeName}.wav`
  }
  // //console.log(url)
  return url
}

export async function setProfiles(context) {
  //console.log(context.rootState.User)
  profiles = context.rootState.User.employeeProfiles
}
export function setCustomers(_customers) {
  customers = _customers
}
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length)
}

export function setup() {
  customers, profiles
}

export function convert(callrecords) {
  var results = []
  for (var customer in customers) {
    if (customer.phone1.substr(customer.phone1.length - 7) == last4) {
      c = customer
    }
    if (customer.phone2 != undefined) {
      if (customer.phone2.substr(customer.phone2.length - 7) == last4) {
        c = customer
      }
    }
    if (customer.phone3 != undefined) {
      if (customer.phone3.substr(customer.phone3.length - 7) == last4) {
        c = customer
      }
    }
  }
}
export function Sdr2Callrecord(sdr) {
  if (profiles.length < 1) {
    setupProfiles()
  }
  sdr.startTimestamp = Date.parse(sdr.StartTime).valueOf()
  sdr.endTimestamp = Date.parse(sdr.EndTime).valueOf()
  if (sdr.CallerAddress.includes('andrewsgroup')) {
    sdr.CallerAddress = sdr.CallerAddress.replace('sip:', '')
    sdr.CallerAddress = sdr.CallerAddress.replace('@andrewsgroup.onsip.com', '')
    sdr.direction = 'outgoing'
    sdr.employee = profiles.filter(p => p.onsipId == sdr.CallerAddress)[0]
    var name = buildFilename(
      'outgoing',
      sdr.employee.onsipId,
      sdr.StartTime,

      sdr.CalleeAddress.substring(4, 15),
    )
    sdr.recordingLocation = name
  } else {
    sdr.CalleeContact = sdr.CalleeContact.toString()
    sdr.CalleeContact = sdr.CalleeContact.replace('sip:', '')
    var n = sdr.CalleeContact.indexOf('*')
    sdr.CalleeContact = sdr.CalleeContact.substring(0, n != -1 ? n : sdr.CalleeContact.length)
    sdr.direction = 'incoming'
    var _profile = profiles.filter(p => p.onsipId == sdr.CalleeContact)[0]
    var _profile
    for (var i = 0; i < profiles.length; i++) {
      var p = profiles[i]
      if (p.onsipId == sdr.CalleeContact) {
        _profile = p
      }
    }

    if (_profile != undefined) {
      sdr.employee = _profile
    } else {
      sdr.employee = null
    }
    var incNumber = sdr.CallerAddress.replace('sip:', '')
    incNumber = incNumber.replace('@jnctn.net', '')
    var raw = incNumber
    incNumber = incNumber.replaceAt(0, ' ')
    // sdr.CallerAddress = incNumber
    sdr.CallerAddress = [incNumber.slice(0, 4), ' ', incNumber.slice(4)].join('')
    var name = null
    if (sdr.employee != null) {
      name = buildFilename(
        'incoming',
        sdr.employee.onsipId,
        sdr.StartTime,

        raw,
      )
      // //console.log(name)
      sdr.recordingLocation = name
    }

    sdr.CallerAddress = [sdr.CallerAddress.slice(0, 8), '-', sdr.CallerAddress.slice(8)].join('')
    incNumber = incNumber.replace(' ', '')
    var c = null
    for (var i = 0; i < customers.length; i++) {
      var customer = customers[i]
      var last4 = incNumber.substr(incNumber.length - 7)
      if (customer.phone1.substr(customer.phone1.length - 7) == last4) {
        c = customer
      }
      if (customer.phone2 != undefined) {
        if (customer.phone2.substr(customer.phone2.length - 7) == last4) {
          c = customer
        }
      }
      if (customer.phone3 != undefined) {
        if (customer.phone3.substr(customer.phone3.length - 7) == last4) {
          c = customer
        }
      }
    }
    if (c != null) {
      sdr.customer = c
    } else {
      // var options = {
      //   keys: ['accountName'],
      //   threshold: 0.2
      // }
      // var f = new Fuse(customers, options)
      // var result = f.search(sdr.CallerDisplay)
      // if (result.length > 0) {
      //   sdr.customer = result
      // }
    }
  }
  sdr = camelcaseKeys(sdr)

  return sdr
}
