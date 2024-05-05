import { createRouter, createWebHashHistory } from 'vue-router';
import HomeVue from '../view/Home.vue';
import Record from '../view/Record.vue';
import LoginRecord from '../view/LoginRecord.vue';
import EmailBox from '../view/EmailBox.vue';

export const constantRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    redirect: '/Home',
  },

  {
    path: '/Home',
    component: HomeVue,
  },

  {
    path: '/LoginRecord',
    component: LoginRecord,
  },

  {
    path: '/record',
    component: Record,
  },

  {
    path: '/EmailBox',
    component: EmailBox,
  },

  { path: '/:catchAll(.*)', redirect: '/Home', hidden: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
