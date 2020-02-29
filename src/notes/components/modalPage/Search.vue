<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>User Controls</v-subheader>
        <v-list-item avatar>
          <v-list-item-content>
            <v-list-item-title>Content filtering</v-list-item-title>
            <v-list-item-sub-title
              >Set the content filtering level to restrict apps that can be downloaded</v-list-item-sub-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item avatar>
          <v-list-item-content>
            <v-list-item-title>Password</v-list-item-title>
            <v-list-item-sub-title
              >Require password for purchase or use password to restrict purchase</v-list-item-sub-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item avatar>
          <v-list-item-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-sub-title>Notify me about updates to apps or games that I downloaded</v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item avatar>
          <v-list-item-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-sub-title>Auto-update apps at any time. Data charges may apply</v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item avatar>
          <v-list-item-action>
            <v-checkbox v-model="widgets"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto-add widgets</v-list-item-title>
            <v-list-item-sub-title>Automatically add home screen widgets</v-list-item-sub-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  mounted() {
    let me = this
    this.$bus.$on('showSearch', function(arg) {
      me.dialog = true
    })
  },
}
</script>
