<template>
  <van-tabbar
    fixed
    route
  >
    <van-tabbar-item
      icon="home-o"
      to="/"
    >
      首页
    </van-tabbar-item>

    <van-tabbar-item
      icon="apps-o"
      to="/home/classify"
    >
      分类
    </van-tabbar-item>

    <van-tabbar-item
      icon="cart-o"
      to="/home/shopping"
      :badge="badge"
      id="shop-car"
    >
      购物车
    </van-tabbar-item>

    <van-tabbar-item
      icon="user-circle-o"
      to="/my"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      // console.log(Object.values(this.counterMap));//把counterMap各项字段的值组成一个数组(一个包含对象自身的所有可枚举属性值的数组)
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      // 把所有商品的数目累加
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>
</style>
