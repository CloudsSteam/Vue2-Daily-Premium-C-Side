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
      />
    </div>
    <div class="like-search">
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
    <div class="goods-list">
      33.17
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      place: '我是一棵荔枝',
      value: this.place,
      likeList: [],
      timer: null,
    };
  },

  methods: {
    onSearch(value) {
      console.log(value);
      if (value === '') {
        this.value = this.place;
      } else {
        this.value = value;
      }
      this.likeList = [];
    },
    focus() {

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
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
}
</style>
