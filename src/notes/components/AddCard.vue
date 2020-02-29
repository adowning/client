<template>
  <div class="add-card">
    <v-text-field
      outlined
      v-if="noteType === 'none'"
      :color="bgcolor"
      @focus="addNote"
      label="Add note..."
      single-line
      solo
    >
      <div slot="append">
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="addList" icon>
          <v-icon>mdi-format-list-checkbox</v-icon>
        </v-btn>
        <v-btn color="grey" @click="addImage" icon>
          <v-icon>image</v-icon>
        </v-btn>
        <v-btn icon color="grey">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
      </div>
    </v-text-field>
    <v-card class="mb-4" :color="bgcolor" v-if="noteType === 'note'" outlined>
      <div class="fix-container">
        <v-btn @click="flexChange" small icon>
          <v-icon small :color="note.isFlex ? 'blue' : 'grey'">mdi-pin</v-icon>
        </v-btn>
      </div>
      <v-card-title style="padding-top: 0px; padding-bottom: 0px;" primary-title>
        <v-layout align-start row wrap>
          <v-flex xs12>
            <v-text-field autofocus textfull-width v-model="note.noteTitle" label="title" single-line solo>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text style="padding-top: 0px;padding-bottom: 0px;">
        <v-textarea
          full-width
          auto-grow
          flat
          :background-color="bgcolor"
          solo
          name="input-7-4"
          placeholder="Add Note..."
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
        <v-tooltip bottom>
          <v-btn @mouseenter="enter" @mouseleave="leave" slot="activator" small icon>
            <div v-if="show" class="color-selector white">
              <div
                @click="colorCheck(item)"
                :key="index"
                v-for="(item, index) of colorList"
                :class="['selector-item', item.color]"
              >
                <v-icon v-if="item.isCheck">mdi-check</v-icon>
              </div>
            </div>
            <v-icon small color="grey">mdi-palette</v-icon>
          </v-btn>
          Change color
        </v-tooltip>
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
        <v-btn @click="close" small color="grey">cancel</v-btn>
      </v-card-actions>
    </v-card>
    <v-card :color="bgcolor" v-if="noteType === 'list'">
      <div class="fix-container">
        <v-btn small icon>
          <v-icon small color="blue">mdi-pin</v-icon>
        </v-btn>
      </div>
      <v-card-title primary-title>
        <v-layout align-start row wrap>
          <v-flex xs12>
            <v-text-field autofocus textfull-width v-model="note.noteTitle" label="title" single-line solo>
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <DragList />
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-btn small icon>
          <v-icon small color="grey">mdi-reminder</v-icon>
        </v-btn>
        <v-btn small icon>
          <v-icon small color="grey">mdi-account-plus</v-icon>
        </v-btn>
        <v-tooltip bottom>
          <v-btn @mouseenter="enter" @mouseleave="leave" slot="activator" small icon>
            <div v-if="show" class="color-selector white">
              <div
                @click="colorCheck(item)"
                :key="index"
                v-for="(item, index) of colorList"
                :class="['selector-item', item.color]"
              >
                <v-icon v-if="item.isCheck">mdi-check</v-icon>
              </div>
            </div>
            <v-icon small color="grey">mdi-palette</v-icon>
          </v-btn>
          Change color
        </v-tooltip>
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
        <v-btn @click="close" small textcolor="grey">cancel</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ColorSelector from './ColorSelector'
import DragList from './DragList'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'add-card',
  components: {
    // ColorSelector,
    DragList,
  },
  data() {
    return {
      noteType: 'none', // none | list | note | image | pen
      note: {
        noteTitle: '',
        noteContent: '',
        isFlex: false,
      },
      show: false,
      bgcolor: 'white',
      colorList: [
        {
          id: 1,
          isCheck: true,
          color: 'white',
        },
        {
          id: 2,
          isCheck: false,
          color: 'red accent-1',
        },
        {
          id: 3,
          isCheck: false,
          color: 'orange accent-1',
        },
        {
          id: 4,
          isCheck: false,
          color: 'yellow accent-1',
        },
        {
          id: 5,
          isCheck: false,
          color: 'green accent-1',
        },
        {
          id: 6,
          isCheck: false,
          color: 'light-blue accent-1',
        },
        {
          id: 7,
          isCheck: false,
          color: 'blue lighten-1',
        },
        {
          id: 8,
          isCheck: false,
          color: 'indigo accent-2',
        },
        {
          id: 9,
          isCheck: false,
          color: 'deep-purple accent-2',
        },
        {
          id: 10,
          isCheck: false,
          color: 'pink lighten-2',
        },
        {
          id: 11,
          isCheck: false,
          color: 'grey lighten-1',
        },
        {
          id: 11,
          isCheck: false,
          color: 'blue-grey lighten-4',
        },
      ],
    }
  },
  methods: {
    addNote(val) {
      this.noteType = 'note'
    },
    close() {
      this.noteType = 'none'
      this.saveNote()
    },
    saveNote() {
      let note = {
        noteTitle: this.note.noteTitle,
        noteContent: this.note.noteContent,
        width: 300,
        height: 400,
        id: Number(new Date()),
        color: this.bgcolor,
        tableName: 'Note',
        isFlex: this.isFlex,
      }
      if (this.note.noteTitle || this.note.noteContent) {
        ipcRenderer.send('addNote', note)
        this.$store.commit('addNote', note)
        this.note.noteTitle = ''
        this.note.noteContent = ''
      }
    },
    enter() {
      console.log('mouse over')
      let me = this
      setTimeout(function() {
        me.show = true
      }, 200)
    },
    leave() {
      console.log('鼠标移出了')
      let me = this
      setTimeout(function() {
        me.show = false
      }, 200)
    },
    colorCheck(item) {
      for (let i = 0; i < this.colorList.length; i++) {
        if (this.colorList[i].color === item.color) {
          this.colorList[i].isCheck = true
          this.bgcolor = item.color
        } else {
          this.colorList[i].isCheck = false
        }
      }
    },
    flexChange() {
      this.note.isFlex = !this.note.isFlex
    },
    addList() {
      this.noteType = 'list'
    },
    addImage() {
      this.noteType = 'image'
    },
  },
}
</script>

<style scoped>
@media screen and (min-width: 870px) {
  .add-card {
    width: 600px;
    position: relative;
    margin: 32px auto 16px auto;
  }
}
@media screen and (max-width: 870px) {
  .add-card {
    width: 496px;
    position: relative;
    margin: 32px auto 16px auto;
  }
}
@media screen and (max-width: 600px) {
  .add-card {
    width: 100%;
    position: relative;
    margin: 32px auto 16px auto;
  }
}
.color-selector {
  width: 160px;
  height: 120px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 25px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  transition: visibility 0s ease 0ms, opacity 0.218s linear;
}
.selector-item {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  border: 2px solid transparent;
}
.selector-item:hover {
  border: 2px solid grey !important;
}
.fix-container {
  position: absolute;
  right: 0;
  z-index: 1;
}
</style>
