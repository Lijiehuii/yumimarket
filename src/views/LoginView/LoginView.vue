<template>
  <div class="login">
    <!-- <RouterPageHeadComponent /> -->
    <div class="login-head"></div>
    <div class="login-wrapper">
      <LoginTop />
      <LoginCon />
    </div>
    <div class="login-bottom">
      <p>网站备案：粤ICP备2022103915号</p>
    </div>
  </div>
</template>

<script>
// import RouterPageHeadComponent from "@/components/RouterPageHeadComponent.vue";
import LoginTop from "./LoginTop.vue";
import LoginCon from "./LoginCon.vue";

export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  components: {
    // RouterPageHeadComponent,
    LoginTop,
    LoginCon,
  },
};
</script>

<style lang="scss" scoped>
.login {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
  padding-top: 44px;
  z-index: 100;

  .login-head {
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

  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .login-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #aaa;
    font-size: 12px;
  }
}
</style>