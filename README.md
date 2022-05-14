# vue2-daily-premium-c-side

**vue 全家桶** ,**vant 组件库**,
**lib-flexible** ,
**postcss-px2rem**

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

- Classify 组件

搜索框样式
oneTab 组件一级导航 flex 排列渲染样式
点击选中样式过渡，居中!!对应切换左侧二级导航 sideBar

其中右侧 GoodsList 组件，上部对应点击切换效果排序

下面 card 组件传递 vuex 中的 goodsList

Vant PullRefresh 下拉刷新效果,点击切换样式!!
