<template>
  <div class="classify-container">
    <div class="search-btn">
      <van-icon name="search" />
      <div>我是一棵荔枝包邮9.99</div>
    </div>
    <oneTab />

    <sideBar />
  </div>
</template>

<script>
import oneTab from '../components/OneTab.vue';
import sideBar from '../components/sideBar.vue';

export default {
  components: {
    oneTab, sideBar,
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
      vertical-align: middle;
    }
  }
}
</style>
