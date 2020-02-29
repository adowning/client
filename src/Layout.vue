<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      clipped
      app
      permanent
      absolute
      height="100%"
      style="overflow-y: hidden !important;"
    >
      <v-list dense>
        <template v-for="route in routes">
          <v-menu
            open-on-hover
            right
            height="100%"
            title
            elevation="0"
            content-class="avatar-menu"
            style="padding: 0px; min-width: 180px; border-radius: 0px; -moz-border-radius: 0px;
-webkit-border-radius: 0px;
border-radius: 0px;"
            tile
            nudge-right="58"
            nudge-top="0"
            dense
            close-delay="259"
            transition="slide-y-reverse-transition"
            :key="route.id"
          >
            <template v-slot:activator="{ on }">
              <v-list-item :key="route.text" link v-on="on">
                <v-list-item-action>
                  <v-icon color="#164B73">{{ route.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ route.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list
              v-if="route.links.length > 0"
              dense
              width="180"
              elevation="0"
              class="headline font-weight-light "
              style="elevation=0; -moz-border-radius: 0px;
-webkit-border-radius: 0px;
border-radius: 0px;"
            >
              <v-list-item-group color="#164B73" style="overflow-y: hidden !important;">
                <div v-for="link in route.links" :key="link.link">
                  <v-list-item color="#164B73" @click="handleWebviewPages(link.webview, link.link)">
                    <v-list-item-icon color="#164B73">
                      <v-icon color="#164B73">{{ link.icon }}</v-icon>

                      <v-list-item-content class="ml-4">
                        <v-list-item-title class=" font-weight-light">{{ link.text }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item-icon>
                  </v-list-item>
                </div>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </template>
        <v-spacer />
      </v-list>
      <v-spacer />
      <v-list class="stuck">
        <v-menu
          open-on-hover
          right
          title
          elevation="0"
          content-class="avatar-menu"
          style="padding: 0px; min-width: 180px; border-radius: 0px; -moz-border-radius: 0px;
-webkit-border-radius: 0px;
border-radius: 0px;"
          tile
          nudge-right="58"
          class="stuck"
          nudge-top="0"
          dense
          close-delay="259"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator="{ on }">
            <v-list-item color="#164B73" v-on="on">
              <v-list-item-icon>
                <v-icon color="#164B73">mdi-settings-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </template>
          <v-list
            dense
            width="180"
            elevation="0"
            class="headline font-weight-light "
            style="elevation=0; -moz-border-radius: 0px;
-webkit-border-radius: 0px;
border-radius: 0px;"
          >
            <v-list-item-group color="primary">
              <div v-for="item in profileLinks" :key="item.link">
                <v-list-item @click="handleWebviewPages(item.webview, item.link)">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                    <v-list-item-content class="ml-4">
                      <v-list-item-title class=" font-weight-light">{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item-icon>
                </v-list-item>
              </div>
              <!-- <v-divider class="mx-4"></v-divider> -->
              <v-list-item @click="logOut()">
                <v-list-item-icon>
                  <v-icon>mdi-calendar</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="ml-4">
                  <v-list-item-title class=" font-weight-light">Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      style="-webkit-app-region: drag;"
      :clipped-left="clippedleft"
      height="32"
      dense
      flat
      app
      color="#164b73"
      dark
    >
      <img src="@/assets/logo.svg" :class="loading ? 'rotate' : 'notrotate'" width="24" />
      <v-toolbar-title style="margin-left: 20px; width: 140px; font-family: 'Berkshire Swash', cursive;">
        <span class="hidden-sm-and-down ml-3">Andrews </span></v-toolbar-title
      ><v-spacer />{{ $route.path }}<v-spacer />
      <v-icon class="header-buttons pr-5">mdi-magnify</v-icon>
      <v-icon class="header-buttons pr-8">mdi-bell</v-icon>
      <v-icon class="header-buttons ">mdi-close</v-icon>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <!-- <router-view class="view" v-if="user != undefined && user != null"></router-view> -->
          <!-- <router-view class="view"></router-view> -->
        </transition>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Layout',

  data: () => ({
    dialog: false,
    mini: true,
    clippedleft: true,
    clipped: true,
    drawer: true,
    profileLinks: [{ link: '/profile', text: 'Profile', icon: 'mdi-account' }],

    routes: [
      {
        webview: false,
        link: '/dashboard',
        icon: 'mdi-view-dashboard-outline',
        links: [],
      },

      {
        link: '/timesheets',
        webview: false,
        icon: 'mdi-clock-outline',
        links: [
          {
            webview: false,
            link: '/timesheets',
            text: 'Timesheets',
            icon: 'mdi-format-list-bulleted',
          },
          {
            webview: false,
            link: '/timesheetsmanage',
            text: 'Manage',
            icon: 'mdi-format-list-bulleted',
          },
        ],
      },
      {
        icon: 'mdi-account-multiple-outline',
        links: [
          {
            webview: false,
            link: '/accountpanel',
            text: 'Customers',
            icon: 'mdi-account-group-outline',
          },
          {
            webview: false,
            link: '/employees',
            text: 'Employes',
            icon: 'mdi-account-tie-outline',
          },
        ],
      },
      { link: '/calls', webview: false, icon: 'mdi-phone-outline', links: [] },
      { link: '/messages', icon: 'mdi-email-outline', links: [] },
      { link: '/processes', icon: 'mdi-state-machine', links: [] },
      {
        icon: 'mdi-alert-outline',
        links: [
          {
            webview: true,
            link: '/api_console/rest',
            text: 'Test Api',
            icon: 'mdi-api',
          },
          {
            webview: true,
            link: '/logs/info',
            text: 'Server Logs',
            icon: 'mdi-format-list-bulleted',
          },
          {
            webview: true,
            link: '/browser/_User',
            text: 'Users',
            icon: 'mdi-account-group-outline',
          },

          {
            webview: true,
            link: '/browser/Call',
            text: 'Calls',
            icon: 'mdi-phone-log',
          },
          {
            webview: true,
            link: '/browser/Timesheet',
            text: 'Timesheets',
            icon: 'mdi-calendar-clock',
          },
          {
            webview: true,
            link: '/browser/_Sessions',
            text: 'Sessions',
            icon: 'mdi-account-group-outline',
          },
        ],
      },
    ],
  }),
  computed: {
    loading() {
      if (this.$store != undefined) {
        return this.$store.getters.isLoading
      } else {
        return false
      }
    },
    user() {
      return this.$store.getters.currentUser
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('LOGOUT')
    },
    handleWebviewPages(webview, page) {
      //console.log(webview, page)
      if (webview) {
        if (this.$router.currentRoute.name == 'webdev') {
          this.updateBus.$emit('webviewPageChange', { wp: page })
        } else {
          this.$router.push({ name: 'webdev', params: { wp: 'browser/_User' } })
        }
      } else {
        this.$router.push(page)
      }
    },
  },
}
</script>
<style lang="scss">
.stuck {
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding-left: 0px !important;

  padding-left: 0px;
  margin-left: 0px;
}
.header-buttons {
  -webkit-app-region: no-drag !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header .inner {
    padding: 15px;
  }
  .header a {
    margin-right: 1em;
  }
  .header .github {
    display: none;
  }
}
</style>
