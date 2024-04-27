import { createRouter, createWebHashHistory } from 'vue-router';
import AppVue from '../App.vue';

export const constantRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '/',
    redirect: '/Home',
  },

  {
    path: '/Home',
    component: AppVue,
  },

  { path: '/:catchAll(.*)', redirect: '/', hidden: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
