<template>
  <div class="add-label-item">
    <v-icon style="line-height: 0.6;" v-if="isBlur" normal>mdi-delete</v-icon>
    <v-icon style="line-height: 0.6;" v-if="isFocus" normal>mdi-label</v-icon>
    <input v-model="value" @focus="inputFocus" @blur="inputBlur" class="add-input" type="text">
    <v-icon @click="labelSubmit" style="line-height: 0.6;" v-if="isFocus" normal>mdi-check</v-icon>
    <v-icon style="line-height: 0.6;" v-if="isBlur" normal>mdi-pencil</v-icon>
  </div>
</template>

<script>
export default {
  name: 'add-label-item',
  props: {
    labelDetail: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isFocus: false,
      isBlur: true,
      value: ''
    }
  },
  mounted () {
    this.value = this._props.labelDetail.labelName
  },
  methods: {
    inputFocus () {
      console.log('获取到焦点')
      this.isFocus = true
      this.isBlur = false
    },
    inputBlur () {
      console.log('失去焦点')
      this.isFocus = false
      this.isBlur = true
    },
    labelSubmit () {
      console.log('保存label')
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
