// import Vue from 'vue'
// import '@/assets/styles/'

// import {
//   Vuetify,
//   VApp,
//   VNavigationDrawer,
//   VFooter,
//   VList,
//   VBtn,
//   VIcon,
//   VGrid,
//   VToolbar,
//   transitions,
//   VTooltip,
//   VDataTable,
//   VSubheader,
//   VDivider,
//   VTextField,
//   VCard,
//   VImg,
//   VDialog,
//   VSelect,
//   VAutocomplete,
//   VRadioGroup,
//   VTextarea,
//   VBadge,
//   VMenu,
//   VForm,
//   VCheckbox,
// } from 'vuetify'
// import 'vuetify/src/stylus/app.styl'
// import Vuetify from 'vuetify/lib'

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import { preset } from 'vue-cli-plugin-vuetify-preset-max-sterling/preset'
// import '@/assets/styles/'
// Vue.use(Vuetify, {
//   theme: {
//     primary: '#ee44aa',
//     secondary: '#424242',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107',
//   },
// })
Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      dark: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      // light: {
      //   primary: '#ee44aa',
      //   secondary: '#424242',
      //   accent: '#82B1FF',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FFC107',
      // },
    },
  },
})
