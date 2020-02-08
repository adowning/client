<template>
  <v-card flat id="ActivityHistory" class="ActivityHistory flex-grow-1 flex-shrink-0">
    <v-row>
      <!-- <v-combobox v-model="select" :items="items" label="Recent Activities" dense multiple chips></v-combobox> -->
      <v-col cols="12">
        <v-combobox v-model="select" :items="items" label="Filter" multiple chips>
          <template v-slot:selection="data">
            <v-chip v-if="chip4" class="ma-2" close color="orange" label outlined @click:close="chip4 = false">
              <!-- <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                     close
                           color="orange"

   outlined
  @click:close="chip4 = false"              > -->
              <v-avatar class="accent white--text" left v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-timeline align-top dense>
      <v-slide-x-transition dense group>
        <div
          v-for="(activity, index) in activities"
          :key="activity.id || activity.callId"
          v-scroll:#scroll-target="onScroll"
        >
          <div v-if="index == 0">
            <v-timeline-item class="mb-0 align-left headline font-weight-light" hide-dot>
              <span> {{ $moment(activities[index].startTimestamp).format('MMM  Do') }}</span>
            </v-timeline-item>
          </div>
          <div v-if="index > 0">
            <v-timeline-item
              class="mb-0 align-left headline font-weight-light"
              hide-dot
              v-if="
                $moment(activities[index].startTimestamp).dayOfYear() !=
                  $moment(activities[index - 1].startTimestamp).dayOfYear()
              "
            >
              <span> {{ $moment(activities[index].startTimestamp).format('MMM Do') }}</span>
            </v-timeline-item>
          </div>

          <v-timeline-item :color="activity.color" :icon="activity.icon" fill-dot>
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
                    {{ activity.startTimestamp | moment('HH:mm') }} -
                    {{ activity.endTimestamp | moment('HH:mma') }}</span
                  ><span v-else>
                    <v-btn block text small color="red" outlined>
                      Active
                    </v-btn></span
                  >
                </div></v-col
              >
              <v-spacer></v-spacer>

              <v-col absolute style="padding-left: 0px;" class="align-right   ma-0 pa-0 font-weight-light	">
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
        </div>
      </v-slide-x-transition>
    </v-timeline>
  </v-card>
</template>
<script>
import axios from 'axios'
function filterByValue(array, string) {
  return array.filter(function(item) {
    console.log(item.type.toLowerCase(), string.toLowerCase())
    return item.type.toLowerCase() == string.toLowerCase()
  })
}
export default {
  name: 'ActivityHistory',
  props: ['timesheets', 'callrecords', 'user'],
  components: {},
  data() {
    return {
      items: ['CallRecord', 'Timesheet'],
      select: [],
      offsetTop: 0,
      chip1: true,
      chip2: true,
    }
  },
  methods: {
    onScroll(e) {
      this.offsetTop = e.target.scrollTop
    },
    async getRecording(activity) {
      axios({
        url: 'https://firebasestorage.googleapis.com/v0/b/phonerecs/o/' + activity.recordingLocation,
        method: 'GET',
        responseType: 'blob', // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'asdf.wav')
        document.body.appendChild(link)
        link.click()
      })
    },
  },
  computed: {
    sortedRecs() {
      console.log(this.callrecords[0].startTimePretty)
      console.log(this.callrecords[this.callrecords.length - 1].startTimePretty)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      console.log(x[0])
      return x
    },
    activities: {
      get() {
        var list = []
        const vm = this
        if (this.user == undefined) return
        // var timesheets = this.$store.state.timesheets.timesheets
        var mysheets = []
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
          mysheets.push(item)
        })
        // var callrecords = this.$store.state.Callrecord.callrecords
        var myrecords = []

        this.callrecords.forEach(record => {
          if (record.employee != undefined) {
            // console.log(record.employee)
            // if (record.employee == vm.user.id || record.employee == 'WE8hmk7g4O') {
            // console.log(record.startTimePretty)
            if (record.disposition == 'Answered') {
              record.icon = 'mdi-phone'
              record.color = 'success'
            } else {
              record.icon = 'mdi-phone'
              record.color = 'error'
            }

            if (record.endTime == undefined) {
              record.active = true
            } else {
              record.active = false
            }
            record.startTimestamp = record.startTime
            record.endTimestamp = record.endTime

            myrecords.push(record)
            // }/
          }
        })
        list = list.concat(mysheets, myrecords)

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
      set(value) {
        this.$store.commit('SET_VALUE', { activities: value })
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.v-timeline-item {
  padding-bottom: 12px !important;
}
.v-timeline {
  padding-top: 2px !important;
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
  cursor: pointer;
  text-decoration: none;
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
</style>
