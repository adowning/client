<template>
  <div>
    <v-row class=" mt-12 ml-12 ml-5 px-0" width="100%">
      <v-combobox v-model="select" :items="items" label="Filter" dense multiple chips></v-combobox>
    </v-row>
    <v-row class="ml-12 ml-5 px-0" width="100%">
      <v-container class="my-5 overflow-y-auto " id="scroll-target">
        <v-card flat v-for="(callrecord, index) in callrecords" :key="callrecord.title">
          <v-layout row wrap :class="`pa-3 callrecord ${callrecord.disposition}`">
            <v-flex xs6 md1>
              <div class="caption grey--text"></div>
              <div v-if="index == 0">{{ callrecord.startTimestamp | moment('DD-MM') }}</div>
            </v-flex>
            <div v-if="index != 0">
              <v-flex
                v-if="
                  $moment(callrecords[index].startTimestamp).dayOfYear() !=
                    $moment(callrecords[index - 1].startTimestamp).dayOfYear()
                "
                xs6
                sm4
                md1
              >
                <div class="caption grey--text">DATE</div>
                <div>{{ callrecord.startTimestamp | moment('DD-MM') }}</div>
              </v-flex>
            </div>
            <v-flex xs10 md3>
              <div class="caption grey--text">{{ callrecord.partner }}</div>
              <div color="primary">{{ callrecord.partnerNumber }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div v-if="callrecord.employee != 'other'" class="caption grey--text">EMPLOYEE</div>
              <div v-if="callrecord.employee != 'other'">{{ callrecord.employee }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">START</div>
              <div>{{ callrecord.startTimestamp | moment('HH:mma') }}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
              <div class="caption grey--text">END</div>
              <div>{{ callrecord.endTimestamp | moment('HH:mma') }}</div>
            </v-flex>
            <v-flex xs1 sm2 md1>
              <div class="right">
                <v-chip small :class="`${callrecord.disposition} white--text caption my-2`">{{
                  callrecord.disposition
                }}</v-chip>
              </div>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('callrecords', ['callrecords']),
  },
}
</script>
<style>
.callrecord.complete {
  border-left: 4px solid #3cd1c2;
}
.callrecord.ongoing {
  border-left: 4px solid orange;
}
.callrecord.overdue {
  border-left: 4px solid tomato;
}

.v-chip.Answered {
  color: #3cd1c2;
}
.v-chip.Cancelled {
  color: orange;
}
.v-chip.Missed {
  color: tomato;
}
</style>
