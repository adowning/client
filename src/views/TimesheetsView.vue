<template>
  <transition name="fade" mode="out-in">
    <v-row flat class="d-flex justify-start  ml-2 mt-10 mr-8">
      <v-card flat style="min-width: 200px; max-width: 50%; no-wrap" class="flex-grow-1 flex-shrink-0 ml-8 pa-2">
        <v-row class="justify-start ml-12" style="min-width: 100%;">
          <v-card flat tile class="ml-12">
            <v-list-item class="mx-0 pa-0">
              <v-list-item-icon class="mx-0 px-0" @click="monthDelta += 1">
                <v-icon large>mdi-chevron-left</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
          <v-card flat class="pa-0 " tile>
            <v-list-item class="mx-0 px-0">
              <v-list-item-icon class="mx-0 px-0" @click="monthDelta -= 1">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
          <v-card flat class="ml-4 no-wrap" tile>
            <v-row>
              <v-list-item max-width="120px">
                <v-list-item-icon class="mr-1 px-1 headline font-weight-light">
                  <v-icon class="mr-3">mdi-calendar</v-icon>
                  {{ this.$moment().subtract(monthDelta, 'months') | moment('MMMM YYYY') }}
                </v-list-item-icon>
              </v-list-item>
            </v-row>
          </v-card>
        </v-row>

        <v-slider
          v-model="weekNum"
          :max="weekLabels.length"
          :tick-labels="weekLabels"
          ticks
          color="#2BACE2"
          track-color="#164B73 lighten-1"
        >
          <template v-slot:thumb-label="props">
            <v-icon dark>
              {{ weekHours }}
            </v-icon>
          </template>
        </v-slider>
        <v-row>
          <TimecardsWeekTable
            @selected="selected"
            :weekNum="weekNum"
            :weekLabels="weekLabels"
            :weekSheets="weekSheets"
          />
        </v-row>
      </v-card>
      <v-card flat style="min-width: 200px; max-width:50%; no-wrap" class="flex-grow-1 flex-shrink-0 mr-4 pa-2">
        <TimecardsDetail :selectedSheet="selectedSheet" :timesheets="timesheets" :callrecords="callrecords" />
      </v-card>
    </v-row>
  </transition>
</template>

<script>
import TimecardsWeekTable from '@/components/timesheets/TimesheetsWeekTable'
import TimecardsDetail from '@/components/timesheets/TimesheetDetail'
import moment from 'moment'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Timesheets',
  components: { TimecardsWeekTable, TimecardsDetail },
  data: function() {
    // inhouseSeries: [44, 55, 41, 17, 15],
    return {
      monthDelta: 0,
      weekNum: 0,
      selectedSheet: {},
      manage: true,
      activities: [],
      select: [],
    }
  },
  computed: {
    ...mapState('timesheets', ['timesheets']),
    ...mapState('callrecords', ['callrecords']),
    // activities() {
    //   if (this.timesheets.length && this.callrecords.length) {
    //     var acts = this.timesheets.concat(this.callrecords)
    //     return acts
    //   } else {
    //     return []
    //   }
    // },
    weekHours() {
      var total = 0
      this.weekSheets.forEach(sheet => {
        total += sheet.duration.hours * 60 + sheet.duration.minutes
        //console.log(this.$moment(sheet.inTimestamp).format('ddd hh:mm a'))
      })
      return Math.round(total / 60)
    },
    weekLabels() {
      var start = this.$moment()
        .subtract(this.monthDelta, 'months')
        .startOf('month')
        .weeks()
      var end = this.$moment()
        .subtract(this.monthDelta, 'months')
        .endOf('month')
        .weeks()
      var weeks = []
      var weekobjects = []
      for (var i = start; i < end; i++) {
        var week = this.$moment()
          .subtract(this.monthDelta, 'months')
          .week(i)
          .startOf('week')
        var weekObject = {}
        weekObject.val = week
        weekObject.label = week.format('ddd DD')
        var addon = 'th'
        if (week.date() == 1) {
          addon = 'st'
        }
        if (week.date() == 2 || week.date() == 22) {
          addon = 'nd'
        }
        if (week.date() == 3 || week.date() == 23) {
          addon = 'rd'
        }
        weeks.push(week.format('MMM D') + addon)
        weekobjects.push(week)
      }
      return weeks
    },
    weekSheets: {
      get: function() {
        var weekSheets = []
        var firstofweek = this.$moment()
          .subtract(this.monthDelta, 'months')
          .startOf('month')
          .add(this.weekNum, 'weeks')
          .valueOf()
        var endofweek = this.$moment()
          .subtract(this.monthDelta, 'months')
          .startOf('month')
          .add(this.weekNum, 'weeks')
          .endOf('week')
          .valueOf()
        if (this.timesheets != null) {
          this.timesheets.forEach(card => {
            if (card.startTimestamp < endofweek && card.startTimestamp >= firstofweek) {
              weekSheets.push(card)
            }
          })
        } else {
          weekSheets = null
        }

        return weekSheets
      },
      set: function(newValue) {
        this.weekNum = newValue
      },
    },
  },
  watch: {
    weekNum(val) {
      if (this.timecards != null) {
        this.weekDelta = val
      }
    },
    selectedSheet() {},
    month() {
      //
      if (this.timecards != null) {
        this.weekDelta = 0
      }
    },
  },
  methods: {
    selected(val) {
      this.selectedSheet = val
    },
    getDifference(start, end) {
      var mend = this.$moment(end * 1000)
      var mstart = this.$moment(start * 1000)
    },
    weekOfMonth(m) {
      return (
        m.week() -
        this.$moment(m)
          .startOf('month')
          .week() +
        1
      )
    },
  },
}
</script>

<style scoped>
.v-list-item {
  margin: 5px;
  border-radius: 4px;
}
.v-expansion-panel-header {
  background: #27293d;
}
.v-expansion-panel-header:hover {
  background: #27293d !important;
}
/* .v-list-item:active {
    background: yellow;
  } */
</style>
