<template>
  <div class="nav-item">
    <div class="item-bar">
      <span class="item-lf" @click="goOff">&lt;</span>
      <span class="item-rg">设置</span>
    </div>
    <div class="specific">
      <div @click="goToAccountSafe">
        <span>账号与安全</span>
        <span>&gt;</span>
      </div>
      <div>
        <span>检查更新</span>
        <span>&gt;</span>
      </div>

      <router-link tag="div" to="/mineView/administration/aboutus">
        <span>关于我们</span>
        <span>&gt;</span>
      </router-link>
      <router-link tag="div" to="/mineView/administration/privacy">
        <span>使用协议与隐私策略</span>
        <span>&gt;</span>
      </router-link>
    </div>
    <div class="signOut" @click="loginOut">退出当前帐号</div>
    <div class="copyright">
      Copyright©2021-2022 鱼米集市（珠海）科技有限公司 版权所有
    </div>
    <router-view />
  </div>
</template>


<script>
// import MineView from './MineView.vue/AboutUs.vue';
export default {
  data() {
    return {};
  },
  methods: {
    goOff() {
      this.$router.push({ path: "/mineView" });
    },
    goAboutUs() {
      this.$router.replace({ path: "administration/aboutus" });
    },
    loginOut() {
      localStorage.removeItem("kaoa_user_info");
      localStorage.removeItem("kaoa_token");
      this.$router.push({ name: "login" });
    },
    goToAccountSafe() {
      this.$router.push({ name: "accountSafe" });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  position: absolute;
  height: 100vh;
  width: 100vw;
  // top: 0;
  // left: 0;
  // bottom: 0;
  z-index: 600;
  background-color: #fff;

  .item-bar {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ff3d3d;

    span {
      font-size: 16px;
      color: #fff;
    }

    span:nth-child(1) {
      position: absolute;
      left: 20px;
    }
  }

  .specific {
    width: 100vw;
    background-color: #eee;

    div {
      display: flex;
      width: 100vw;
      height: 46px;
      padding: 0 15px;
      line-height: 46px;
      font-size: 16px;
      color: #000;
      background-color: #fff;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
    }

    div:nth-child(1) {
      margin: 10px 0;
    }
  }
  .signOut {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
  }

  .copyright {
    width: 100vw;
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 12px;
    color: #aaa;
  }
}
</style>
