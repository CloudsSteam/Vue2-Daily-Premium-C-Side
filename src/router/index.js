import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'classify',
        component: () => import('@/views/Classify.vue'),
      },
      {
        path: 'shopping',
        component: () => import('@/views/Shopping.vue'),
      },
    ],
  }, {
    path: '/search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
