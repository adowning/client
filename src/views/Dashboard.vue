<template>
  <v-container id="dashboard" class="mt-6 ma-0 pa=0 ml-10 mr-0">
    <online-now />
  </v-container>
  <!-- </div> -->
</template>

<script>
import moment from 'moment'
import OnlineNow from '@/components/dashboard/OnlineNow'
import { mapState, mapActions, mapGetters } from 'vuex'
import { getTimesheetsByUser } from '../api/parseApi'
import { generateUserStats } from '../util/helpers'
import Parse from 'parse'
export default {
  name: 'Dashboard',
  components: {
    OnlineNow,
  },
  data: function() {
    return {}
  },

  computed: {
    // ...mapGetters('timesheets', ['getTimesheetsByUserId']),
    ...mapState('profiles', ['profiles']),
    ...mapState('callrecords', ['callrecords'], 'authentication', ['user']),
    ...mapState('timesheets', ['timesheets']),
    series() {
      var series = []
      series[0] = 1
      series[1] = 1
      if (this.callrecords.length) {
        this.callrecords.map(call => (call.disposition == 'Answered' ? series[0]++ : series[1]++))
        this.callrecords.forEach(call => {
          if (call.disposition == 'Answered') {
            series[0]++
          } else {
            series[1]++
          }
        })
        return series
      } else {
        return null
      }
    },
    rawstats() {
      var stats = {}
      stats.calls = []
      stats.disposition = {
        answered: [],
        missed: [],
      }
      if (
        this.callrecords != null &&
        this.timesheets != null &&
        this.timesheets != undefined &&
        this.callrecords != undefined
      ) {
        if (this.callrecords.length && this.timesheets.length) {
          var tsheets = this.timesheets.filter(function(sheet) {
            return moment(sheet.startTimestamp) > new moment().subtract(90, 'days')
          })
          var calls = this.callrecords.filter(function(callrecord) {
            // //console.log(moment(callrecord.startTime))
            return moment(callrecord.startTime) > new moment().subtract(90, 'days')
          })
          var i = 0
          // //console.log(tsheets.length)
          // //console.log(calls.length)
          // for (var x = 0; x < 90; x++) {
          // var now = moment()
          // var day = now.subtract(x, 'days')
          var logToday = false
          calls.forEach(call => {
            // stats.calls.add(call)
            // //console.log(moment(call.startTime).hour())
            if (call.disposition == 'Cancelled') {
              stats.disposition.missed.push(call)
              this.addMissedCall()
            }
            if (call.disposition == 'Answered') {
              this.addAnsweredCall()
              stats.disposition.answered.push(call)
            }
          })

          // tsheets.forEach(sheet => {
          //   if (now.isSame(sheet.startTime, 'days')) {
          //     logToday = true
          //     var start = sheet.startTime
          //     // //console.log(i++)
          //     calls.forEach(call => {
          //       if (call.starTime < sheet.endTimestamp && call.startTime >= sheet.starTimestamp) {
          //         stats.calls.add(call)
          //         //console.log(call)
          //         if (call.disposition == 'Missed') {
          //           stats.disposition.missed.push(call)
          //           this.addMissedCall()
          //         }
          //         if (call.answered == 'Answered') {
          //           this.addAnsweredCall()
          //           stats.disposition.answered.push(call)
          //         }
          //       }
          //     })
          //   }
          // })
          // }
        }
        // var arr = []
        // arr[0] = stats.disposition.answered.length
        // arr[1] = stats.disposition.missed.length
        // stats.donut = arr
      }
      return stats
    },
  },
  async mounted() {
    // this.timesheets = getTimesheetsByUser(this.user.objectId)
    // //console.log(this.$store)
    // var stats = await generateUserStats(this.$store)
    this.$electron.ipcRenderer.on('get-machine-id', (event, data) => {
      // //console.log(data)
    })
  },

  watch: {
    rawstats(val) {
      if (val.length) {
        this.stats = generateUserStats(rawstats)
      }
    },
    // callrecords(val) {
    //   //console.log(val.length)
    //   if (val.length) {
    //     this.stats = generateUserStats(this.$store)
    //   }
    // },
  },
  methods: {
    addMissedCall: function() {
      // var arr = this.series.slice()
      this.series[0]++
    },
    addAnsweredCall() {
      this.series[1]++
    },
    removeData: function() {
      if (this.series.length === 1) return
      var arr = this.series.slice()
      arr.pop()
      this.series = arr
    },
    // updateChart() {
    //   const max = 90
    //   const min = 20
    //   const newData = this.series[0].data.map(() => {
    //     return Math.floor(Math.random() * (max - min + 1)) + min
    //   })
    //   const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
    //   // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
    //   this.chartOptions = {
    //     colors: [colors[Math.floor(Math.random() * colors.length)]],
    //   }
    //   // In the same way, update the series option
    //   this.series = [
    //     {
    //       data: newData,
    //     },
    //   ]
    // },
  },

  head() {
    return {
      title: {
        inner: 'Dashboard',
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} Dashboard page`,
          id: 'desc',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
}
</style>
