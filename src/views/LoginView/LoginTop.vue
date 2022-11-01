<template>
  <div class="login-top">
    <div class="yumi-pic">
      <img src="http://zhyumi.cn/static/img/login/top.png" />
    </div>
    <div class="yumi-text">
      <span>鱼米集市 掌上菜市</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-top {
  width: 100vw;
  box-sizing: border-box;
  padding-bottom: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ff3d3d;
  .yumi-pic {
    text-align: center;
    width: 200px;
    height: 62px;
    img {
      height: 100%;
    }
  }

  .yumi-text {
    font-size: 25px;
    color: #fff;
  }
}
</style>