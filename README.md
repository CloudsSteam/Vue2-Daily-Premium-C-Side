# vue2-daily-premium-c-side

**vue 全家桶** ,**vant 组件库**,
**lib-flexible** ,
**postcss-px2rem**,**axios**

## 移动端适配

lib-flexible 根据 dpr 进行移动端适配
postcss-px2rem 将 css 中的 px 转换成 rem

## 整体布局

- 底部固定 vant 标签栏
- home 子路由 classify 和 shopping(默认跳转 home/classify)
- 搜索路由

## 分类界面

根据 ui 图还原样式
Home 组件下为 vant 标签栏上面 router-view 切换

### Classify 组件

- 搜索框样式
- oneTab 组件一级导航 flex 排列渲染样式
- 点击选中样式过渡，居中!!对应切换左侧二级导航 sideBar
- 根据接口文档 title 发起 axios 数据请求成功结果存储到 vuex 中 sideList
- sideBar 组件渲染 vuex 中的二级导航数据(同样点击居中过渡)
- 点击侧边栏获取 goodsList 组件一页数据先(注意传参值)成功结果展开累加存储到 vuex 中的 goodsList
- 右侧 GoodsList 组件,上部对应点击切换效果排序区(注意点击样式逻辑),下面为商品卡片列表。其中 Vant 中 list PullRefresh 下拉加载(多获取一页数据)上拉刷新效果(详情见 vant 组件 list 的下拉刷新)。商品卡片数目加减购物车(id,value)存储到 vuex 和 localStorage 中,以及飞入购物车动画封装
