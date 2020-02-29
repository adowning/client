<template>
  <div class="add-label-item">
    <v-icon style="line-height: 0.6;" v-if="isBlur" normal>mdi-plus</v-icon>
    <v-icon style="line-height: 0.6;" v-if="isFocus" normal>mdi-close</v-icon>
    <input v-model="value" @focus="inputFocus" @blur="inputBlur" class="add-input" placeholder="创建新标签" type="text">
    <v-icon v-show="isFocus" @click="addLabel" style="line-height: 0.6;" normal>mdi-check</v-icon>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron')

export default {
  name: 'add-label-item',
  data () {
    return {
      isFocus: false,
      isBlur: true,
      value: ''
    }
  },
  methods: {
    inputFocus () {
      console.log('获取到焦点')
      let me = this
      setTimeout(function () {
        me.isFocus = true
        me.isBlur = false
      }, 500)
    },
    inputBlur () {
      console.log('失去焦点')
      let me = this
      setTimeout(function () {
        me.isFocus = false
        me.isBlur = true
      }, 500)
    },
    addLabel () {
      let label = {
        id: Number(new Date()),
        labelName: this.value,
        tableName: 'Label'
      }
      if (this.value) {
        ipcRenderer.send('addLabel', label)
        this.$store.commit('addLabel', label)
        this.value = ''
      }
    }
  }
}
</script>

<style scoped>
.add-label-item {
  width: 100%;
  height: 36px;
  line-height: 36px;
  margin-bottom: 10px;
}
.add-input {
  height: 36px;
  margin: 0 10px;
  width: 200px;
  line-height: 36px;
  border-bottom: 1px solid transparent;
}
.add-input:focus {
  border: none;
  border-bottom: 1px solid grey;
  outline-color: transparent;
  outline-style: none;
  outline-width: 0ch;
}
</style>
