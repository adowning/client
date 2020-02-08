<template>
  <v-card class="mt-8 " flat>
    <v-list-item class="px-1 headline font-weight-light">
      Week of {{ weekLabels[weekNum] }} {{ weekSheets[0].startTimestamp | moment('YYYY') }}
    </v-list-item>

    <v-data-table
      :headers="headers"
      :items="weekSheets"
      v-model="selected"
      sort-by="startTimestamp"
      :single-select="singleSelect"
      hide-default-header
      item-key="id"
      hide-default-footer
      show-select
    >
      <template v-slot:top>
        <!-- <v-toolbar flat color="white"> -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Timesheet Request</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="submit()">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mx-3">
                  <v-col cols="12" sm="6" md="4">
                    Start
                    <v-time-picker
                      :v-model="$moment(editedItem.startTimestamp)"
                      color="green lighten-1"
                      scrollable
                      flat
                      no-title
                    ></v-time-picker>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="4">
                    End
                    <v-time-picker
                      :v-model="$moment(editedItem.endTimestamp)"
                      color="green lighten-1"
                      scrollable
                      flat
                      no-title
                    ></v-time-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <!-- <v-col class="mx-7" style="max-height:300px;">
                <v-card cols="3" flat style="min-width: 100px; max-height: 100%;" class="flex-grow-1 flex-shrink-0">
                  <v-textarea
                    background-color="amber lighten-4"
                    color="orange orange-darken-4"
                    label="Reason for Request"
                    class="mx-12"
                  ></v-textarea>
                </v-card>
              </v-col> -->
          </v-card>
        </v-dialog>
        <!-- </v-toolbar> -->
      </template>
      <template v-slot:item.action="{ item }" :activator="{ on }">
        <v-icon small class="mr-5" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-btn small color="info" class="mr-5" @click="editItem(item)">
          <v-icon small left dark>mdi-pencil-outline</v-icon>
          Edit
        </v-btn>
      </template>
      <template v-slot:item.custom="{ item }">
        {{ item.startTimestamp | moment('ddd') }}
      </template>
      <template v-slot:item.start="{ item }">
        {{ item.startTimestamp | moment('HH:mm a') }}
      </template>
      <template v-slot:item.end="{ item }">
        {{ item.endTimestamp | moment('HH:mm a') }}
      </template>
      <template v-slot:item.duration="{ item }"> {{ item.duration.hours }}h {{ item.duration.minutes }}m </template>
      <template v-slot:item.total="{}">
        <v-card class="d-flex align-content-center flex-wrap" flat tile min-height="20">
          <v-card class=" ml-3 d-flex align-center " flat tile min-height="10"> 2h</v-card>
        </v-card>
      </template>
      <template v-slot:item.activities="{ item }">
        <div>
          <v-btn x-small text left :color="item.approved ? 'success' : 'grey'" class="ma-0 white--text">
            <v-icon small right dark>{{ item.approved ? 'mdi-check' : 'mdi-clock-outline' }}</v-icon>
            {{ item.approved ? 'approved' : '' }}
          </v-btn>
        </div>
      </template>
      <template v-slot:item.locations="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="red" v-on="on">mdi-map-marker-outline</v-icon>
          </template>
          <img
            width="300px"
            :src="
              `https://maps.googleapis.com/maps/api/staticmap?center=${item.startLocation.latitude},${item.startLocation.longitude}&markers=icon:https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png%7C${item.endLocation.latitude},${item.endLocation.longitude}&zoom=15&size=250x250&maptype=roadmap&key=`
            "
          />
          <v-icon large color="primary " class="ma-5 pa-5">mdi-clock</v-icon>
          <img
            width="300px"
            :src="
              `https://maps.googleapis.com/maps/api/staticmap?center=${item.endLocation.latitude},${item.endLocation.longitude}&markers=icon:https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png%7C${item.endLocation.latitude},${item.endLocation.longitude}&zoom=15&size=250x250&maptype=roadmap&key=`
            "
          />
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TimecardsWeekTable',
  props: ['weekLabels', 'weekSheets', 'weekNum', 'timesheets'],
  data: () => ({
    dialog: false,
    sheet: false,
    singleSelect: true,
    selected: [],
    headers: [
      {
        text: 'Day',
        align: 'left',
        sortable: false,
        name: 'day',
        value: 'custom',
      },
      { text: 'Start', value: 'start', align: 'right' },
      { text: 'End', value: 'end', align: 'left' },
      { text: 'Duration', value: 'duration', align: 'right' },
      { text: '', value: 'activities' },
    ],
    editedIndex: -1,
    editedItem: {
      start: new Date(),
      end: new Date(),
      locations: 0,
      activities: 0,
      action: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },
  watch: {
    selected(val) {
      this.$emit('selected', val)
    },
    weekSheets(val) {
      this.selected = []
      if (val != undefined) this.selected[0] = val[val.length - 1]
    },
  },
  methods: {
    select() {},
    async submit() {
      // var Request = Parse.Object.extend('Request')
      // let req = new Request()
      // req.set('data', this.editedItem)
      // req.set('type', 'timesheet_change')
      // req.set('open', true)
      // await req.save
      // this.dialog = false
    },
    editItem(item) {
      this.editedIndex = this.timesheets.indexOf(item)

      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
<style scoped lang="scss">
.activeItem {
  background-color: #cfd8dc;
}
</style>
