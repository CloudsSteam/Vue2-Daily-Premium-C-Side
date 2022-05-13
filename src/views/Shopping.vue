<template>
  <div class="shopping-container">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        @click-right="del"
      />
    </div>
    <div
      class="card-list"
      v-if="list.length"
    >
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
      >
        <div
          class="card-box"
          v-for="item in list"
          :key="item.id"
        >
          <van-checkbox
            class="check"
            :name="item.id"
          ></van-checkbox>
          <goodsCard
            v-bind="item"
            :num="counterMap[item.id]"
            :nofly="true"
          />
        </div>
      </van-checkbox-group>
    </div>
    <div
      v-else
      class="shopping"
    >

      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      >
    </div>
    <van-submit-bar
      :price="allMoney"
      :button-text="`去结算(${totalNum})`"
      @submit="onSubmit"
    >
      <van-checkbox
        v-model="checked"
        @click="checkAll"
      >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Toast, Dialog } from 'vant';
import goodsCard from '../components/GoodsCard.vue';

export default {
  components: { goodsCard },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  created() {
    this.getAllData();
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    allMoney() {
      const resArr = this.list.filter((item) => this.result.includes(item.id));// 选中的这些商品
      return resArr.reduce((prev, next) => {
        const num = this.counterMap[next.id] || 0;
        return prev + Math.round(num * next.price * 100);
      }, 0);
    },
    totalNum() {
      // return 30;
      const resArr = this.list.filter((item) => this.result.includes(item.id));// 选中的这些商品
      // console.log(this.counterMap);
      const res = resArr.reduce((prev, next) => prev + (this.counterMap[next.id] || 0), 0);// 个数累加
      return res;
    },
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
  methods: {
    ...mapMutations(['storageChange']),
    async getAllData() {
      const result = Object.keys(this.counterMap);
      // console.log(result.join());//购物车中所有id
      const res = await this.$api.getGoodsByIds(result.join());// 拼接起来
      // console.log(res.list);//拿到购物车商品信息
      this.list = res.list;
    },
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
    async del() {
      if (this.result.length === 0) {
        Toast('你没有选中商品');
      }
      try {
        await Dialog.confirm({ message: '您是否要删除已选中商品' });
        // 本地存储要删除，list中值要过滤判断
        this.result.forEach((id) => {
          this.storageChange({ id, value: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
        });
      } catch (error) {
        Toast('用户点击了取消');
      }
    },
    onSubmit() {

    },
  },

};
</script>

<style lang="less" scoped>
.shopping-container {
  background: #fff;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
    .check {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .shopping {
    position: absolute;
    top: 46px;
    width: 100%;
    // height: 100%;
    img {
      width: 100%;
    }
  }
  .card-none {
    width: 100%;
    position: absolute;
    top: 46px;
    img {
      width: 100%;
    }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
