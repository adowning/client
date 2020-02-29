import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 初始化state
const state = {
  noteList: new Array(),
  labelList: new Array(),
  listType: 'mdi-view-stream',
}
export default new Vuex.Store({
  state: state,
  mutations: {
    changeListType(state, listType) {
      if (listType === 'mdi-view-stream') {
        state.listType = 'mdi-view-dashboard-variant'
      } else {
        state.listType = 'mdi-view-stream'
      }
    },
    setNoteList(state, noteList) {
      state.noteList = noteList
    },
    addNote(state, note) {
      state.noteList.push(note)
    },
    updateNote(state, note) {
      let temp
      temp = state.noteList.filter(function(item) {
        if (item.id === note.id) {
          return note
        } else {
          return item
        }
      })
      state.noteList = temp
    },
    deleteNote(state, note) {
      // TODO 此处的算法需要优化
      let temp
      temp = state.noteList.filter(item => item.id !== note.id)
      state.noteList = temp
    },
    setLabelList(state, labelList) {
      state.labelList = labelList
    },
    addLabel(state, label) {
      state.labelList.push(label)
    },
    updateLabel(state, label) {
      let temp
      temp = state.labelList.filter(function(item) {
        if (item.id === label.id) {
          return label
        } else {
          return item
        }
      })
      state.labelList = temp
    },
    deleteLabel(state, label) {
      // TODO 此处的算法需要优化
      let temp
      temp = state.labelList.filter(item => item.id !== label.id)
      state.labelList = temp
    },
  },
  actions: {},
})
