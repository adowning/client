<template>
  <v-card :color="noteDetail.color" :id="noteDetail.id" ref="notecard" hover active-class="noteDisabled noteActive">
    <div @click="deleteNote" class="close-container">
      <v-icon small color="grey">mdi-close</v-icon>
    </div>
    <div class="fix-container">
      <v-btn @click="updateIsFlex" small icon>
        <v-icon small :color="noteDetail.isFlex ? 'blue' : 'grey'">mdi-pin</v-icon>
      </v-btn>
    </div>
    <v-card-title @click="noteClick">
      <div class="headline">{{ noteDetail.noteTitle }}</div>
    </v-card-title>
    <v-card-text>
      <div>{{ noteDetail.noteContent }}</div>
    </v-card-text>
    <v-card-actions>
      <NoteCardActions :note="noteDetail" @updateNote="updateNote"></NoteCardActions>
    </v-card-actions>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title primary-title>
          <v-layout align-start row wrap>
            <v-flex xs12>
              <v-text-field autofocus textfull-width v-model="note.noteTitle" label="title" single-line solo>
                <div slot="append">
                  <v-spacer></v-spacer>

                  <v-btn small icon>
                    <v-icon small color="grey">mdi-pin</v-icon>
                  </v-btn>
                </div>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-textarea
            full-width
            auto-grow
            textsolo
            name="input-7-4"
            placeholder="Add note..."
            label="Solo textarea"
            v-model="note.noteContent"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn small icon>
            <v-icon small color="grey">mdi-reminder</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-account-plus</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-palette</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">image</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-package-down</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-dots-vertical</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-undo</v-icon>
          </v-btn>
          <v-btn small icon>
            <v-icon small color="grey">mdi-redo</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="close" small textcolor="grey">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import NoteCardActions from './NoteCardActions'
let { ipcRenderer } = window.require('electron')

export default {
  name: 'note-card',
  components: {
    NoteCardActions,
  },
  props: {
    noteDetail: {
      type: Object,
      required: false,
      default: function() {
        return {
          noteTitle: 'note title',
          noteContent: 'note content',
          color: 'white',
        }
      },
    },
  },
  data() {
    return {
      card: { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      dialog: false,
      note: {},
    }
  },
  mounted() {
    let me = this
    me.updateNoteSize()
    window.onresize = function() {
      setTimeout(function() {
        me.updateNoteSize()
      }, 1000)
    }
  },
  computed: {
    noteWidth() {
      let me = this
      let refid = this._props.noteDetail.id
      return 400
    },
    noteHeight() {
      let me = this
      let refid = this._props.noteDetail.id
      return 400
    },
  },
  methods: {
    noteClick() {
      this.dialog = true
    },
    deleteNote() {
      // 删除note
      this.$store.commit('deleteNote', this._props.noteDetail)
      ipcRenderer.send('deleteNote', this._props.noteDetail)
      // 发送系统消息
      // const notification = {
      //   title: '基本通知',
      //   body: '短消息部分'
      // }
      // const myNotification = new window.Notification(notification.title, notification)
      // myNotification.onclick = () => {
      //   console.log('Notification clicked')
      // }
    },
    close() {
      this.dialog = false
    },
    getNoteWidth() {
      let me = this
      let width = window.getComputedStyle(document.getElementById(me.noteDetail.id)).width
      return parseInt(width.substring(0, width.length - 2))
    },
    getNoteHeight() {
      let me = this
      let height = window.getComputedStyle(document.getElementById(me.noteDetail.id)).height
      return parseInt(height.substring(0, height.length - 2))
    },
    updateNoteSize() {
      let me = this
      // console.log(this.getNoteWidth(), this.getNoteHeight())
      // 开始更行vuex中对应的数据
      let noteList = me.$store.state.noteList
      for (let i = 0; i < noteList.length; i++) {
        if (noteList[i].id === me._props.noteDetail.id) {
          noteList[i].width = me.getNoteWidth() ? me.getNoteWidth() : 300
          noteList[i].height = me.getNoteHeight() ? me.getNoteHeight() : 400
        }
      }
      me.$store.commit('setNoteList', noteList)
    },
    updateNote(note) {
      this.$store.commit('updateNote', note)
      ipcRenderer.send('updateNote', note)
    },
    updateIsFlex() {
      let note = this._props.noteDetail
      note.isFlex = !note.isFlex
      this.$store.commit('updateNote', note)
      // TODO 通知后台修改数据库
      ipcRenderer.send('updateNote', note)
    },
  },
}
</script>

<style scoped>
.v-card__title {
  padding-bottom: 0px;
}
.close-container {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  text-align: center;
  border-radius: 14px !important;
  line-height: 28px;
  margin-top: -10px;
  margin-left: -10px;
  background-color: white;
}
.fix-container {
  position: fixed;
  right: 0px;
}
.noteDisabled {
  display: block;
}
.noteDisabled .v-card__actions {
  visibility: visible;
}
.noteActive {
  display: block;
}
.noteActive .v-card__actions {
  visibility: hidden;
}
.headline {
  font-family: 'Roboto Condensed', arial, sans-serif;
  font-size: 17px;
  font-weight: bold;
  line-height: 23px;
  min-height: 38px;
}
</style>
