<template>
  <div>
    <!-- <v-container fluid> -->
    <!-- <v-row class="mx-0 px-0">
      <v-combobox v-model="select" :items="items" label="Filter" dense multiple chips></v-combobox>
    </v-row> -->
    <!-- </v-container> -->
    <v-timeline align-top dense class="pt-3">
      <!-- <v-timeline-item hide-dot> </v-timeline-item> -->
      <v-container id="scroll-target" style="max-height: 480px" class="overflow-y-auto ma-0 pa-0">
        <v-lazy
          v-model="isActive"
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-slide-x-transition dense group>
            <div
              v-for="(activity, index) in activities"
              :key="activity.id || activity.callId || activity.startTimestamp + index"
              v-scroll:#scroll-target="onScroll"
            >
              <div v-if="index == 0" class="mt-0 pt-0">
                <v-timeline-item class="mb-0 align-left headline font-weight-light" hide-dot>
                  <span> {{ $moment(activities[index].startTimestamp).format('MMM  Do') }}</span>
                </v-timeline-item>
              </div>

              <div v-if="index > 0">
                <v-timeline-item
                  class="my-0 align-left headline font-weight-light"
                  hide-dot
                  v-if="
                    $moment(activities[index].startTimestamp).dayOfYear() !=
                      $moment(activities[index - 1].startTimestamp).dayOfYear()
                  "
                >
                  <span> {{ $moment(activities[index].startTimestamp).format('MMM Do') }}</span>
                </v-timeline-item>
              </div>
              <v-hover>
                <template v-slot="{ hover }">
                  <v-timeline-item
                    :style="`background-color: ${hover ? '#F5F5F5' : 'white'}`"
                    :color="activity.color"
                    :icon="activity.icon"
                  >
                    <v-row dense style="width: 100%;">
                      <v-col class="align-left" cols="3">
                        <div
                          class="text-left  ma-0 pa-0 font-weight-light	"
                          :class="{
                            pulsate: activity.active,
                          }"
                        >
                          <span class="overline" v-if="!activity.active">
                            <!-- {{ activity.startTimestamp | moment('MM/DD/YYYY') }} | -->
                            {{ activity.startTimestamp | moment('HH:mm') }} -
                            {{ activity.endTimestamp | moment('HH:mma') }}</span
                          ><span v-else>
                            <v-btn block text small color="red" outlined>
                              Active
                            </v-btn></span
                          >
                        </div>
                      </v-col>
                      <v-col class="align-left" cols="5">
                        <div
                          class="text-left  ma-0 pa-0 font-weight-light	"
                          :class="{
                            pulsate: activity.active,
                          }"
                        >
                          <div v-if="activity.type == 'callrecord'">
                            <v-btn
                              class="overline"
                              x-small
                              color="primary"
                              text
                              v-if="!activity.active"
                              :to="`customers/${activity.id}`"
                            >
                              <!-- {{ activity.startTimestamp | moment('MM/DD/YYYY') }} | -->
                              {{ activity.partner }} </v-btn
                            ><span v-else>
                              <v-btn block text small color="red" outlined>
                                Active
                              </v-btn></span
                            >
                          </div>
                        </div>
                      </v-col>
                      <v-spacer></v-spacer>

                      <v-col class="align-left   ma-0 pa-0 font-weight-light	" width="10">
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
                            <v-btn color="success" dark outlined x-small v-on="on" @clicked="getRecording(activity)">
                              <v-icon small @clicked="getRecording(activity)">mdi-volume-high</v-icon>
                            </v-btn>
                          </template>
                          <v-card tile>
                            <!-- <v-progress-linear
                        :value="50"
                        class="my-0"
                        height="3"
                      ></v-progress-linear> -->

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

                                <v-list-item-icon class="ml-0" :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
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
                  </v-timeline-item>
                </template>
              </v-hover>
            </div>
          </v-slide-x-transition>
        </v-lazy>
      </v-container>
      <!-- 
            <v-timeline-item
              class="mb-1"
              color="grey"
              icon-color="grey lighten-2"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7">This order was archived.</v-col>
                <v-col class="text-right" cols="5">15:26 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item small>
              <v-row justify="space-between">
                <v-col cols="7">
                  <v-chip class="white--text ml-0" color="purple" label small>
                    APP
                  </v-chip>
                  Digital Downloads fulfilled 1 item.
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="grey" small>
              <v-row justify="space-between">
                <v-col cols="7">
                  Order confirmation email was sent to John Leider
                  (john@vuetifyjs.com).
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="grey" small>
              <v-row justify="space-between">
                <v-col cols="7">
                  A $15.00 USD payment was processed on PayPal Express Checkout
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="grey" small>
              <v-row justify="space-between">
                <v-col cols="7">
                  John Leider placed this order on Online Store (checkout
                  #1937432132572).
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
    </v-timeline-item>-->
    </v-timeline>
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
// import { downloadRecording } from '@/utils/calls'

function filterByValue(array, string) {
  return array.filter(function(item) {
    //console.log(item.type.toLowerCase(), string.toLowerCase())
    return item.type.toLowerCase() == string.toLowerCase()
  })
  // return array.filter(o =>
  //   Object.keys(o).some(k =>
  //     o['type'].toLowerCase().includes(string.toLowerCase())
  //   )
  // )
}
export default {
  name: 'ActivityHistory',
  components: {
    // AvatarBox,
    // ProfileForm
    // 'vue-audio': VueAudio
  },
  props: ['user', 'timesheets', 'callrecords'],

  data() {
    return {
      items: ['CallRecord', 'Timesheet'],
      select: [],
      isActive: false,
      offsetTop: 0,
      activities: [],
    }
  },
  mounted() {
    this.generateList()
  },
  methods: {
    generateList() {
      var lastThirty = moment()
        .add(-7, 'days')
        .valueOf()
      var list = this.timesheets.concat(this.callrecords)
      list = list.sort((a, b) => b.startTimestamp - a.startTimestamp)
      list.forEach(item => {
        if (item.type == 'timesheet') {
          if (item.location == undefined) item.location = 'Store'
          item.icon = 'mdi-clock-outline'
          item.color = 'primary'
          if (item.endTimestamp == undefined) {
            item.active = true
          } else {
            item.active = false
          }
        }
        if (item.type == 'callrecord') {
          if (item.disposition == 'Answered') {
            item.icon = 'mdi-phone-check'
            item.color = 'accent'
          } else {
            item.icon = 'mdi-phone-missed'
            item.color = 'error'
          }
          if (item.endTimestamp == undefined) {
            item.active = true
          } else {
            item.active = false
          }
        }
        if (item.startTimestamp > lastThirty) this.activities.push(item)
      })
      this.timesheets.forEach(item => {
        if (item.location == undefined) {
          item.location = 'Store'
        }
        item.icon = 'mdi-clock-outline'
        item.color = 'primary'
        if (item.endTimestamp == undefined) {
          item.active = true
        } else {
          item.active = false
        }
        list.push(item)
      })
      var myrecords = []
      this.callrecords.forEach(record => {
        record.startTimestamp = record.startTime
        record.endTimestamp = record.endTime
        if (record.disposition == 'Answered') {
          record.icon = 'mdi-phone-check'
          record.color = 'accent'
        } else {
          record.icon = 'mdi-phone-missed'
          record.color = 'error'
        }
        if (record.endTimestamp == undefined) {
          record.active = true
        } else {
          record.active = false
        }
      })
      list = list.concat(this.timesheets, this.callrecords)
      list = list.sort((a, b) => b.startTimestamp - a.startTimestamp)
      if (this.select.length > 0) {
        var activities = []
        for (var type of this.select) {
          var arr = filterByValue(list, type)
          activities = activities.concat(arr)
        }
        return activities
      } else {
        return list
      }
    },
    addActivity() {
      this.activities.push(activity)
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    // async getRecording(activity) {
    //   //console.log('asdf', activity)
    //   axios({
    //     url: 'https://firebasestorage.googleapis.com/v0/b/phonerecs/o/' + activity.recordingLocation,
    //     method: 'GET',
    //     responseType: 'blob', // important
    //   }).then(response => {
    //     //console.log(response)
    //     const url = window.URL.createObjectURL(new Blob([response.data]))
    //     const link = document.createElement('a')
    //     link.href = url
    //     link.setAttribute('download', 'asdf.wav')
    //     document.body.appendChild(link)
    //     link.click()
    //   })

    //   // var dl = await downloadRecording(activity)
    //   // //console.log(dl)
    // },
  },
  computed: {
    //   activities: {
    //     get() {
    //       var list = []
    //       var timesheets = this.$store.state.timesheets.timesheets
    //       timesheets.forEach(item => {
    //         if (item.location == undefined) {
    //           item.location = 'Store'
    //         }
    //         item.icon = 'mdi-clock-outline'
    //         item.color = 'primary'
    //         if (item.endTimestamp == undefined) {
    //           item.active = true
    //         } else {
    //           item.active = false
    //         }
    //       })
    //       var callrecords = this.$store.state.callrecords.callrecords
    //       var myrecords = []
    //       callrecords.forEach(record => {
    //         // if (record.employee != undefined) {
    //         // if (record.employee.id == this.user.id || record.employee.id == 'WE8hmk7g4O') {
    //         if (record.disposition == 'Answered') {
    //           record.icon = 'mdi-phone-check'
    //           record.color = 'accent'
    //         } else {
    //           record.icon = 'mdi-phone-missed'
    //           record.color = 'error'
    //         }
    //         if (record.endTimestamp == undefined) {
    //           record.active = true
    //         } else {
    //           record.active = false
    //         }
    //         myrecords.push(record)
    //         // }d
    //         // }
    //       })
    //       // callrecords.forEach(item => {
    //       //   item.icon = 'fa-clock'
    //       //   item.color = 'primary'
    //       //   if (item.endTimestamp == undefined) {
    //       //     item.active = true
    //       //   } else {
    //       //     item.active = false
    //       //   }
    //       // })
    //       list = list.concat(timesheets, myrecords)
    //       list = list.sort((a, b) => b.startTimestamp - a.startTimestamp)
    //       if (this.select.length > 0) {
    //         var activities = []
    //         for (var type of this.select) {
    //           var arr = filterByValue(list, type)
    //           activities = activities.concat(arr)
    //         }
    //         return activities
    //       } else {
    //         return list
    //       }
    //     },
    //     set(value) {
    //       this.$store.commit('SET_VALUE', { activities: value })
    //     },
  },
  watch: {
    timecards(val) {
      console.log(val)
      if (item.location == undefined) item.location = 'Store'
      item.icon = 'mdi-clock-outline'
      item.color = 'primary'
      if (item.endTimestamp == undefined) {
        item.active = true
      } else {
        item.active = false
      }
      this.activities.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents
            .split(' ')
            .map(v => v.charAt(0))
            .join('')}`
        }),
      })
    },
    callrecords(val) {
      this.activities.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents
            .split(' ')
            .map(v => v.charAt(0))
            .join('')}`
        }),
      })
    },
  },
}
</script>
<style scoped>
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
.pulsate {
  -webkit-animation: pulsate 3s ease-out;
  -webkit-animation-iteration-count: infinite;
  color: red;
  float: center;
  opacity: 0.5;
}
@-webkit-keyframes pulsate {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
.pulse {
  border: 1px transparent;

  -webkit-border-radius: 4px;
  border-radius: 4px;
  /* color: #eeeeee; */
  cursor: pointer;
  /* display: inline-block; */
  /* font-family: Arial; */
  /* font-size: 20px; */
  /* padding: 8px 30px; */
  /* text-align: center; */
  text-decoration: none;
  /* margin-left: 20px; */
  -webkit-animation: glowing 2200ms infinite;
  -moz-animation: glowing 2200ms infinite;
  -o-animation: glowing 2200ms infinite;
  animation: glowing 2200ms infinite;
}
@-webkit-keyframes glowing {
  0% {
    /* background-color: #0091b2; */
    -webkit-box-shadow: 0 0 3px #af082a;
  }
  50% {
    /* background-color: #21c7ed; */
    -webkit-box-shadow: 0 0 15px #e8788e;
  }
  100% {
    /* background-color: #0091b2; */
    -webkit-box-shadow: 0 0 3px #af082a;
  }
}
@keyframes glowing {
  0% {
    /* background-color: #0091b2; */
    box-shadow: 0 0 3px #af082a;
  }
  50% {
    /* background-color: #21c7ed; */
    box-shadow: 0 0 15px #e8788e;
  }
  100% {
    /* background-color: #0091b2; */
    box-shadow: 0 0 3px #af082a;
  }
}

/* 
@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  } */
/* } */
</style>
