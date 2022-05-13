<template>
  <div class="card-wrapper van-hairline--bottom">
    <div class="card-img">
      <img
        :src="images[0]"
        ref="img"
      >
    </div>
    <div class="card-content">
      <div class="title overflow-hidden">{{title}}</div>
      <div class="desc overflow-hidden">{{ desc }}</div>
      <div class="tags">
        <div
          v-for="i in tags"
          :key="i"
        >{{ i }}</div>
      </div>
      <div class="prices">￥{{ price }}</div>
      <div class="counter">
        <div
          v-if="num"
          @touchend="counter(id, -1)"
        >
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png">
        </div>
        <div
          class="num"
          v-if="num"
        >{{ num }}</div>
        <div @touchend="counter(id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Animate from '../tools/animate/index';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'num', 'id', 'nofly'],
  methods: {
    ...mapMutations(['storageChange']),
    // 奇怪GoodsList组件中也这样展开了，都没报错
    // ES6展开解构失败不识别，查阅一天babel装了object-rest-spread插件也没用
    // 静下心豁然开朗！methods(){}也没正常报错
    counter(id, num) {
      this.storageChange({ id, value: num }); // 拿到变化商品id和数量改变vuex中counterMap
      // this.$store.commit('storageChange', { id, num });
      if (num === -1 || this.nofly) {
        return;
      }
      const { top, left } = this.$refs.img.getBoundingClientRect();// 图片位置
      const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;// 宽高

      const shopCar = document.getElementById('shop-car');
      const { left: carX, top: carY } = shopCar.getBoundingClientRect();// 购物车位置
      const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;// 购物车宽高
      const endX = carX + carWidth / 2;
      const endY = carY + carHeight / 2;
      console.log('left:', left, 'top:', top, 'imgWidth:', imgWidth, 'imgHeight', imgHeight,
        'endX:', endX, 'endY:', endY);

      Animate({ // 组件
        startX: left,
        startY: top,
        endX,
        endY,
        src: this.$refs.img.src,
        width: imgWidth,
        height: imgHeight,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  display: flex;
  height: 100px;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
    .prices {
      color: #ff1a90;
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
    }
    .counter {
      display: flex;
      position: absolute;
      bottom: 12px;
      right: 15px;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
