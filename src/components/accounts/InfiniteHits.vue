<template>
  <ol v-if="state">
    <li v-for="hit in state.hits" :key="hit.objectID">
      <slot name="item" :item="hit"> </slot>
    </li>
    <li v-observe-visibility="visibilityChanged" class="sentinel" />
  </ol>
</template>

<script>
import { createWidgetMixin } from 'vue-instantsearch'
import { connectInfiniteHits } from 'instantsearch.js/es/connectors'

export default {
  name: 'InfiniteHits',
  mixins: [createWidgetMixin({ connector: connectInfiniteHits })],
  methods: {
    visibilityChanged(isVisible) {
      console.log('isVisible', isVisible)
      if (isVisible && !this.state.isLastPage) {
        this.state.showMore()
      }
    },
  },
}
</script>

<style scoped>
.sentinel {
  list-style-type: none;
}
</style>
