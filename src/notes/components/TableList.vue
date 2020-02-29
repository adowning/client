<template>
  <div class="tablelist">
    <div @click="itemClick(item)" class="tableitem" :key="index" v-for="(item, index) of tableList">
      {{item.Tables_in_rosa}}
    </div>
  </div>
</template>

<script>
// TODO 自己定制开发此组件
export default {
  name: 'tablelist',
  data () {
    return {}
  },
  computed: {
    tableList () {
      console.dir()
      return this.$store.state.tableList
    }
  },
  methods: {
    itemClick (ob) {
      console.log(ob)
      this.$router.push({
        name: 'tablerows'
      })
    }
  }
}
</script>

<style lang="css" scoped>
.tablelist {
  width: 100%;
  height: auto;
}
  .tableitem {
    width: 100%;
    height: 36px;
    text-align: center;
    line-height: 36px;
  }
</style>
