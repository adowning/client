import axios from 'axios'
const baseUrl = 'https://api.onsip.com/api'
const moment = require('moment')
import { Sdr2Callrecord, setProfiles, setCustomers, fetchSdrs } from '@/api'
var tokenUrl =
  'https://www.jnctn.com/restapi?Output=json&Action=SessionCreate&Username=ash@andrewsgroup.onsip.com&Password=Sugarlips42!'
var sessionId = ''

async function setSessionId(context) {
  const token = await axios.get(tokenUrl).then(
    function(httpResponse) {
      sessionId = httpResponse.data.Response.Context.Session.SessionId
      return httpResponse.data.Response.Context.Session.SessionId
    },
    function(httpResponse) {
      console.error('Request failed with response code ' + httpResponse.status)
    },
  )
  // context.commit(MUTATIONS.setSessionId, token)
  return token
}

export const GETTERS = {
  getCallrecords: 'getCallrecords',
  getSessionId: 'getSessionId',
}

export const MUTATIONS = {
  setCallrecords: 'setCallrecords',
  setSessionId: 'setSessionId',
}

export const ACTIONS = {
  setCallrecords: 'setCallrecords',
  setSessionId: 'setSessionId',
}

export default {
  state: {
    callrecords: [],
  },
  actions: {
    async [ACTIONS.setSessionId](context) {
      var token = context.getters.getSessionId
      if (token == undefined) {
        ;('having to fetch sessionId')
        token = await setSessionId()
        return context.commit(MUTATIONS.setSessionId, token)
      }
      return context.commit(MUTATIONS.setSessionId, token)
    },
    async [ACTIONS.setCallrecords](context) {
      let records = await fetchSdrs(context, null)
      var customers = context.getters.getCustomers

      await setProfiles(context)
      await setCustomers(customers)

      var start = new Date().valueOf()
      var finalRecords = []
      records.forEach(record => {
        var _callrecord = Sdr2Callrecord(record)
        finalRecords.push(_callrecord)
      })

      context.commit(MUTATIONS.setCallrecords, finalRecords)
    },
  },
  getters: {
    [GETTERS.getCallrecords]: state => {
      return state.callrecords
    },
    [GETTERS.getSessionId]: state => {
      return state.sessionId
    },
  },
  mutations: {
    [MUTATIONS.setSessionId](state, sessionId) {
      state.sessionId = sessionId
    },
    [MUTATIONS.setCallrecords](state, callrecords) {
      state.callrecords = callrecords
    },
  },
}
