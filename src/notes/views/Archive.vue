<template>
  <div class="archive">
    <NoteGrid/>
  </div>
</template>

<script>
import NoteGrid from '../components/NoteGrid.vue'

export default {
  name: 'archive',
  components: {
    NoteGrid
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.archive {
  width: 100%;
}
</style>
