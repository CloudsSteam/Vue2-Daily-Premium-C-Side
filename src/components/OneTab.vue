<template>
  <div
    class="oneTab-container"
    ref="oneTab"
  >
    <div
      class="tab-item "
      v-for="(item ,i ) in menuList"
      :key="item.title"
      :class="{active:index===i}"
      @touchend="scrollTo(i,$event)"
      @touchstart="move=false"
      @touchmove="move=true"
    >
      <div class="img-wrapper">
        <img
          :src='item.imgURL'
          alt=""
        >
      </div>
      <div class="tab-title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import tool from '../util/tool';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getSideList']), // 结构vuex里面异步提交
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      // console.log(i, e);
      this.index = i;
      const { oneTab } = this.$refs;
      const itemWidth = e.target.offsetWidth;
      const itemLeft = e.target.getBoundingClientRect().left;
      const wrapperWidth = oneTab.offsetWidth;
      // oneTab.scrollLeft+=itemWidth/2+itemLeft-wrapperWidth/2
      tool.moveTo(oneTab.scrollLeft, itemWidth / 2 + itemLeft - wrapperWidth / 2, oneTab, 'scrollLeft');
      // 获取侧边栏数据
      this.getSideList(this.menuList[i].title);// 异步提交调用api，响应结果存起来
    },
  },
  mounted() {
    this.getSideList(this.menuList[0].title);
  },
};
</script>
<style lang="less" scoped>
.oneTab-container {
  width: 375px;
  height: 104px;
  // border: 1px solid #f00;
  display: flex;
  overflow: auto;
  .tab-item {
    width: 50px;
    height: 70px;
    // border: 1px solid #f00;
    padding: 10px 5px;
    .img-wrapper {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      border-radius: 23px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
    }
    .tab-title {
      text-align: center;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .active {
    .img-wrapper {
      border-color: #d13193;
    }
    .tab-title {
      color: #fff;
      background-color: #d13193;
      font-weight: bold;
      border-radius: 30px;
    }
  }
}
.oneTab-container::-webkit-scrollbar {
  width: 0px;
  background: none;
}
</style>
