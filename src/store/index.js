import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 5,
    goodList: [],
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodList = [...state.goodList, ...list];
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false);
      const value = await api.getSideList(type);// 调用api结果再存起来
      // commit('setSideList',type)
      commit('setSideList', value);
      // console.log(value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state }, options) {
      // console.log(state.showContent);
      const { page, type, sortType } = options;
      const { list } = await api.getGoodsList(type, page, state.size, sortType);
      console.log(list);
      this.commit('setGoodsList', list);
    },
  },
  modules: {
  },
});
