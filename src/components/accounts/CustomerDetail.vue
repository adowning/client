<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-list-item-action class="mx-0 mr-4" style="max-width: 10px;">
          <v-btn v-on="on" icon style="max-width: 10px;">
            <v-icon color="info">mdi-information-outline</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
      <v-card color="#1E1E2E">
        <v-card-title class="mt-6 headline" color="#27293D" style="background-color: #27293D;" primary-title>
          Privacy Policy
        </v-card-title>

        <v-card-text>
          {{ customer }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['customer'],
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
