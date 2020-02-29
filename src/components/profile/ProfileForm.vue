<template>
  <v-row justify="start" width="100%" style="min-width: 100%;" dark>
    <!-- <v-col cols="12" sm="10" md="8" lg="6"> -->
    <v-card ref="form" class="flex-grow-1 flex-shrink-0 mt-10" style="max-width: 420px; width: 420px;" flat>
      <v-form dense>
        <v-row>
          <v-text-field
            ref="name"
            dense
            style="max-width: 60;"
            id="firstName"
            v-model="user.firstName"
            :rules="[() => !!user.firstName || 'This field is required']"
            :error-messages="errorMessages"
            label="First Name"
            placeholder="John Doe"
            class="mr-2 ml-3"
            @blur="handleBlur"
            required
          />
          <v-text-field
            dense
            ref="name"
            id="lastName"
            @blur="handleBlur"
            style="max-width: 80;"
            v-model="user.lastName"
            :rules="[() => !!user.lastName || 'This field is required']"
            :error-messages="errorMessages"
            label="Last Name"
            placeholder="John Doe"
            required
          />
        </v-row>

        <v-text-field
          dense
          ref="addressList.street"
          id="addressList.street"
          @blur="handleBlur"
          v-model="user.addressList.street"
          :rules="[
            () => !!user.addressList.street || 'This field is required',
            () =>
              (!!user.addressList.street && user.addressList.street.length <= 25) ||
              'Address must be less than 25 characters',
            addressCheck,
          ]"
          label="Address Line"
          placeholder="Hanover Pl"
          counter="25"
          required
        />
        <v-text-field
          dense
          ref="addressList.city"
          id="addressList.city"
          v-model="user.addressList.city"
          @blur="handleBlur"
          :rules="[() => !!user.addressList.city || 'This field is required', addressCheck]"
          label="City"
          placeholder="El Paso"
          required
        />
        <v-text-field
          dense
          ref="addressList.state"
          id="addressList.state"
          v-model="user.addressList.state"
          :rules="[() => !!user.addressList.state || 'This field is required']"
          label="State/Province/Region"
          @blur="handleBlur"
          required
          placeholder="TX"
        />
        <v-text-field
          dense
          ref="addressList.zipcode"
          id="addressList.zipcode"
          v-model="user.addressList.zipcode"
          :rules="[() => !!user.addressList.zipcode || 'This field is required']"
          label="ZIP / Postal Code"
          required
          placeholder="79938"
          @blur="handleBlur"
        />
      </v-form>
      <!-- <v-divider class="mt-12" /> -->
      <!-- <v-card-actions>
        <v-btn text>
          Cancel
        </v-btn>
        <v-spacer />
        <v-slide-x-reverse-transition>
          <v-tooltip v-if="formHasErrors" left>
            <template v-slot:activator="{ on }">
              <v-btn icon class="my-0" @click="resetForm" v-on="on">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh form</span>
          </v-tooltip>
        </v-slide-x-reverse-transition>
        <v-btn color="primary" text @click="submit">
          Submit
        </v-btn>
      </v-card-actions> -->
    </v-card>
    <!-- </v-col> -->
  </v-row>
</template>

<script>
import _ from 'lodash'
import Parse from 'parse'

export default {
  components: {},
  props: ['user'],
  data() {
    return {
      errorMessages: '',
      name: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      formHasErrors: false,
    }
  },
  computed: {
    form() {
      return {
        name: this.name,
        street: this.street,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
      }
    },
  },
  watch: {
    name() {
      this.errorMessages = ''
    },
  },
  methods: {
    handleBlur: _.debounce(async function(e) {
      this.$store.dispatch('setLoading', true)
      var update = {
        field: e.srcElement.id,
        value: e.target.value,
      }
      //console.log(update)
      await this.$store.dispatch('profiles/changeCurrentProfile', update)

      this.$store.dispatch('setLoading', false)
      this.currentUser = this.$store.state.currentUser
    }, 500),
    addressCheck() {
      this.errorMessages = this.street && !this.name ? "Hey! I'm required" : ''

      return true
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
    },

    changed(file, reader) {
      this.reader = reader
      this.file = file.name
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
html.dark-mode {
  mix-blend-mode: difference;
  filter: brightness(0.67) hue-rotate(180deg);
  font-weight: 700 !important;
}

/* Glow for dropdown/card-hover*/
.dark-mode .v-menu__content,
.dark-mode .v-card--hover:hover {
  box-shadow: 0 5px 20px rgba(142, 255, 252, 0.74);
}

.dark-mode .logo {
  filter: brightness(0);
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
