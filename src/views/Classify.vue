<template>
  <div class="classify-container">
    <router-link
      class="search-btn"
      tag="div"
      to="/search"
    >
      <van-icon name="search" />
      <div>我是一棵荔枝包邮9.99</div>
    </router-link>
    <oneTab />
    <template v-if="showContent">
      <!-- 值发生变化是否需要重新获取数据 -->
      <sideBar />
      <goodsList />
    </template>

    <van-loading
      v-else
      type="spinner"
      size="1rem"
      color="#1989fa"
      vertical
    />

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import oneTab from '../components/OneTab.vue';
import sideBar from '../components/sideBar.vue';
import goodsList from '../components/GoodsList.vue';

export default {
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: { // 值发生变化是否需要重新获取数据
    showContent() {
      if (this.showContent === true) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
  components: {
    oneTab, sideBar, goodsList,
  },
};
</script>

<style lang="less" scoped>
.classify-container {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    background-color: #eee;
    margin: 11px auto 0px auto;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle; //垂直居中
    }
  }
}
</style>
