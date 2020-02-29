<template>
  <v-list nav flat dense class=" ml-1 pl-0">
    <v-container id="scroll-target" style="max-height: 300px" class="mx-0 px-0 overflow-y-auto">
      <v-list-item-group
        v-model="model"
        active-class="border"
        class=" ml-1 px-0"
        color="indigo"
        transparent
        v-scroll:#scroll-target="onScroll"
      >
        <!-- <div
        id="scroll-target"
        ref="container"
        class="flex-grow-1 overflow-y-scroll scrollbar"
      > -->

        <app-infinite-hits>
          <template slot="item" slot-scope="{ item }">
            <v-list-item style="background-color:#27293D;" class="mb-1 mx-0 px-1">
              <v-row justify="start" class=" px-1" style="max-width: 55px;">
                <v-list-item-action align="center" class="mx-0 px-0">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                    <template v-slot:activator="{ on }">
                      <v-btn icon>
                        <v-icon color="success" v-on="on">mdi-phone</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>{{ item.phone1 }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>

                  <!-- <v-list-item-action-text
                  ><ais-highlight :hit="item" attribute="phone1"
                /></v-list-item-action-text> -->
                </v-list-item-action>
                <!-- <customer-detail :customer="item"></customer-detail> -->
                <!-- <v-list-item-action class="mx-0 mr-4"  style="max-width: 10px;" >
                      <v-btn icon style="max-width: 10px;">
                        <v-icon color="info">mdi-information-outline</v-icon>
                      </v-btn>
                    </v-list-item-action> -->
              </v-row>
              <v-list-item-content style="max-width: 190px;">
                <v-list-item-title><ais-highlight :hit="item" attribute="accountName"/></v-list-item-title>
                <v-list-item-subtitle><ais-highlight :hit="item" attribute="searchAddress"/></v-list-item-subtitle>
                <v-list-item-subtitle> {{ item.city }} {{ item.zip }} {{ item.state }} </v-list-item-subtitle>
                <!-- <v-list-item-subtitle
                style=" color: #FD5D93; "
                @click="callCustomer(item.phone1)"
                ><ais-highlight :hit="item" attribute="phone1"
              /></v-list-item-subtitle> -->
              </v-list-item-content>
              <v-list-item-action align="center" class="mx-0 px-0">
                <v-menu :v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
                  <template v-slot:activator="{ on }">
                    <v-btn icon>
                      <v-icon color="info" v-on="on">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>Create new Workorder</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Open in SrvMonster</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <!-- <v-list-item-action-text
                  ><ais-highlight :hit="item" attribute="phone1"
                /></v-list-item-action-text> -->
              </v-list-item-action>
            </v-list-item>
          </template>
        </app-infinite-hits>
        <!-- </div> -->
      </v-list-item-group>
    </v-container>
  </v-list>
</template>

<script>
// import Account from '@/models/account'
// import AccountListItem from '~/components/DownloadListItem.vue'
import AppInfiniteHits from '@/components/InfiniteHits.vue'

export default {
  components: {
    // AccountListItem,
    AppInfiniteHits,
  },
  props: ['items'],
  data() {
    return {
      model: 1,
      dialog: false,
      menu: false,
    }
  },

  // onClickItem(e) {
  //   //console.log('click')
  //   tabStore.newTab({
  //     url: this.item.url,
  //     options: { viewId: e.altKey ? 'secondary' : 'primary' }
  //   })
  // }
}
</script>

<style lang="scss" rel="stylesheet/scss">
// @import "assets/css/searchbox.scss";

body,
h1 {
  margin: 0;
  padding: 0;
}
.v-application ul,
.v-application ol {
  padding-left: 1px;
}
.border {
  // border: 1px dashed #FFFF;
  color: white;
  background-color: #1e1e2e;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
}

.ais-Highlight-highlighted {
  background: yellow;
  font-style: normal;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header a {
  color: #fff;
  text-decoration: none;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.header-title::after {
  content: ' ▸ ';
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.search-panel {
  display: flex;
}

.search-panel__filters {
  flex: 1;
  margin-right: 1em;
}

.search-panel__results {
  flex: 3;
}

.searchbox {
  margin-bottom: 2rem;
  // background-color: #1E1E2E;
}

.pagination {
  margin: 2rem auto;
  text-align: center;
}
</style>
