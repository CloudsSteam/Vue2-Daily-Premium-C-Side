/* eslint-disable no-param-reassign */
function moveTo(start, end, dom, prop) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;// 一步一步加慢慢移动，到达目标点，清除计时器
    if (Math.abs(dis) > Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}

export default { moveTo };
