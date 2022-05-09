import Vue from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import 'vant/lib/index.css';
import api from './api';

Vue.use(Vant);
Vue.config.productionTip = false;

Vue.prototype.$api = api;// 全局注入
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
