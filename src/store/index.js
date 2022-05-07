import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 5,
    goodsList: [], // 商品列表。。。。找老半天错误居然是有地方漏写了s，居然也不提示报错
    type: null,
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];// 展开存起来
    },
    resetGoodsList(state) { // 清空防止累加变多
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
  },
  actions: {
    async getSideList({ commit }, type) {
      commit('setShowContent', false); // 正在加载打开，拿到数据关掉
      const value = await api.getSideList(type);// 调用api结果再存起来
      // commit('setSideList',type)
      commit('setSideList', value);
      // console.log(value);
      commit('setShowContent', true);
    },
    async getGoodsList({ state, commit }, options) { // 有地方一直在触发提交
      // console.log(state.showContent);
      const { page, sortType } = options;
      const type = options.type || state.type;
      commit('setGoodsType', type);
      const { list, total } = await api.getGoodsList(type, page, state.size, sortType);
      // console.log(list, total);
      commit('setGoodsList', list);
      if (total > state.goodsList.length) {
        return true; // 说明还没加载完，可以继续加载
      }
      return false;
    },
  },
  modules: {
  },
});
