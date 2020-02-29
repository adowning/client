<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="290" height="300">
      <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item three-line v-if="register == false">
          <v-list-item-content>
            <div class="overline ">Unknown device</div>
            <!-- <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>/ -->
            <v-list-item-subtitle>This device is not recognized. Add a new device?</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="40"><v-icon x-large>mdi-monitor-cellphone-star</v-icon></v-list-item-avatar>
        </v-list-item>
        <v-list-item three-line v-else>
          <v-list-item-content>
            <div class="overline ">Register device</div>
            <!-- <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>/ -->
            <v-list-item-subtitle class="mt-2"
              ><v-text-field label="Label" v-model="label" placeholder="eg: 'John's PC'"></v-text-field
            ></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="40"><v-icon x-large>mdi-monitor-cellphone-star</v-icon></v-list-item-avatar>
        </v-list-item>

        <v-card-actions class="`d-flex justify-center `" v-if="register == false">
          <v-btn color="success" class="mx-3" large icon @click="register = true">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="error" class="mx-3" large icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-actions class="`d-flex justify-center `" v-else>
          <v-btn color="success" class="mx-3" large icon @click="registerDevice(label)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="error" class="mx-3" large icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-show="register == true" class="mx-auto" max-width="344" outlined>
        asdf
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
      register: false,
      label: '',
    }
  },
  methods: {
    async registerDevice(label) {
      this.$store.dispatch('devices/registerDevice', label)
      function showLocation(val) {
        //console.log('val', val)
      }
    },
    showLocation(val) {
      //console.log(val)
    },
  },
}
</script>
