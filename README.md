# vue2-daily-premium-c-side

vue 全家桶 vant
lib-flexible 根据 dpr 进行移动端适配
postcss-px2rem 将 css 中的 px 转换成 rem

## 移动端适配

## 整体布局

底部固定 vant 标签栏
home 子路由 classify 和 shopping
搜索路由
默认跳转 home/classify

## 分类界面

根据 ui 图还原样式
搜索框样式
oneTab 组件一级导航 flex 排列渲染
点击选中样式过渡，居中!!对应切换左侧二级导航 sideBar

其中右侧 GoodsList 组件，上部对应点击切换效果排序

下面 card 组件传递 vuex 中的 goodsList

下拉刷新效果,点击切换样式!!
