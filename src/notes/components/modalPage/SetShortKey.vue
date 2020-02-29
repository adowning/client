<template>
  <v-dialog v-model="dialog" scrollable max-width="500px">
    <v-card>
      <v-card-title>键盘快捷键</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'set-short-key',
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    let me = this
    this.$bus.$on('showSetShortKey', function (arg) {
      me.dialog = true
    })
  }
}
</script>
