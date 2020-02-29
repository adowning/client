<template>
  <v-app id="app">
    <div class="main-wrapper">
      <nav-bar></nav-bar>
      <snack-bar />
      <side-nav v-if="user"></side-nav>
      <transition name="fade" mode="out-in">
        <v-container class="fill-height heigh ma-0 pa-0 ml-12" fluid>
          <router-view></router-view>
        </v-container>
      </transition>
      <dev-footer />
    </div>
  </v-app>
</template>
<script>
import NavBar from '@/components/NavBar'
import SideNav from '@/components/SideNav'
import SnackBar from '@/components/SnackBar.vue'
import DevFooter from '@/components/DevFooter.vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    SnackBar,
    NavBar,
    SideNav,
    DevFooter,
  },
  data: () => ({
    // drawer: null,
    // snackbar: {
    //   show: false,
    //   color: '',
    //   mode: '',
    //   timeout: 4000,
    //   text: '',
    //   top: true,
    //   right: true,
    //   icon: null,
    // },
  }),

  async created() {
    this.$vuetify.theme.dark = this.darkTheme
  },
  async mounted() {
    var _user = await parseApi.currentUser()
    if (_user != null) {
      // parseApi.hydrateAll(user)
      var user = _user.toJSON()
      await this.$store.dispatch('authentication/autoLogin', user)
      this.$router.push('/dashboard')
    } else {
      parseApi.logoutUser()
      this.$router.push('/login')
    }
    const params = {
      direction: 'incoming',
      employeeName: 'mark',
      date: '2019-12-17T18:32:45',
      phoneNumber: '19035661416',
    }
    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {
      //console.log('command hit')
      if (typeof data.command === 'undefined') {
        console.error('IPC message is missing command string')
        return
      }
      if (data.command == 'test') {
        if (data.payload.type == 'happy') {
          this.onLaugh()
          return
        }
        if (data.payload.type == 'test2') {
          this.onAngry()
          return
        }
      }
    })
  },
  watch: {
    onDarkThemeChanged(value) {
      this.$vuetify.theme.dark = value
    },
    user(val) {
      // //console.log(val)
      // this.$router.push('dashboard')
    },
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['refreshingApp']),
    ...mapState('authentication', ['user']),
  },
}
</script>

<style lang="scss">
$body-font-family: '@/assets/fonts/HelveticaNowText-Thin';
html {
  font-family: $body-font-family, sans-serif !important;
  max-height: 690px !important;
  max-width: 1190px !important;

  overflow-y: hidden !important; /* Hide scrollbars */
  overflow-x: hidden !important; /* Hide scrollbars */
}
// .container {
//   padding: 6px !important;
//   margin-left: 50px !important;
//   margin-right: 0px !important;
//   padding-right: 0px !important;
// }

#app {
  font-family: $body-font-family, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  // overflow: hidden; /* Hide scrollbars */
  -moz-osx-font-smoothing: grayscale;
  // color: #164b73;
  padding-top: 0%;
  padding-left: 0%;

  // overflow-y: hidden !important; /* Hide scrollbars */
  // overflow-x: hidden !important; /* Hide scrollbars */
  // background-position: -663px -6px;
  // background-size: 100% 100%;
  max-height: 680px !important;
  max-width: 1200px !important;
}
</style>
