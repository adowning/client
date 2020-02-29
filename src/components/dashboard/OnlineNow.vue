<template>
  <v-sheet class="  py-0" width="1060">
    <v-switch v-model="clocked" label="Clocked in" class="ma-0 pa-0 ml-12"></v-switch>
    <v-row height="28"><v-card></v-card></v-row>
    <v-slide-group v-model="model" class="ma-0 pa-0 pa-0 " multiple show-arrows>
      <v-slide-item
        v-for="profile in profiles"
        class=" my-0 py-0"
        :key="profile.objectId"
        v-slot:default="{ active, toggle }"
      >
        <!-- <v-card :color="active ? 'primary' : 'grey lighten-1'" class="ma-4" height="200" width="100" @click="toggle"> -->
        <!-- <employee-card :toggle="toggle" :profile="profile" :active="active" v-if="profile.isClocked || !clocked">
        </employee-card> -->
        <!-- </v-card> -->
        <employee-card
          :profile="profile"
          :clocked="clocked"
          :active="active"
          :toggle="toggle"
          v-if="profile.isClocked || !clocked"
        />
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition v-if="model.length">
      <v-card v-if="model != null" color="grey lighten-4" outlined flat height="100" tile>
        <v-row dense width="100%" class="mx-4 my-0 py-0">
          <!-- <v-col fill-height cols="1" sm="1" class="ma-0 pa-0" absolute height="100%">
              <v-text style="bottom-padding: 0px;" absolute> Send to: </v-text>
            </v-col> -->
          <!-- <v-col cols="7" sm="7"> -->
          <div v-for="(item, index) in profiles" :key="item.id">
            <div v-if="model.includes(index)">
              <!-- {{ profiles[item] }} -->
              <v-chip label class="ma-2 " color="primary lighten-3" text-color="white">
                {{ item.firstName }}
              </v-chip>
            </div>
          </div>
          <!-- </v-col> -->
        </v-row>
        <v-list-item>
          <v-textarea
            append-outer-icon="mdi-send-outline"
            @click:append-outer="sendMessage"
            v-model="messageNew"
            class="mx-2"
            label="Message to send"
            rows="1"
          ></v-textarea>
        </v-list-item>
      </v-card>
    </v-expand-transition>
  </v-sheet>
</template>
<script>
import EmployeeCard from '@/components/dashboard/EmployeeCard'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    EmployeeCard,
  },
  data: () => ({
    types: ['cards', 'images'],
    type: 'images',
    clocked: false,
    messageNew: '',
    model: [],
  }),
  computed: {
    ...mapState('profiles', ['profiles']),
  },
  methods: {
    sendMessage(msg) {
      console.log('click', this.messageNew)
    },
  },
}
</script>
<style scoped>
.theme--light.primary--text {
  height: 28px !important;
}
.theme--dark.primary--text {
  height: 28px !important;
}
.theme--light.v-messages {
  height: 0px !important;
}
.theme--dark.v-messages {
  height: 0px !important;
}
.v-messages {
  height: 0px !important;
}
.v-employee-card.inCompliance {
  border-left: 4px solid #3cd1c2;
}
.v-card.WrongLocation {
  border-left: 4px solid orange;
}
.v-card.Missing {
  border-left: 4px solid tomato;
}
</style>
