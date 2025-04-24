import { createRouter, createWebHashHistory } from 'vue-router'
import HomeVue from '../view/Home.vue'
import History from '../view/History.vue'
import Record from '../view/Record.vue'
import EmailBox from '../view/EmailBox.vue'
import Msgboard from '../view/msgboard.vue'
import authPage from '../view/authPage.vue'
import Profile from '../view/Profile.vue'

export const constantRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    redirect: '/Home'
  },

  {
    path: '/Home',
    component: HomeVue
  },

  {
    path: '/authPage',
    component: authPage
  },

  {
    path: '/Record',
    component: Record
  },

  {
    path: '/History',
    component: History
  },

  {
    path: '/EmailBox',
    component: EmailBox
  },

  {
    path: '/msgboard',
    component: Msgboard
  },

  {
    path: '/profile',
    component: Profile
  },

  { path: '/:catchAll(.*)', redirect: '/Home', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
