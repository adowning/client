<template>
  <ais-instant-search :search-client="searchClient" index-name="customers">
    <ais-search-box placeholder="Search here…" class="searchbox mt-12 ml-6 mb-0 pb-0" />
    <v-list nav flat dense class=" mx-2 px-0">
      <v-list-item-group v-model="model" active-class="border" class=" ml-6  mx-0 px-0" color="indigo">
        <app-infinite-hits>
          <template slot="item" slot-scope="{ item }">
            <v-card flat>
              <v-layout row wrap :class="`pa-3  ${item.disposition}`">
                <v-flex xs10 md4>
                  <div class="caption grey--text">ACCOUNT NAME</div>
                  <div>{{ item.accountName }}</div>
                </v-flex>
                <v-flex xs6 sm4 md3>
                  <div class="caption grey--text">PHONE</div>
                  <div>{{ item.phone1 }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                  <div class="caption grey--text">DATE</div>
                  <div>{{ item.acquisitionDate | moment('DD-MM-YYYY') }}</div>
                </v-flex>

                <v-flex xs2 sm4 md2>
                  <div class="right">
                    <!-- <v-chip small :class="`${item.disposition} white--text caption my-2`">{{
                      item.disposition
                    }}</v-chip> -->
                  </div>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
            </v-card>
            <!-- <v-list-item class="mb-0 mx-0 px-1">
              <v-list-item-avatar>
                <v-btn icon @click="createNewOrder(item.accountID)">
                  <v-icon color="success">fa-clock</v-icon>
                </v-btn>
              </v-list-item-avatar>

              <v-list-item-content style="max-width: 150px;">
                <v-list-item-title><ais-highlight :hit="item" attribute="accountName"/></v-list-item-title>
                <v-list-item-subtitle class="phone" @click="callCustomer(item.phone1)"
                  ><ais-highlight :hit="item" attribute="phone1"
                /></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content style="max-width: 190px;">
                <v-list-item-subtitle><ais-highlight :hit="item" attribute="street"/></v-list-item-subtitle>
                <v-list-item-subtitle> {{ item.city }}, {{ item.zip }} {{ item.state }} </v-list-item-subtitle>
              </v-list-item-content>
              <v-row justify="end" style="max-width: 90px;">
                <v-list-item-action class="mx-0 px-0" style="max-width: 10px;">
                  <v-btn icon style="max-width: 10px;">
                    <v-icon color="success">fa-map</v-icon>
                  </v-btn>
                </v-list-item-action>
                <customer-detail :customer="item"></customer-detail>
                <v-list-item-action class="mx-0 mr-4" style="max-width: 10px;">
                  <v-btn icon style="max-width: 10px;">
                    <v-icon color="info">mdi-information-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-row>
            </v-list-item> -->
          </template>
        </app-infinite-hits>
      </v-list-item-group>
    </v-list>
  </ais-instant-search>
</template>

<script>
import { ipcRenderer } from 'electron'
import AppInfiniteHits from '@/components/InfiniteHits'
// import CustomerDetail from '@/components/accounts/CustomerDetail'
import algoliasearch from 'algoliasearch/lite'

import 'instantsearch.css/themes/algolia-min.css'

export default {
  components: {
    AppInfiniteHits,
    // CustomerDetail
  },
  data() {
    return {
      model: 1,
      dialog: false,
      searchClient: algoliasearch('59EXPAJLR4', '2ed6f5748d1b4256ec19f9616b067b0d'),
    }
  },
  methods: {
    callCustomer(phoneNumber) {
      //console.log(phoneNumber)
    },

    createNewOrder(accountID) {
      //`orders/order?accountID=${accountID}&orderType=Work+Order`
      ipcRenderer.send('open-customer-sm', {
        id: `orders/order?accountID=${accountID}&orderType=Work+Order`,
      })
    },
  },
}

// var body = document.body,
//   timer

// window.onscroll = function() {
//   scrollFunction()

//   clearTimeout(timer)
//   if (!body.classList.contains('disable-hover')) {
//     body.classList.add('disable-hover')
//   }
//   timer = setTimeout(function() {
//     body.classList.remove('disable-hover')
//   }, 400)
// }

// function scrollFunction() {
//   var hero = document.getElementById('hero')
//   var logo = document.getElementById('logo')
//   var btnTop = document.getElementById('topBtn')
//   if (
//     document.body.scrollTop > 400 ||
//     document.documentElement.scrollTop > 400
//   ) {
//     btnTop.style.display = 'block'
//   } else {
//     var scrolled = document.documentElement.scrollTop
//     hero.style.transform = 'translate3d( 0, ' + scrolled * -0.2 + 'px, 0)'
//     logo.style.transform = 'translate3d( 0, ' + scrolled * -0.15 + 'px, 0)'
//     btnTop.style.display = 'none'
//   }
// }
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
  color: blue;
  // background-color: #313D4F;
}
.phone {
  // border-bottom: 1px dashed orange;
  text-decoration: underline;
  text-decoration-style: dashed;

  color: blue;
  // background-color: #313D4F;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
}

.ais-Highlight-highlighted {
  background: cyan;
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
