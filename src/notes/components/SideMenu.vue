<template>
  <div>
    <v-list dense class="grey lighten-4">
      <template v-for="(item, i) in items">
        <v-layout v-if="item.heading" :key="i" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-btn @click="addLable" small text>edit</v-btn>
          </v-flex>
        </v-layout>
        <v-divider v-else-if="item.divider" :key="i" dark class="my-3"></v-divider>
        <v-list-item v-else :key="i" @click="menuClick(item)">
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
    <Setting />
    <AddLabel />
    <SetShortkey />
    <Search />
  </div>
</template>

<script>
import Setting from './modalPage/Setting'
import AddLabel from './modalPage/AddLabel'
import SetShortkey from './modalPage/SetShortKey'
import Search from './modalPage/Search'
let { shell } = window.require('electron')

export default {
  name: 'side-menu',
  components: {
    Setting,
    AddLabel,
    SetShortkey,
    Search,
  },
  data() {
    return {
      items: [
        { icon: 'lightbulb_outline', text: 'Notes', name: 'notes', params: {}, isModal: false },
        { icon: 'touch_app', text: 'Reminders', name: 'reminders', params: {}, isModal: false },
        { divider: true },
        { heading: 'Labels' },
        {
          icon: 'add',
          text: 'Create new label',
          name: 'newLabel',
          params: {},
          isModal: true,
          emitName: 'showAddLabel',
        },
        { divider: true },
        { icon: 'archive', text: 'Archive', name: 'archive', params: {}, isModal: false },
        { icon: 'delete', text: 'Trash', name: 'trash', params: {}, isModal: false },
        { divider: true },
        { icon: 'settings', text: 'Settings', name: 'settings', params: {}, isModal: true, emitName: 'showSetting' },
        { icon: 'help', text: 'Help', name: 'help', params: {}, isUrl: true, url: 'www.baidu.com' },
        { icon: 'phonelink', text: 'App downloads', name: 'downloads', params: {}, isUrl: true, url: 'www.baidu.com' },
        {
          icon: 'keyboard',
          text: 'Keyboard shortcuts',
          name: 'shortcuts',
          params: {},
          isModal: true,
          emitName: 'showSetShortKey',
        },
      ],
    }
  },
  methods: {
    menuClick(item) {
      let me = this
      if (item.isModal) {
        me.$bus.$emit(item.emitName)
      } else if (item.isUrl) {
        shell.openExternal(item.url)
      } else {
        this.$router.push(item)
      }
    },
    addLable() {
      this.$bus.$emit('showAddLabel')
    },
  },
}
</script>
