// 模板引入产生vue实例
import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);// 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

export default function ({
  startX, startY, endX, endY, src, width, height,
}) {
  const app = new Animate({
    el: document.createElement('div'), // 重新产生元素，新创建的组件挂载到新的div上
    data() {
      return {
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 2100);
}
