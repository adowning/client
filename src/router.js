import Vue from 'vue'
import VueRouter from 'vue-router'
import FourofFour from '@/views/FourOhFourView'
import Layout from '@/Layout'
import Parse from 'parse'
import Splash from '@/views/LoginView'
import Router from 'vue-router'
// import Head from 'vue-head'
// import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import { isNil } from 'lodash'
import store from '@/store'

Vue.use(Router)

Vue.use(Router)
export var View
;(function(View) {
  View['Dashboard'] = 'dashboard'
  View['FirstTimeSetup'] = 'first-time-setup'
  View['Login'] = 'login'
  View['List'] = 'list'
  View['Home'] = 'home'
  View['AccountPanel'] = 'accountpanel'
  View['Profile'] = 'profile'
  View['Settings'] = 'settings'
  View['Processes'] = 'processes'
  View['Player'] = 'player'
})(View || (View = {}))
export const router = new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      name: View.Home,
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Home.vue'),
    },
    //  {
    //    path: '/first-time-setup',
    //    name: View.FirstTimeSetup,
    //    component: () =>
    //      import(/* webpackChunkName: "first-time-setup" */ './views/first-time-setup/first-time-setup.vue'),
    //  },
    {
      path: '/login',
      name: View.Login,
      component: () => import(/* webpackChunkName: "login" */ './views/LoginView.vue'),
    },
    {
      path: '/profile',
      name: View.Profile,
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue'),
    },
    {
      path: '/processes',
      name: View.Processes,
      component: () => import(/* webpackChunkName: "processes" */ './views/Processes.vue'),
    },
    {
      path: '/accountpanel',
      name: View.AccountPanel,
      component: () => import(/* webpackChunkName: "accountPanel" */ './views/AccountPanel.vue'),
    },
    {
      path: '/timesheets',
      name: View.TimesheetsView,
      component: () => import(/* webpackChunkName: "timesheetsView" */ './views/TimesheetsView.vue'),
    },
    {
      path: '/calls',
      name: View.CallsView,
      component: () => import(/* webpackChunkName: "callsView" */ './views/CallsView.vue'),
    },
    {
      path: '/settings',
      name: View.Settings,
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue'),
    },
    {
      path: '/dashboard',
      name: View.Dashboard,
      beforeEnter: (to, from, next) => {
        if (store.getters['authentication/isUserLoggedIn']) {
          next()
          return
        }
        next('/login')
      },
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
  ],
})

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 */
const routerMethods = ['push', 'replace']
routerMethods.forEach(method => {
  const originalCall = Router.prototype[method]
  Router.prototype[method] = function(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject)
    }
    return originalCall.call(this, location).catch(err => err)
  }
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.loggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
