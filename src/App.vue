<template>
  <div id="app">
    <!-- <van-button type="primary">默认按钮</van-button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {}; // 从本地拿购物车商品数量值
    this.$store.commit('setCounterMap', counterMap);
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  // width: 750px;
  // height: 100px;
  // background: #f00;
}
</style>
