import { createRouter, createWebHashHistory } from 'vue-router';
import HomeVue from '../view/Home.vue';
import Record from '../view/Record.vue';

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
    path: '/record',
    component: Record,
  },
  { path: '/:catchAll(.*)', redirect: '/', hidden: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
