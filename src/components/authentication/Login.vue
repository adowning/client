<template>
  <transition name="fade">
    <div class="wrapper" :class="[show ? 'activeClassx' : '']">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <div class="preload" />
            <div class="placeholder" />
            <transition name="trial" appear>
              <div class="content">
                <div class="form-wrapper image-after-login">
                  <div class="flip-img-wrapper">
                    <transition name="fade-profile-pic">
                      <v-avatar size="100">
                        <img class="mb-3" color="primary" src="@/assets/img/defaultProfile.jpg" />
                      </v-avatar>
                    </transition>
                  </div>
                  <form class="animate-form">
                    <div class="textbox-wrapper">
                      <input v-model="name" class="text-box" type="text" />
                      <span class="user-o-icon">
                        <v-icon name="user-o" />
                      </span>
                    </div>
                    <div class="textbox-wrapper">
                      <input v-model="password" class="text-box" type="password" />
                      <span class="lock-icon">
                        <v-icon name="lock" />
                      </span>
                    </div>
                    <button type="submit" class="btn submit-btn" @click.prevent="login">
                      <span class="login-text">LOGIN</span>
                    </button>
                  </form>
                </div>
              </div>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
// import firebase from 'firebase/app'
// import ParseApi from '../api/parseApi'
export default {
  name: 'Login',
  data() {
    return {
      show: false,
      show2: true,
      loginError: null,
      name: 'admin',
      password: 'asdf',
      imgSrc: require('@/assets/img/defaultProfile.jpg'),
    }
  },
  beforeCreate: function() {
    // let imageTwo = new Image()
    // imageTwo.src = require('@/assets/img/defaultProfile.jpg')
  },
  async mounted() {},
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle']),
    profile: function() {
      return this.$store.state.User.profile
    },
    user: {
      get() {
        return parseApi.currentUser()
      },
    },
  },
  methods: {
    ...mapMutations('authentication', ['setCurrentUser']),
    // showDevice(val) {
    //   //console.log(val)

    //   this.$emit('showDevice', val)
    // },
    login: async function(email, password) {
      this.loginError = null
      this.setCurrentUser(undefined)
      try {
        let credentials = {
          name: this.name,
          password: this.password,
        }
        console.log('creds', credentials)
        let user = await this.$store.dispatch('authentication/login', credentials)
        console.log(user)
        if (user == 404) {
          this.$emit('showDevice', true)
        }
      } catch (err) {
        this.loginError = err
        this.setCurrentUser(null)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';

.page-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
    margin-left: 50vw;
    margin-top: 20vh;
  }

  .login-btn {
    cursor: pointer;
    margin-left: 50vw;
    margin-top: 20vh;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}

.wrapper {
  position: relative;
  height: inherit;
  display: flex;
  .preload {
    left: 0%;
    top: 30%;
    height: 80vh;
    width: 120vw;
    margin-left: -59vw;
    margin-top: 40vh;
    position: absolute;
    // background: url('../assets/logo.svg');
    background-repeat: no-repeat;
    box-sizing: border-box;
    background-size: 100% 100%;
  }
  .placeholder {
    flex: 1;
  }
  .content {
    flex: 1;
    position: relative;
    .form-wrapper {
      position: absolute;
      top: 0%;
      left: -50%;
      width: 20vw;
      height: 34vh;
      margin-left: 50vw;
      margin-top: 20vh;
      .flip-img-wrapper {
        position: relative;
        height: 13vh;
        width: 100%;
        .user-icon {
          // height: 10vh;
          // width: 10vw;
          position: absolute;
          left: 30%;
          margin-left: -10px;
          top: 50%;
          margin-top: -30px;
          height: 60px;
          width: 60px;
        }
        .user-profile {
          height: 60px;
          width: 60px;
          //   border-radius: 50%;
          position: absolute;
          left: 50%;
          margin-left: -30px;
        }
      }
      .animate-form {
        input[type='text'],
        input[type='password'] {
          width: 100%;
          //   border-radius: 20px;/
          border: 1px solid #ccc;
          margin-top: 15px;
          outline: none;
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          padding: 10px 26px 10px 14px;
          box-sizing: border-box;
        }
        .textbox-wrapper {
          position: relative;
          span {
            position: absolute;
            top: 22px;
            right: 10px;
          }
        }
        .submit-btn {
          width: 100%;
          // width: 20.3vw;
          padding: 9px;
          //   border-radius: 16px;
          background: #314860;
          margin-top: 15px;
          margin-bottom: 20px;
          outline: none;
          cursor: pointer;
          .login-text {
            color: #fff;
            letter-spacing: 5px;
            font-size: 15px;
          }
        }
        .text {
          // margin-top: 5px;
          color: #314860;
          font-size: 15px;
        }
        .footer-text {
          color: #314860;
          font-size: 14px;
        }
      }
    }
  }
  &.activeClass {
    .form-wrapper {
      animation: formAnimation 2s 1 normal forwards;
    }
    .animate-form {
      animation: hideForm 0.3s ease-in-out 0.5s 1 normal forwards;
    }
    .preload {
      transform: translateX(-300vw);
      transition: all ease-in-out 1s;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
