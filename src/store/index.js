import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [], // 二级导航列表
    showContent: false, // 没有在加载中
    size: 5,
    goodsList: [], // 商品列表。。。。找老半天错误居然是有地方漏写了s，居然也不提示报错
    type: null,
    counterMap: {},
  },
  mutations: {
    // 想要响应式的修改对象中的属性，比如添加或者删除，需要用到Vue.set()和Vue.delete()
    // Vue.set中有三个参数，第一个是你要操作的数据，第二个是你要添加的字段，第三个是添加的字段的值；
    // 在Vue.delete中有两个参数，第一个是你要操作的数据，第二个是你要删除的字段
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) { // 看商品有没有存这个商品的id
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) { // 数量为1再减就没了
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value); // 正常改变id对应的值
        }
      } else {
        Vue.set(state.counterMap, id, 1);// 没有存储第一次加1
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap)); // 存
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
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
      commit('setGoodsList', list);// 累加存储起来
      if (total > state.goodsList.length) { // 判断是否需要继续加载
        return true; // 说明还没加载完，可以继续加载
      }
      return false;
    },
  },
  modules: {
  },
});
