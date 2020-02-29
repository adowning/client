<template>
  <v-card tile flat class=" flex-shrink-0 mt-6  no-wrap">
    <v-toolbar dense flat tile color="#164b73" dark v-if="selectedSheet != undefined">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title v-if="selectedSheet.length"
        >{{ selectedSheet[0].startTimestamp | moment('ddd  MMM DD  ') }}
      </v-toolbar-title>
      <v-toolbar-title v-else></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-avatar color="#2BACE2" size="36">
        <span class="white--text headline">{{ stuff.length }}</span>
      </v-avatar>
      <!-- <v-btn icon> -->
      <!-- <v-icon>mdi-magnify</v-icon> -->
      <!-- </v-btn> -->
    </v-toolbar>

    <v-card-text>
      <v-row align="center">
        <v-combobox
          style="max-width:400px; max-height: 30px;"
          v-model="select"
          :items="items"
          label="Filter"
          multiple
          class="mt-0 pt-0"
          chips
        ></v-combobox>
      </v-row>
    </v-card-text>

    <v-container id="scroll-target" style="max-height: 300px" class="mx-0 px-0 overflow-y-auto">
      <v-row dense style="width: 100%;">
        <v-list-item
          style="padding-left: 0px; padding-right: 0px; margin-right: 0px; font-size: 12px;"
          overline
          absolute
        >
          <v-list-item class="mb-0 align-left  font-weight-light">
            <span> {{ $moment(stuff[0].startTimestamp).format('HH:mm a') }}</span>
            <!-- <v-spacer /> <v-list-item-subtitle>23 km/h</v-list-item-subtitle> -->
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item-avatar class="mr-10">
            <v-img src="../../assets/img/defaultProfile.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-row>
      <divider></divider>
      <v-slide-x-transition dense group>
        <div v-for="activity in stuff" :key="activity.id || activity.callId" v-scroll:#scroll-target="onScroll">
          <!-- <div v-if="index == 0">
            <v-list-item class="mb-0 align-left headline font-weight-light" hide-dot>
              <span> {{ $moment(stuff[index].startTimestamp).format('MMM  Do') }}</span>
            </v-list-item>
          </div> -->
          <!-- <div v-if="index > 0">
            <v-list-item
              class="mb-0 align-left headline font-weight-light"
              hide-dot
              v-if="
                $moment(stuff[index].startTimestamp).dayOfYear() != $moment(stuff[index - 1].startTimestamp).dayOfYear()
              "
            >
              <span> {{ $moment(stuff[index].startTimestamp).format('MMM Do') }}</span>
            </v-list-item>
          </div> -->

          <v-list-item :color="activity.color" :icon="activity.icon" fill-dot>
            <v-row dense style="width: 100%;">
              <v-col class="align-left" cols="5">
                <div
                  class="text-left  ma-0 pa-0 font-weight-light	"
                  :class="{
                    pulsate: activity.active,
                    notpulse: !activity.startTime,
                  }"
                >
                  <span class="overline" v-if="!activity.active">
                    <!-- {{ activity.startTimestamp | moment('MM/DD/YYYY') }} | -->
                    {{ activity.startTime | moment('HH:mm') }} - {{ activity.endTime | moment('HH:mma') }}</span
                  ><span v-else>
                    <v-btn block text small color="red" outlined>
                      Active
                    </v-btn></span
                  >
                </div></v-col
              >
              <v-spacer></v-spacer>

              <v-col class="align-right   ma-0 pa-0 font-weight-light	" width="12">
                <v-tooltip bottom v-if="activity.location">
                  <template v-slot:activator="{ on }">
                    <v-icon color="red" v-on="on">mdi-map-marker-outline</v-icon>
                  </template>
                  <span>{{ activity.location }}</span>
                </v-tooltip>
                <v-bottom-sheet inset>
                  <template
                    v-slot:activator="{ on }"
                    @clicked="getRecording(activity)"
                    v-if="activity.disposition == 'Answered'"
                  >
                    <v-btn color="grey" dark outlined class="pa-0" x-small v-on="on" @clicked="getRecording(activity)">
                      <v-icon @clicked="getRecording(activity)" small class="pa-0">mdi-volume-high</v-icon>
                    </v-btn>
                  </template>
                  <v-card tile>
                    <v-progress-linear :value="50" class="my-0" height="3"></v-progress-linear>

                    <v-list>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title v-if="activity.direction == 'incoming'">{{
                            activity.callerDisplay
                          }}</v-list-item-title>
                          <v-list-item-subtitle>{{ activity.callerAddress }}</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-spacer></v-spacer>

                        <v-list-item-icon>
                          <v-btn icon>
                            <v-icon>mdi-rewind</v-icon>
                          </v-btn>
                        </v-list-item-icon>

                        <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
                          <v-btn icon>
                            <v-icon @click="getRecording(activity)">mdi-play</v-icon>
                          </v-btn>
                        </v-list-item-icon>

                        <v-list-item-icon class=" ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
                          <v-btn icon>
                            <v-icon>mdi-fast-forward</v-icon>
                          </v-btn>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-bottom-sheet>
              </v-col>
            </v-row>
          </v-list-item>
        </div>
      </v-slide-x-transition>
    </v-container>
    <!-- <v-slider v-model="time" :max="6" :tick-labels="labels" class="mx-4" ticks></v-slider> -->

    <!-- <v-list class="transparent">
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list> -->

    <v-card-actions class="align-right">
      <v-spacer></v-spacer> <v-btn class="mr-4" text>Full Report</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import moment from 'moment'
