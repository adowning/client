<template>
  <v-card
    dense
    @click="toggle"
    :color="active ? 'success' : 'primary '"
    height="80"
    v-if="profile.isClocked || !clocked"
    width="220"
    outlined
    flat
    :class="`clocked?mt-3:mt-0 mx-2 profile ${profile.status}`"
    dark
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title :light="!active" class="outline my-0 py-0" v-text="profile.firstName"></v-card-title>
        <v-card-subtitle class="outline my-0 py-0 " v-text="profile.phoneList[0]"></v-card-subtitle>
        <v-card-subtitle v-if="profile.phoneList[0].length < 4" class="outline my-0 py-0 "
          ><v-icon small color="warning">mdi-alert</v-icon></v-card-subtitle
        >
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on }">
            <v-card-subtitle class="outline my-0 py-0 my-0">
              <v-icon v-on="on" :color="profile.isClocked ? 'green' : 'grey'">mdi-clock-outline</v-icon>
            </v-card-subtitle>
          </template>
          <v-list dense height="70">
            <v-list-item class="my-0 py-0">
              <v-list-item-title v-if="profile.isClocked" class="my-0 py-0">{{
                profile.lastClockEvent | moment('HH:mm a')
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- <v-fade-transition> -->
      <v-icon v-if="active" class="mr-4 mt-0 mb-2" color="white" size="42" v-text="'mdi-close-circle-outline'"></v-icon>
      <!-- </v-fade-transition> -->
      <v-avatar v-if="!active" class="ma-3" size="48">
        <v-img v-if="profile.avatar != undefined" :src="profile.avatar.url"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ['active', 'clocked', 'profile', 'toggle'],
  name: 'EmployeeCard',
}
</script>

<style>
.profile.ok {
  border-left: 4px solid #3cd1c2;
}
.callrecord.ongoing {
  border-left: 4px solid orange;
}
.callrecord.overdue {
  border-left: 4px solid tomato;
}
</style>
