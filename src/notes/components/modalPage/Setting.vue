<template>
  <v-dialog v-model="dialog" persistent max-width="300px">
    <v-card>
      <v-card-title>
        <span class="headline">设置</span>
      </v-card-title>
      <v-card-text style="padding-top: 0;">
        <div class="item-container">
          <v-divider></v-divider>
          <span class="grey--text">清单运作方式</span><br />
          <v-layout align-center>
            <span>将清单项添加至底部</span>
            <v-spacer></v-spacer>
            <v-checkbox
              style="margin-top: 0; padding-top: 0;"
              v-model="isShare"
              hide-details
              class="shrink"
            ></v-checkbox>
          </v-layout>
          <v-layout align-center>
            <span>将已勾选的清单项移到底部</span>
            <v-spacer></v-spacer>
            <v-checkbox
              style="margin-top: 0; padding-top: 0;"
              v-model="isShare"
              hide-details
              class="shrink"
            ></v-checkbox>
          </v-layout>
        </div>
        <div class="item-container">
          <v-divider></v-divider>
          <span class="grey--text">自定义默认提醒时间</span><br />
          <v-layout align-center>
            <span>上午</span>
            <v-spacer></v-spacer>
            <v-text-field label="Regular"></v-text-field>
          </v-layout>
          <v-layout align-center>
            <span>下午</span>
            <v-spacer></v-spacer>
            <v-text-field label="Regular"></v-text-field>
          </v-layout>
          <v-layout align-center>
            <span>傍晚</span>
            <v-spacer></v-spacer>
            <v-text-field label="Regular"></v-text-field>
          </v-layout>
        </div>
        <div class="item-container">
          <v-divider></v-divider>
          <v-layout align-center>
            <span>启用共享功能</span>
            <v-spacer></v-spacer>
            <v-checkbox
              style="margin-top: 0; padding-top: 0;"
              v-model="isShare"
              hide-details
              class="shrink"
            ></v-checkbox>
          </v-layout>
          <!-- <span>启用共享功能<v-checkbox v-model="isShare" hide-details class="shrink mr-2"></v-checkbox></span> -->
        </div>
        <div class="item-container">
          <v-divider></v-divider>
          <v-layout align-center>
            <span>Media preview</span>
            <v-spacer></v-spacer>
            <v-checkbox
              style="margin-top: 0; padding-top: 0;"
              v-model="isRichText"
              hide-details
              class="shrink"
            ></v-checkbox>
          </v-layout>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">cancel</v-btn>
        <v-btn color="blue" @click="dialog = false">save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'setting',
  data() {
    return {
      dialog: false,
      checkbox2: false,
      isShare: false,
      isRichText: false,
    }
  },
  mounted() {
    let me = this
    this.$bus.$on('showSetting', function(arg) {
      me.dialog = true
    })
  },
}
</script>

<style scoped>
.setting-container {
}
.item-container {
  line-height: 48px;
}
</style>
