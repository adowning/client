<template>
  <!-- <v-card height="150" color="yellow"> -->
  <v-footer absolute height="32" width="100%" color="white" class="font-weight-medium" style="padding-bottom: 0px;">
    <v-col class="text-start ma-0 pa-0 ml-12" cols="12">
      <v-btn small @click="test">test</v-btn> <v-btn small @click="test2">test2</v-btn>
    </v-col>
  </v-footer>
  <!-- </v-card> -->
</template>
<script>
// import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DevFooter',
  props: {
    refreshingApp: Boolean,
  },
  mounted() {
    try {
      //console.log(parseApi.currentUser('firstName') + ' is logged in to parse')
    } catch (e) {
      //console.log('user is logged out of parse')
    }
  },
  // computed: {
  //   ...mapGetters('authentication', ['isUserLoggedIn']),
  //   ...mapState('authentication', ['user']),
  //   ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
  // },
  // watch: {
  //   user(val) {},
  // },
  methods: {
    // async logout() {
    //   await firebase.auth().signOut()
    // },
    async test() {
      // User's location
      const userGeoPoint = this.$store.state.profiles.profiles[0].lastLocation
      const parseConfig = await parseApi.getParseConfig()
      //console.log(parseConfig.get('OfficeLocation').latitude)
      //console.log(typeof parseConfig.get('OfficeLocation').longitude)
      var point = new Parse.GeoPoint({
        latitude: parseConfig.get('OfficeLocation').latitude,
        longitude: parseConfig.get('OfficeLocation').longitude,
      })
      var GameScore = Parse.Object.extend('GameScore')
      const query = new Parse.Query('Profile')
      query.near('lastLocation', point)
      query.limit(10)
      const placesObjects = await query.find()
      //console.log(placesObjects)
    },
    async test2() {
      // await Parse.Cloud.run('sendNotificationAll', { msg: 'hai2u' })
      var p = parseApi.currentUserProfile()
      console.log(p.id)
      await Parse.Cloud.run('sendNotificationUser', { profiles: [p.id ], msg: 'hai2u' })
    },
    // async getUserTimesheets() {
    //   await this.$store.dispatch('timesheets/getUserTimesheets', this.user.objectId)
    // },
  },
}
</script>

<style></style>
