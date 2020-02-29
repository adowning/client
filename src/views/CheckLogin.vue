<template>
  <div class="splashscreen-wrapper">
    <transition appear @leave="leaveEl" @after-appear="leaveEl">
      <div class="logo-wrapper" />
    </transition>
    <div class="logo-letters-group">
      <span v-for="(item, index) in logoName" :key="index" class="logo-letter">{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isNil } from 'lodash'

export default {
  computed: mapState('authentication', ['user']),
  data: () => ({
    show: true,
    showLogin: false,
    logoName: ['B', 'U', 'I', 'L', 'T', '  ', 'F', 'O', 'R', ' ', 'A', 'N', 'D', 'R', 'E', 'W', 'S'],
  }),
  methods: {
    leaveEl(el) {},
  },
  watch: {
    user: {
      handler(user) {
        //console.log('use', user)

        if (user === undefined) return
        //console.log('igots a user')
        if (this.$route.query.redirectUrl === this.$route.path) {
          //console.log('giong to /')

          this.$router.push('/')
        }

        const redirectUrl = isNil(user)
          ? `/login?redirectUrl=${this.$route.query.redirectUrl}`
          : this.$route.query.redirectUrl
        //console.log('rdurl = ', redirectUrl)

        this.$router.push(redirectUrl)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-title {
  text-align: center;
}
</style>
