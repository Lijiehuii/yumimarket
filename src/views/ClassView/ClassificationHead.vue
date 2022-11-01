<template>
  <div class="classification-head">
    <div class="classification-head-title">商品分类</div>
  </div>
</template>

<style lang="scss" scoped>
.classification-head {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 44px;
  padding: 7px 3px;
  background-color: rgb(255, 61, 61);
  z-index: 500;

  .classification-head-title {
    text-align: center;
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    color: #fff;
  }
}
</style>