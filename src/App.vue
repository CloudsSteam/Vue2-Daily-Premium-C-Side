<template>
  <div id="app">
    <!-- <van-button type="primary">默认按钮</van-button> -->
    <transition
      :name="transitionName"
      :mode="this.$router.back ? 'out-in' :'in-out'"
    >
      <router-view class="view"></router-view>
    </transition>

  </div>
</template>

<script>
export default {
  created() { // 等会购物车也要用，所以写app里面
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {}; // 从本地拿购物车商品数量值
    this.$store.commit('setCounterMap', counterMap);// 再存到vuex里面
  },
  data() {
    return {
      transitionName: '', // 'left',
    };
  },
  watch: {
    $route(to, from) { // 默认进入不需要动画！！
      if (to.name === 'classify' && from.name !== 'search') { // 不是从search跳到classify
        this.$router.back = true;
      }
      // if (from.name === 'classify' && to.name === 'search') {
      //   this.$router.back = false;
      // }
      if (this.$router.back) {
        this.transitionName = 'right';// 右侧进入
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: transform 0.3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
#app {
  // width: 750px;
  // height: 100px;
  // background: #f00;
}
</style>
