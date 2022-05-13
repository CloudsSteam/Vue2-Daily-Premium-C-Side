import Vue from 'vue';
import VueRouter from 'vue-router';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: () => import('@/views/Classify.vue'),
      },
      {
        path: 'shopping',
        component: () => import('@/views/Shopping.vue'),
      },
    ],
  }, {
    path: '/search',
    name: 'search',
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
