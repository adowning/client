<template>
  <div id="drag-list" class="drag-list">
    <div class="drag-item" :key="index" v-for="(item, index) of dragList">
      {{item.id}}
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'drag-list',
  props: {
    dragList: {
      type: Array,
      required: false,
      default: function () {
        return [{
          id: 1
        }, {
          id: 2
        }]
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    let el = document.getElementById('drag-list')
    let sortable = Sortable.create(el)
  }
}
</script>

<style scoped>
.drag-item {
  width: 100%;
  height: 36px;
  border-bottom: 1px solid grey;
  line-height: 36px;
}
</style>
