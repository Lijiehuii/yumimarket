<template>
  <div class="find-pwd">
    <RouterPageHeadComponent :routerPageHeadTitle="'设置密码'" />
    <GoToResetPwd
      :resetPwd="resetPwd"
      @getMobilephone="getMobilephone"
      @reset-pwd-page="resetPwdPage"
    />
    <ResetPwd
      :resetPwd="resetPwd"
      :mobilephone="mobilephone"
      :smsCode="smsCode"
      @reset-pwd-page="resetPwdPage"
    />
  </div>
</template>

<script>
import RouterPageHeadComponent from "@/components/RouterPageHeadComponent.vue";
import GoToResetPwd from "./GoToResetPwd.vue";
import ResetPwd from "./ResetPwd.vue";

export default {
  data() {
    return {
      smsCode: 0,
      resetPwd: false,
      mobilephone: 0,
    };
  },
  methods: {
    resetPwdPage(code) {
      this.resetPwd = true;
      console.log(code);
      this.smsCode = code;
    },
    getMobilephone(phone) {
      this.mobilephone = phone;
    },
    ticpShowTimer() {
      this.ticpShow = true;
      setTimeout(() => {
        this.ticpShow = false;
      }, 2000);
    },
  },
  components: {
    RouterPageHeadComponent,
    GoToResetPwd,
    ResetPwd,
  },
};
</script>

<style lang="scss" scoped>
.find-pwd {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 44px 0;
  z-index: 500;
  .find-pwd-verification {
    width: 100%;
    height: calc(100vh - 44px);
    padding: 20px;

    .input-group {
      display: flex;
      flex-direction: column;
      label {
        height: 60px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        color: #999;
        font-size: 14px;
        .title {
          flex: 0 0 110px;
          width: 100px;
          height: 40px;
          line-height: 20px;
          padding: 10px 0 10px 20px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
          height: 40px;
          outline: none;
          border: 0;
          font-size: 16px;
        }
      }
      .smsCode-con {
        position: relative;
        .smsCode {
          box-sizing: border-box;
          padding-right: 120px;
        }
        .sent-smsCode {
          position: absolute;
          top: 35%;
          right: 0;
          flex: 0 0 100px;
          padding-left: 20px;
          text-align: center;
          color: #ff3d3d;
          border-left: 1px solid #999;
        }
      }
    }

    .submit-btn {
      box-sizing: border-box;
      width: calc(100vw - 40px);
      margin-top: 30px;
      padding: 20px;

      .submit {
        width: 100%;
        height: 40px;
        border-radius: 50px;
        font-size: 15px;
        background-color: #ff3d3d;
        color: #fff;
        border: 0;
      }
    }
  }
}
</style>