<template>
  <v-app>
    <div>
      <div class="page-not-found-wrapper mt-20">
        <p>
          <v-icon size="80"> fa-exclamation-triangle</v-icon>
        </p>
      </div>
      <div>
        Something broke real bad like
      </div>
      <v-btn class="mt-3" color="info" to="/">try again</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'FourOhFour',
  data() {
    return {
      msg: 'Something broke',
    }
  },
}
</script>

<style lang="scss" scoped>
.page-not-found-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  margin-top: 10%;
}
</style>