export default {
  props: ['selectedSheet', 'timesheets', 'callrecords'],
  data() {
    return {
      select: [],
      dailies: [],
      items: ['Calls', 'Office', 'Shop', 'Jobs'],
      // stuff: [],
    }
  },
  mounted() {},
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
  },
  computed: {
    stuff() {
      var tempArr = []
      if (this.selectedSheet[0] != undefined && this.callrecords != undefined) {
        // this.selectedSheet[0].startTimestamp = this.selectedSheet[0].startTime
        tempArr.push(this.selectedSheet[0])

        this.callrecords.forEach(record => {
          // //console.log(this.selectedSheet[0].startTimestamp)
          // //console.log(record.startTime)
          // //console.log(this.selectedSheet[0].endTimestamp)

          if (
            record.startTime > this.selectedSheet[0].startTimestamp &&
            record.startTime <= this.selectedSheet[0].endTimestamp
          ) {
            record.startTimestamp = record.startTime
            record.endTimestamp = record.endTime
            record.icon = 'mdi-phone'
            if ((record.disposition = 'Answered')) {
              record.color = 'sucess'
            } else {
              record.color = 'error'
            }
            record.type = 'phone-call'
            tempArr.push(record)
          }
        })
        return tempArr
        // }
        // return tempAr
        // })
      } else {
        return tempArr
      }
    },
    // stuff() {
    // var vm = this
    // if (vm.selectedSheet[0] != undefined) {
    //   if (this.selectedSheet[0] != undefined) {
    //     // //console.log(vm.callrecords.length)
    //     var items = vm.callrecords.filter(function(e) {
    //       // e.startTimestamp = e.startTime
    //       if (
    //         moment(e.startTimestamp) > moment(vm.selectedSheet[0].startTimestamp) &&
    //         moment(e.startTimestamp) < moment(vm.selectedSheet[0].endTimestamp)
    //       ) {
    //         //console.log('hit')
    //         return e
    //       } else {
    //       }
    //     })
    //     return items
    //   } else {
    //     return []
    //   }
    // }
    // return {}
    // },
  },
  watch: {
    // weekSheets(val) {
    //   this.selectedSheet = val[0]
    // },
    selectedSheet(val) {
      if (this.callrecords != undefined) {
        //console.log('asdf')
        this.stuff = this.callrecords.filter(sheet => {
          //console.log(this.callrecords)
          if (record.startTimestamp < val.endTime && record.startTimestamp > val.startTime) {
            //console.log('praise jesus')
            this.dailies.push(record)
          }
        })
      }
    },
  },
  // //console.log(new moment(this.selectedSheet[0].startTime).dayOfYear())
  // var stuff = { timesheets: [], callrecords: [] }
  // var stsstarttime = new moment(this.selectedSheet[0].startTime)
  // var stsendtime = new moment(this.selectedSheet[0].endTime)
  // var myrecords = []

  // this.callrecords.forEach(record => {
  //   if (record.employee != undefined) {
  //     // //console.log(record.employee)
  //     // if (record.employee == vm.user.id || record.employee == 'WE8hmk7g4O') {
  //     // //console.log(record.startTimePretty)
  //     if (record.disposition == 'Answered') {
  //       record.icon = 'mdi-phone'
  //       record.color = 'success'
  //     } else {
  //       record.icon = 'mdi-phone'
  //       record.color = 'error'
  //     }
  //     if (record.endTime == undefined) {
  //       record.active = true
  //     } else {
  //       record.active = false
  //     }
  //     // //console.log(record)
  //     record.startTimestamp = record.startTime
  //     record.endTimestamp = record.endTime
  //     myrecords.push(record)
  // }/
  // }/
  // })
  // },
  // },
}
</script>
<style lang="scss" scoped>
.v-application {
  margin-left: 12px !important;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1dafec;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #194b71;
}
</style>
