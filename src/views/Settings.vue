<template>
  <v-app>
    <v-content>
      <v-container class="pa-12" fluid>
        <v-row class="pa-12" align="start" justify="start">
          <v-col>
            <!-- <v-card height="200" class="pa-2" outlined tile></v-card> -->
          </v-col>
          <v-col>
            <v-card class="mx-auto" width="444" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Settings</div>
                  <v-list-item-title class="overline mb-1">Darkmode</v-list-item-title>
                  <v-list-item-subtitle>Join the darkside</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-switch
                      v-model="dark"
                      label="Darkmode"
                      color="black"
                      value="primary"
                      class="ml-2"
                      hide-details
                    ></v-switch>
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar tile size="40">
                  <v-icon>mdi-settings</v-icon>
                </v-list-item-avatar>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col>
            <!-- <v-card class="pa-2" outlined tile></v-card> -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dark: false,
    }
  },
  watch: {
    dark(val) {},
  },
}
</script>

<style></style>
