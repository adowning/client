<template>
  <!-- <transition name="fade"> -->
  <v-container id="profile" class="mt-2 ma-0 pa=0 ml-10 mr-0" v-if="userProfile != undefined">
    <!-- <v-row flat class="d-flex justify-start  ">
      <v-row class="pt-0 mt-0 " style="width: 100%;">
        <p class="text-left display-1 ma-0 pa-0 font-weight-light	">{{ user.firstName }} {{ user.lastName }}</p>
      </v-row>
      <v-row class="pt-0 mt-0 " style="width: 100%;">
        <v-divider class="pl-2"></v-divider>
      </v-row> -->

    <v-row flat class="d-flex justify-start  ">
      <v-card flat style="min-width: 200px; max-width: 45%; " class="flex-grow-1 flex-shrink-0 mt-4 pa-2 ">
        <v-row class="pt-0 mt-0 " style="width: 100%;">
          <p class="text-left display-1 ma-0 pa-0 font-weight-light	">
            {{ userProfile.firstName }} {{ userProfile.lastName }}
          </p>
        </v-row>
        <!-- <v-row class="pt-0 mt-0 " style="width: 100%;">
          <v-divider class="pl-2"></v-divider>
        </v-row> -->
        <!-- <v-card flat style="min-width: 100px; max-width:75%; " class="flex-grow-0 flex-shrink-0  pa-2"> -->
        <v-row class="justify-start ">
          <AvatarBox v-if="userProfile != undefined" :user="userProfile" />
          <!-- <AsyncComponent :user="user" /> -->
          <!-- </v-row> -->

          <!-- <v-row> -->
          <ProfileForm :user="userProfile" style="width: 100%;" />
          <!-- </v-row> -->
        </v-row>
      </v-card>
      <v-card flat style="min-width: 200px; max-width:50%; " class="flex-grow-1 flex-shrink-0  pa-2 ">
        <v-row class="pt-0 mt-8 " style="width: 100%;">
          <p class="text-left headline ma-0 pa-0 font-weight-light	">Recent Activities</p>
        </v-row>
        <ActivityHistory :user="userProfile" :timesheets="timesheets" :callrecords="callrecords" />
      </v-card>
    </v-row>
    <!-- </div> -->
    <!-- <div> -->
    <!-- </v-row> -->
  </v-container>
  <!-- </transition> -->
</template>

<script>
import AvatarBox from '@/components/profile/AvatarBox'
import ProfileForm from '@/components/profile/ProfileForm'
import ActivityHistory from '@/components/profile/ActivityHistory'
import { mapState, mapActions, mapGetters } from 'vuex'
// const AsyncComponent = () => ({
//   // The component to load (should be a Promise)
//   component: import('../components/profile/AvatarBox'),
//   // A component to use while the async component is loading
//   loading: import('../components/profile/LoadingAvatarBox'),
//   // A component to use if the load fails
//   error: import('../components/Error'),
//   // Delay before showing the loading component. Default: 200ms.
//   delay: 200,
//   // The error component will be displayed if a timeout is
//   // provided and exceeded. Default: Infinity.
//   timeout: 3000,
// })
export default {
  name: 'Profile',
  // parse: {
  //   user: {
  //     object: '_User',
  //     action: 'first',
  //     query: q => q.equalTo('objectId', Parse.User.current().id),
  //     subscribe: true,
  //   },
  //   query(q) {
  //     return q.equalTo('status', this.status)
  //   },
  // },
  // inject: ['theme'],

  components: {
    // AsyncComponent,
    // Create a new component that
    // extends v-skeleton-loader
    // VBoilerplate: {
    //   functional: true,
    //   render(h, { data, props, children }) {
    //     return h(
    //       'v-skeleton-loader',
    //       {
    //         ...data,
    //         props: {
    //           boilerplate: true,
    //           elevation: 2,
    //           ...props,
    //         },
    //       },
    //       children,
    //     )
    //   },
    // },
    AvatarBox,
    ProfileForm,
    ActivityHistory,
  },
  data() {
    return {
      events: [],
      input: null,
      nonce: 0,
      limit: 1000,
      isEditing: false,
      userid: '',
      converted: false,
      isClockedIn: false,
      errorMessages: [],
      valid: true,
      dialog: false,
      punchOutDialog: false,
    }
  },
  computed: {
    ...mapState('profiles', ['userProfile']),
    ...mapState('timesheets', ['timesheets']),
    ...mapState('callrecords', ['callrecords']),

    // user() {
    //   return Parse.User.current().toJSON()
    // },
  },
  // beforeRouteEnter() {
  // if (this.user == null || this.user == undefined) {
  //   this.user = {
  //     addressList: {
  //       street: 'loading ...',
  //     },
  //   }
  // }
  // },
  watch: {
    // user(val) {
    //   if (!this.converted) {
    //     this.user = val.toJSON()
    //     this.converted = true
    //   }
    //   return
    // },
  },
  async mounted() {
    // if (Parse.User.current() == undefined || null) {
    //   //console.log('i got a 209')
    //   await Parse.User.logOut()
    //   const err = 'null user, redirecting to login'
    //   this.updateBus.$emit('showSnackBar', {
    //     show: true,
    //     color: 'error',
    //     icon: 'fa-exclamation',
    //     text: err,
    //     errorCode: err.code,
    //   })
    //   this.$router.push('/')
    // }
  },

  // computed: {
  //   user() {
  //     return Parse.User.current().toJSON()
  //   },
  // },
}
</script>

<style lang="scss" scoped>
// @media (min-width: 1400px)
// .container {
//      max-width: 900px;
// }
@media (max-width: 1400px) {
  .container {
    max-width: 1400px;
  }
}
</style>
