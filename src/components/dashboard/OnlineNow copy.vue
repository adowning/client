<template>
  <v-sheet max-width="1000">
    <v-list>
      <!-- <v-list-item-group v-model="model" multiple color="indigo"> -->
      <!-- <v-list-item
          v-for="(item, i) in items"
          :key="i"
        > -->
      <v-list-item-group v-model="model" multiple class="pa-4" show-arrows>
        <v-row>
          <v-list-item v-for="profile in profiles" :key="profile.id" v-slot:default="{ active, toggle }">
            <!-- <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="100"
              width="200"
              @click="toggle"
            > -->
            <v-card :color="active ? 'primary' : 'primary'" class="ma-4" height="80" width="260" @click="toggle">
              <v-fade-transition>
                <!-- <v-icon
                  v-if="active"
                  color="white"
                  size="24"
                  class="mx-0 pa-0"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon> -->
                <v-btn v-if="active" color="red" x-small absolute dark fab top left outlined class="ma-0 pa-0 mt-5">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-fade-transition>
              <v-row class="fill-height" align="center" justify="center">
                <employee-card
                  v-slot:default="{ active, toggle }"
                  :profile="profile"
                  :active="active"
                  dark
                  :color="active ? 'primary' : 'success'"
                />
              </v-row>
            </v-card>
          </v-list-item>
        </v-row>
      </v-list-item-group>

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
              v-model="messageNew.text"
              class="mx-2"
              label="Message to send"
              rows="1"
            ></v-textarea>
          </v-list-item>
        </v-card>
      </v-expand-transition>
    </v-list>
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
    model: [],
    messageNew: {},
  }),
  computed: {
    ...mapState('profiles', ['profiles']),
  },
  methods: {
    sendMessage() {
      //console.log('click')
    },
  },
}
</script>
<style scoped>
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
