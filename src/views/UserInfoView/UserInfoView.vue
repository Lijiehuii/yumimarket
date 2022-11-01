<template>
  <div class="user-info">
    <!-- <RouterPageHeadComponent
      :routerPageHeadTitle="'用户信息'"
      @clcik="goback()"
    /> -->
    <div class="head">
      <span class="lt" @click="goback"
        ><i class="icon icon-keyboard_arrow_left"></i></span
      >用户信息
    </div>
    <div class="user-wrapper">
      <UserInfoTop :userInfo="userInfo" />
      <UserInfoMiddle :userInfo="userInfo" />
      <UserInfoBottom :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import UserInfoTop from "./UserInfoTop.vue";
import UserInfoMiddle from "./UserInfoMiddle.vue";
import UserInfoBottom from "./UserInfoBottom.vue";
export default {
  data() {
    return {
      userInfo: {},
      userInfoId: "",
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.kaoa_user_info);
  },
  components: {
    UserInfoTop,
    UserInfoMiddle,
    UserInfoBottom,
  },
  methods: {
    goback() {
      this.$router.push({ name: "mineView" });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
  z-index: 600;
  padding: 44px 0 0 0;
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
}
</style>