<template>
  <ais-instant-search index-name="customers" :search-client="searchClient">
    <ais-configure :hitsPerPage="16" />

    <div class="left-panel">
      <h2>Brands</h2>

      <ais-refinement-list attribute="brand" searchable show-more>
        <div
          slot-scope="{
            items,
            isShowingMore,
            isFromSearch,
            canToggleShowMore,
            refine,
            createURL,
            toggleShowMore,
            searchForItems
          }"
        >
          <v-text-field
            type="search"
            placeholder="I want to set up here with v-model, but, not working"
            @input="searchForItems($event)"
          />

          <v-list>
            <span v-if="isFromSearch && !items.length" style="color:red"
              >No results.</span
            >
            <li v-for="item in items" :key="item.accountName">
              <v-chip
                :href="createURL(item)"
                :style="{ backgroundColor: item.isRefined ? 'red' : '' }"
                @click.prevent="refine(item.accountName)"
              >
                <ais-highlight attribute="accountName" :hit="item" />
                ({{ item.accountName }})
              </v-chip>
            </li>
          </v-list>
          <button @click="toggleShowMore" :disabled="!canToggleShowMore">
            {{ !isShowingMore ? 'Show more' : 'Show less' }}
          </button>
        </div>
      </ais-refinement-list>
    </div>
    <div class="right-panel">
      <ais-search-box>
        <v-text-field
          slot-scope="{ currentRefinement, refine }"
          name="accountName"
          label="Search"
          placeholder="Search / Enter Keywords"
          :value="currentRefinement"
          @input="refine($event)"
        />
      </ais-search-box>
      <ais-hits>
        <div
        id="scroll-target"
        ref="container"
        class="flex-grow-1 overflow-y-scroll scrollbar"
      >
        <account-list v-scroll:#scroll-target="onScroll" />
      </div>
        <!-- <div slot="item" slot-scope="{ item }">
    
          <div class="hit-accountName">
            <ais-highlight attribute="accountName" :hit="item"></ais-highlight>
          </div>

          <div class="hit-street">
            <ais-highlight attribute="street" :hit="item"></ais-highlight>
          </div>
          <div class="hit-city">
            {{ item.city }}, {{ item.state }} {{ item.zip }}
          </div>
        </div> -->
      <!-- </ais-hits> -->
      <!-- <ais-pagination></ais-pagination> -->
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import 'instantsearch.css/themes/algolia-min.css'
import AccountList from '@/components/AccountList.vue'

import AppInfiniteHits from '@/components/InfiniteHits.vue'
export default {
    components: {
    // Chip,
    AccountList,
    AppInfiniteHits
  },
  data() {
    return {
      searchClient: algoliasearch(
        '59EXPAJLR4',
        '2ed6f5748d1b4256ec19f9616b067b0d'
      )
    }
  }
}
</script>

<style scoped>
body {
  font-family: sans-serif;
  padding: 1em;
}
.ais-Hits-list {
  margin-top: 0;
  margin-bottom: 1em;
}
.ais-InstantSearch {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 1em;
}
.ais-Hits-item img {
  margin-right: 1em;
}
.hit-name {
  margin-bottom: 0.5em;
}
.hit-description {
  color: #888;
  font-size: 0.8em;
  margin-bottom: 0.5em;
}
.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 4px;
}
</style>
