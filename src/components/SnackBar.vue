<template>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
    <v-icon>{{ snackbar.icon }}</v-icon>
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({
    drawer: null,
    snackbar: {
      show: false,
      color: '',
      mode: '',
      timeout: 4000,
      text: '',
      top: true,
      right: true,
      icon: null,
    },
  }),
  async created() {
    this.$updateBus.$on('showSnackBar', async snackbar => {
      this.snackbar = Object.assign(this.snackbar, snackbar)
      if (snackbar.errorCode == 209) {
        //console.log('i got a 209')
        // Parse.User.logOut()
        parseApi.logoutUser()
        this.$router.push('/LOGIN')
      }
    })
  },
}
</script>

<style></style>
