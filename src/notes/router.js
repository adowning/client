import Vue from 'vue'
import Router from 'vue-router'
import Notes from './views/Notes.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Notes,
    },
    {
      path: '/notes',
      name: 'notes',
      component: () => import('./views/Notes.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('./views/Archive.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('./views/Help.vue'),
    },
    {
      path: '/newLabel',
      name: 'newLabel',
      component: () => import('./views/NewLabel.vue'),
    },
    {
      path: '/reminders',
      name: 'reminders',
      component: () => import('./views/Reminders.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '/shortcuts',
      name: 'shortcuts',
      component: () => import('./views/Shortcuts.vue'),
    },
    {
      path: '/trash',
      name: 'trash',
      component: () => import('./views/Trash.vue'),
    },
    {
      path: '/search',
      name: 'serach',
      component: () => import('./views/Search.vue'),
    },
  ],
})
