import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import { preset } from 'vue-cli-plugin-vuetify-preset-max-sterling/preset'
import '@/assets/styles/'
Vue.use(Vuetify)

export default new Vuetify({
  // preset,
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#164b73',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'mdiSvg',
  },
})
