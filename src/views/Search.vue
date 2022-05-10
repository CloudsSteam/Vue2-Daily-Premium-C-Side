<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon
        name="arrow-left"
        class="arr-left"
      />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @focus="focus"
        @input="input"
      >
        <template
          #action
          v-if="showList"
        >
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template
          #action
          v-else
        >
          <van-icon
            name="cart-o"
            id="shop-car"
            class="shop-car"
            :badge="badge"
            @click="$router.push('/home/shopping')"
          />
        </template>
      </van-search>
    </div>
    <div
      class="like-search"
      v-if="likeList.length&&showList"
    >
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          @click="onSearch(item)"
        >
          <template>
            <!-- 格式化我们的值 -->
            <span
              class="custom-title"
              v-html="formatHTML(item)"
            ></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div
      class="goods-list"
      v-if="!showList"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';

export default {
  components: {
    goodsCard,
  },
  data() {
    return {
      place: '我是一棵荔枝',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false, // 表完成
      page: 1,
      size: 5,
      goodsList: [],
      showList: true, // 控制显示哪一个
      total: 0,
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },

  methods: {

    async onLoad() {
      const value = await this.$api.search(this.value, this.page, this.size);

      this.goodsList = [...this.goodsList, ...value.list];
      console.log(value, this.goodsList);
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    onSearch(value) {
      console.log(value);
      if (value) {
        this.value = value;
      } else {
        this.value = this.place;
      }
      this.likeList = [];
      this.page = 1;
      this.finished = false;

      this.onLoad();// 初始化完执行onLoad函数
      this.showList = false;
    },
    focus() {
      this.showList = true;
    },
    // 防抖
    async input() {
      if (this.value === '') { // place被取代
        this.likeList = [];
        return;
      }
      if (this.timer) { // 输入过程中，清除timer就不能发送请求
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => { // 300毫秒不输入发起请求
          const value = await this.$api.likeSearch(this.value);
          this.likeList = value.result;
          console.log(this.likeList);
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    formatHTML(item) {
      // 正则匹配到的替换成有颜色的
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));// 自带
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 15px;
      }
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
}
</style>
