import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      const value = await api.getSideList(type);// 调用api结果再存起来
      // commit('setSideList',type)
      commit('setSideList', value);
      // console.log(value);
    },
  },
  modules: {
  },
});
