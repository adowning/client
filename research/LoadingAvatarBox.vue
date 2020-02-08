<template>
  <div>
    <div style="height: 500px; background-color: red;"></div>
    <!-- <v-row>
      <v-card flat transparent width="280" height="260">
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
            src="@/assets/defaultProfile.jpg"
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

      <v-card v-if="user != undefined && user" flat class="pt-4 pl-2">
        <v-list two-line>
          <v-list-item class="d-flex align-start mb-2">
            <v-list-item-icon class="pb-3 mr-4  mx-0 px-0">
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="d-flex align-start">
              <v-list-item-title class="d-flex align-start" v-text="user.officePhoneInfo.ip"></v-list-item-title>
              <v-list-item-subtitle class="d-flex align-start">Deskphone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mb-2">
            <v-list-item-icon class="pb-3 mr-4">
              <v-icon>mdi-phone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="d-flex align-start" v-text="user.cellPhone"></v-list-item-title>
              <v-list-item-subtitle class="d-flex align-start">Cellphone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mb-2">
            <v-list-item-icon class="pb-5 mr-4 mb-3">
              <v-icon class="mb-1">mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="d-flex align-start" v-text="user.email"></v-list-item-title>
              <v-list-item-subtitle class="d-flex align-start">Email</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="text-left  ml-3 ma-0 pa-0 font-weight-light	">Skills:</div>
        <v-row class="ml-2" style="max-width: 140;">
          <div v-for="skill in user.skillSet" :key="skill.id">
            <v-chip class="mx-1" x-small :color="skill.color"
              >{{ skill.text }}<v-icon small right>mdi-check</v-icon></v-chip
            >
          </div>
        </v-row>
        <v-card flat class="mt-3">
          <v-list two-line>
            <v-list-item dense>
              <v-list-item-content>
                <v-btn v-if="user.isClocked" class="pa-2" outlined color="error" @click="punchClock">Clock Out</v-btn
                ><v-btn v-else class="pa-2" outlined color="success" @click="punchClock">Clock In</v-btn>
              </v-list-item-content>
              <v-list-item-content
                :color="user.isClocked ? 'error' : 'success'"
                class="d-flex align-end ml-9 ma-0 pa-0"
              >
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
          </v-list>
        </v-card>
      </v-card>
    </v-row>
    <v-dialog v-model="show" max-width="390">
      <v-card>
        <v-card-title v-if="user.isClocked">Scan badge to clock out</v-card-title>
        <v-card-title v-else>Scan badge to clock in</v-card-title>
        <qrcode-stream v-if="show" @decode="onDecode" />
        <img src="@/assets/qrcode.png" />
      </v-card>
    </v-dialog> -->
  </div>
</template>

<script>
// import AvatarCropper from 'vue-avatar-cropper'
// import { QrcodeStream } from 'vue-qrcode-reader'
// import { ipcRenderer } from 'electron'

export default {
  name: 'LoadingAvatarBox',
  data() {
    return {
      dialog: false,
      showCam: false,
      user: {
        addressList: {
          street: 'loading...',
          city: 'loading...',
          formattedAddress: 'loading...',
          geoPoint: { lat: 0, lng: -0 },
          state: 'loading...',
          street: 'loading...',
          streetNumber: 'loading...',
          zipcode: 'loading...',
        },
      },
      avatar: { url: '../../assets/img/defaultProfile.jpg' },
      email: 'loading...',
      firstName: 'loading...',
      lastName: 'loading...',
      officePhoneInfo: { ip: 'loading...' },
      phoneList: ['loading...'],
    }
  },

  components: {
    // AvatarCropper,
    // QrcodeStream,
  },
  computed: {
    // show: {
    //   get() {
    //     return this.value
    //   },
    //   set(value) {
    //     this.$emit('input', value)
    //     this.show = !this.show
    //   },
    // },
  },
  methods: {
    //   async onDecode(decodedString) {
    //     console.log(decodedString)
    //     await this.$parse.run('clock-user', {
    //       username: this.user.username,
    //     })
    //     // ipcRenderer.send("phoneCheck");
    //     this.dialog = false
    //   },
    //   async onDecodeOut(decodedString) {
    //     console.log(decodedString)
    //     await this.$parse.run('clock-user', {
    //       username: this.user.username,
    //     })
    //     this.punchOutDialog = false
    //   },
    //   async punchOutDialog() {
    //     console.log('clock punched')
    //   },
    //   async punchClock() {
    //     if (process.env.NODE_ENV == 'development') {
    //       console.log('punching clock in dev mode')
    //       await await Parse.Cloud.run('clock-user', {
    //         username: 'ashdowning',
    //       })
    //     } else {
    //       this.dialog = true
    //     }
    //   },
    //   changed(file, reader) {
    //     this.reader = reader
    //     this.file = file.name
    //   },
    //   uploadHandler() {
    //     this.message = 'uploading...'
    //   },
    //   handleUploading() {
    //     this.message = 'uploading...'
    //   },
    //   handleUploaded() {
    //     this.message = 'uploading...'
    //   },
    //   async handleUpload(form) {
    //     this.$parseFile = new Parse.File(this.file, {
    //       base64: form.image.currentSrc,
    //     })
    //     var user = Parse.User.current()
    //     user.set('avatar', this.$parseFile)
    //     await user.save()
    //   },
    //   handleCompleted(response, form, xhr) {
    //     console.log(form, xhr)
    //     this.message = 'upload completed.'
    //   },
    //   handlerError(message, type, xhr) {
    //     console.log(xhr)
    //     this.message = 'Oops! Something went wrong...'
    //   },
    //   validate() {
    //     if (this.$refs.form.validate()) {
    //       this.snackbar = true
    //     }
    //   },
    //   reset() {
    //     this.$refs.form.reset()
    //   },
    //   resetValidation() {
    //     this.$refs.form.resetValidation()
    //   },
    //   uploadPhoto() {
    //     console.log('asdf')
    //   },
    //   setErrorMessage(errorMessage) {
    //     this.errorMessage = errorMessage
    //   },
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
