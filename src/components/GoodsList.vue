<template>
  <div class="list-wrapper">
    <div class="list-header van-hairline--top-bottom">
      <div
        :class="{active:type=='all'}"
        @click="changeType('all')"
      >综合</div>
      <div
        :class="{active:type=='sale'}"
        @click="changeType('sale')"
      >销量</div>
      <div
        class="price"
        :class="{'price-up':type=='price-up','price-down':type=='price-down'}"
        @click="changeType('price')"
      >
        价格</div>
    </div>
    <div class="list-content">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <!-- //下拉刷新 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :mmediate-check="false"
        >
          <!-- //列表项 -->
          <!-- // 重新进入加载key值相同 -->
          <goodsCard
            v-for="(item,index) in goodsList"
            :key="index"
            v-bind="item"
            :num="counterMap[item.id]"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import goodsCard from './GoodsCard.vue';

export default {
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false, // 是否加载完成
      page: 1,
    };
  },
  components: {
    goodsCard,
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.goodsList, // 拿到卡片数据

      counterMap: (state) => state.counterMap,
    }),

  },
  // 重新进入加载key值相同
  // mounted: {
  //   resetGoodsList (),
  //   onRefresh (),
  // },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
    // 加载状态啥的见vant组件库2.12.47列表和下拉刷新
    onRefresh() {
      this.isLoading = true;// 下拉刷新开始
      this.finished = false;// 重新加载?
      // 初始化
      this.loading = false;
      this.page = 1;
      this.resetGoodsList(); // 刷新要清空数据先
      console.log('onRefresh 下拉刷新获取一页数据');
      this.getGoodsList({ page: 1, sortType: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;// true代表数据正在加载
      console.log('onLoad 加载中');
      const result = await this.getGoodsList({ page: this.page, sortType: this.type });
      if (result) { // 异步返回true没加载完，false搞完了
        this.loading = false;
      } else {
        this.finished = true;// 结束完事，显示没有更多了
      }
    },
    changeType(type) { // 点击事件切换样式
      if (type === 'all') {
        this.type = 'all';
      } else if (type === 'sale') {
        this.type = 'sale';
      } else if (this.type === 'price-up') {
        this.type = 'price-down';
      } else {
        this.type = 'price-up';
      }
      this.onRefresh();// 刷新渲染数据
    },
  },
};
</script>

<style lang="less" scoped>
.list-header {
  width: 296px;
  position: relative;
  top: 0;
  left: 79px;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end; //自右向左
  > div {
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #cecece;
    position: relative;
  }
  .active,
  .price-up,
  .price-down {
    color: #ff1a90;
    font-weight: bold;
  }
  .price::after {
    content: "";
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    bottom: 4px;
    right: 0;
  }
  .price::before {
    content: "";
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    top: 4px;
    right: 0;
  }
  .price-up::before {
    border-bottom-color: #ff1a90;
  }
  .price-down:after {
    border-top-color: #ff1a90;
  }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset !important;
}
</style>
