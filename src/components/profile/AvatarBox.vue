<template>
  <v-row flat class="d-flex justify-start flex-nowrap">
    <v-card flat tile class=" flex-shrink-1 mt-6">
      <v-hover v-slot:default="{ hover }">
        <v-img
          id="pick-avatar"
          v-if="user.avatar != undefined"
          class=" mt-0"
          align="left"
          width="280"
          height="260"
          :src="user.avatar.url || '@/assets/defaultProfile.jpg'"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex justify-start transition-fast-in-fast-out black darken-2 v-card--reveal headline white--text"
              style="height: 40%; width:100%"
            >
              <h1>Upload image</h1>
            </div>
          </v-expand-transition>
        </v-img>
        <v-img
          id="pick-avatar"
          v-else
          class=" mt-0"
          align="left"
          width="280"
          height="260"
          src="@/assets/img/defaultProfile.jpg"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex justify-start transition-fast-in-fast-out black darken-2 v-card--reveal headline white--text"
              style="height: 40%; width:100%"
            >
              <h1>Upload image</h1>
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
      <avatar-cropper
        class="pt-1"
        dark
        :upload-handler="handleUpload"
        :labels="{ submit: 'submit', cancel: 'cancel' }"
        trigger="#pick-avatar"
        @uploading="handleUploading"
        @uploaded="handleUploaded"
        @completed="handleCompleted"
        @changed="changed"
        @error="handlerError"
      />
    </v-card>
    <v-card flat class="pt-4 ">
      <v-list two-line>
        <v-list-item class="d-flex align-start mb-2">
          <!-- <v-list-item-avatar> -->
          <!-- <v-icon color="blue darken-2" class="pr-0 mr-0">fa-phone</v-icon> -->
          <!-- </v-list-item-avatar> -->
          <v-list-item-icon class="pb-3 mr-4  mx-0 px-0">
            <v-icon>mdi-phone</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="d-flex align-start">
            <v-list-item-title class="d-flex align-start" v-text="user.officePhone.ip"></v-list-item-title>
            <v-list-item-subtitle class="d-flex align-start">Deskphone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mb-2">
          <v-list-item-icon class="pb-3 mr-4">
            <v-icon>mdi-phone</v-icon>
          </v-list-item-icon>
          <!-- <v-list-item-avatar>
            <v-icon class="grey lighten-1 white--text" v-text=""
              >fa-phone</v-icon
            >
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title class="d-flex align-start" v-text="user.cellPhone"></v-list-item-title>
            <v-list-item-subtitle class="d-flex align-start">Cellphone</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mb-2">
          <!-- <v-list-item-avatar class="mb-2">
            <v-icon class="grey lighten-1 white--text" v-text="">fa-at</v-icon>
          </v-list-item-avatar> -->
          <v-list-item-icon class="pb-5 mr-4 mb-3">
            <v-icon class="mb-1">mdi-email-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-start" v-text="user.email"></v-list-item-title>
            <v-list-item-subtitle class="d-flex align-start">Email</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-row class="d-flex align-start no-wrap  ma-0 pa-0 ">
          <v-list-item dense style="max-width:  120px;" class=" ma-0 pa-0 mt-6">
            <v-list-item-content :color="user.isClocked ? 'error' : 'success'" class="d-flex align-end ml-2 ma-0 pa-0">
              <v-list-item-title
                :color="user.isClocked ? 'error' : 'success'"
                class="d-flex align-start subtitle ma-0 pa-0"
                >Clock
                {{ user.isClocked ? 'in' : 'out' }}
                time:</v-list-item-title
              >
              <v-list-item-subtitle class="d-flex align-start title ma-0 pa-0">{{
                user.lastClockEvent | moment('MM/DD HH:mm')
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense style="max-width:  120px;" class=" ma-0 pa-0 ml-2 mt-6">
            <v-list-item-content class="d-flex align-end  ma-0 pa-0">
              <v-btn v-if="user.isClocked" class="pa-2" color="error" @click="punchClock">Clock Out</v-btn
              ><v-btn v-else style="max-width:  120px;" class=" pa-2" color="success" @click="punchClock"
                >Clock In</v-btn
              >
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-list>
      <!-- <div class="text-left  ml-3 ma-0 pa-0 font-weight-light	">Skills:</div> -->
      <!-- <v-row class="ml-2" style="max-width: 140;">
        <div v-for="skill in user.skillSet" :key="skill.id">
          <v-chip class="mx-1" x-small :color="skill.color"
            >{{ skill.text }}<v-icon small right>mdi-check</v-icon></v-chip
          >
        </div>
      </v-row> -->
      <v-card flat tile class=" flex-shrink-1 mt-6">
        <v-list two-line> </v-list>
      </v-card>
    </v-card>
    <v-dialog v-model="show" max-width="390">
      <v-card>
        <v-card-title v-if="user.isClocked">Scan badge to clock out</v-card-title>
        <v-card-title v-else>Scan badge to clock in</v-card-title>
        <qrcode-stream v-if="show" @decode="onDecode" />
        <img src="@/assets/img/qrcode.png" />
      </v-card>
    </v-dialog>
    <!-- </v-card> -->
  </v-row>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper'
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AvatarBox',
  props: ['user'],
  data() {
    return {
      dialog: false,
      showCam: false,
    }
  },
  components: {
    AvatarCropper,
    QrcodeStream,
  },
  computed: {
    // ...mapState('authentication', ['user']),

    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        this.show = !this.show
      },
    },
  },
  methods: {
    async onDecode(decodedString) {
      //console.log(decodedString)
      // await this.$parse.run('clock-user', {
      //   username: this.user.username,
      // })
      // ipcRenderer.send("phoneCheck");
      this.dialog = false
    },
    async onDecodeOut(decodedString) {
      //console.log(decodedString)
      // await this.$parse.run('clock-user', {
      //   username: this.user.username,
      // })
      this.punchOutDialog = false
    },
    async punchOutDialog() {
      //console.log('clock punched')
    },
    async punchClock() {
      if (process.env.NODE_ENV == 'development') {
        //console.log('punching clock in dev mode')

        await parseApi.createTimesheetForCurrentProfile()
      } else {
        this.dialog = true
      }
    },
    changed(file, reader) {
      this.reader = reader
      this.file = file.name
    },
    uploadHandler() {
      this.message = 'uploading...'
    },
    handleUploading() {
      this.message = 'uploading...'
    },
    handleUploaded() {
      this.message = 'uploading...'
    },
    userAvatar() {
      return this.user.avatar.url
    },
    async handleUpload(form) {
      this.message = 'uploading...'
      await parseApi.setUserAvatar(this.file, form)

      this.message = 'completed...'
    },
    handleCompleted(response, form, xhr) {
      //console.log(form, xhr)
      this.message = 'upload completed.'
    },
    handlerError(message, type, xhr) {
      //console.log(xhr)
      this.message = 'Oops! Something went wrong...'
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    uploadPhoto() {
      //console.log('asdf')
    },
    setErrorMessage(errorMessage) {
      this.errorMessage = errorMessage
    },
  },
}
</script>

<style lang="scss" scoped>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}

.v-list--two-line .v-list-item,
.v-list-item--two-line {
  min-height: 44px;
}
.v-form {
  margin-left: 4px;
}
.v-list--two-line .v-list-item,
.v-list-item--two-line {
  max-height: 34px;
}
.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}
.card-img-overlay {
  display: none;
  transition: all 0.5s;
}
.card-img-overlay button {
  margin-top: 20vh;
}
.card:hover .card-img-overlay {
  display: block;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
