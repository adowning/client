<template>
  <v-app id="keep">
    <v-navigation-drawer v-model="drawer" class="grey lighten-4">
      <SideMenu></SideMenu>
    </v-navigation-drawer>
    <v-app-bar color="amber" app fixed>
      <v-icon @click="drawer = !drawer">mdi-view-stream</v-icon>
      <span class="title ml-3 mr-5">GoogleKeep</span>
      <v-spacer></v-spacer>

      <v-btn @click="handleSearch" icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>

      <v-btn @click="listChange" icon>
        <v-icon>{{ listType }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import SideMenu from './components/SideMenu'
let { ipcRenderer } = window.require('electron')

export default {
  name: 'App',
  components: {
    // HelloWorld,
    SideMenu,
  },
  props: {
    source: String,
  },
  created() {
    let me = this
    ipcRenderer.on('loadTable', (event, arg) => {
      console.log('获取到通过数据库连接加载到的列表数据')
      console.table(arg)
    })
  },
  data() {
    return {
      drawer: null,
    }
  },
  mounted() {
    let me = this
    ipcRenderer.send('renderFinish', 'from render')
    ipcRenderer.on('initNoteList', (event, arg) => {
      console.table(arg)
      me.$store.commit('setNoteList', arg)
    })
    ipcRenderer.on('initLabelList', (event, arg) => {
      console.dir(arg)
      me.$store.commit('setLabelList', arg)
    })
  },
  computed: {
    listType() {
      return this.$store.state.listType
    },
  },
  methods: {
    listChange() {
      this.$store.commit('changeListType', this.listType)
    },
    handleSearch() {
      this.$bus.$emit('showSearch')
    },
  },
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
