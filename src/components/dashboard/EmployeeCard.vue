<template>
  <div>
    <v-card dense class="mx-auto my-0 py-0" height="80" width="260" outlined>
      <v-list-item one-line dense>
        <v-list-item-content>
          <div style="color: $primary;" class="headline mx-0">{{ employee.firstName }}</div>
          <v-list-item-title class="overline mx-0">{{ employee.lastLocation }}</v-list-item-title>
          <!-- <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>s -->
        </v-list-item-content>

        <v-list-item-avatar size="60">
          <img v-if="employee.avatar != undefined" :src="employee.avatar.url" />
          <img v-else src="@/assets/img/defaultProfile.jpg" />
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: ['color', 'active', 'employee'],
  name: 'EmployeeCard',
}
</script>

<style></style>
