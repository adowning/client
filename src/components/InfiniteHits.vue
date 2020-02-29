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
      //console.log('isVisible', isVisible)
      if (isVisible && !this.state.isLastPage) {
        this.state.showMore()
      }
    }

    // onClickItem(e) {
    //   //console.log('clickd', e)
    //   // https://six.servicemonster.net/desktop#accounts/account/b0bcf442-27ec-e111-834a-002590274606?tab=Details&gridFilter=All+Activities
    //   tabStore.newTab({
    //     url:
    //       'https://six.servicemonster.net/desktop#accounts/account/' +
    //       e.accountID +
    //       '?tab=Details&gridFilter=All+Activities',
    //     options: { viewId: e.altKey ? 'secondary' : 'primary' }
    //   })
    // }
  }
}
</script>

<style scoped>
.sentinel {
  list-style-type: none;
}
</style>
