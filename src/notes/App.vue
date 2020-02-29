<template>
  <v-app id="keep">
    <v-app-bar app clipped-left color="#202124" style="border-bottom: .001em solid grey; ">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="title ml-6 mr-5">Shared&nbsp;<span class="font-weight-light mr-9">Notes</span></span>
      <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" />
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" stateless hide-overlay app clipped>
      <v-list dense color="#202124">
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn small text>edit</v-btn>
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" class="my-4" />
          <v-list-item v-else :key="i" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import SideMenu from './components/SideMenu'
let { ipcRenderer } = window.require('electron')
export default {
  props: {
    source: String,
  },
  components: {
    // HelloWorld,
    // SideMenu,
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Labels' },
      { icon: 'add', text: 'Create new label' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Trash' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' },
    ],
  }),
}
</script>

<style>
.theme--dark.v-application {
  background-color: #202124 !important;
}
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
