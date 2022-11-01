<template>
  <div class="tab-bar-head">
    <div class="tab-bar-head-title">{{tabBarHeadTitlie}}</div>
  </div>
</template>

<script>
export default {
  props: {
    tabBarHeadTitlie: String,
  },
};
</script>

<style lang="scss" scoped>
.tab-bar-head {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 44px;
  padding: 7px 3px;
  background-color: rgb(255, 61, 61);
  z-index: 500;

  .tab-bar-head-title {
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