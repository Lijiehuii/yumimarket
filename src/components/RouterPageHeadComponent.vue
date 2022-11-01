<template>
  <div class="head">
    <span class="lt" @click="goback"
      ><i class="icon icon-keyboard_arrow_left"></i></span
    >{{ routerPageHeadTitle }}
  </div>
</template>

<script>
export default {
  props: {
    routerPageHeadTitle: String,
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 44px;
  padding: 7px 3px;
  background-color: rgb(255, 61, 61);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  color: #fff;
  z-index: 999;

  .lt {
    width: 27px;
    height: 27px;
    line-height: 27px;
    position: absolute;
    left: 10px;
    font-size: 30px;
  }
}
</style>