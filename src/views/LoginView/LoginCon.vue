<template>
  <div class="login-con">
    <p class="login-title">您好，欢迎登录</p>
    <form class="login-group" method="post">
      <label class="mobilephone-con">
        <span class="input-title">手机号：</span>
        <input
          type="tel"
          v-model.trim.number="form.mobilephone"
          name="mobilephone"
          required
          placeholder="请输入手机号"
          class="input-con"
          minlength="11"
          maxlength="11"
          oninput="value=value.replace(/[^\d]/g,'')"
        />
        <span
          class="del-btn"
          v-if="form.mobilephone"
          @click="form.mobilephone = ''"
          >x</span
        >
      </label>
      <label class="pwd-con">
        <span class="input-title">密码：</span>
        <input
          type="password"
          v-model.trim.lazy="form.pwd"
          name="pwd"
          required
          placeholder="请输入密码"
          class="input-con"
          minlength="6"
        />
        <span class="del-btn" v-if="form.pwd" @click="form.pwd = ''">x</span>
      </label>
    </form>
    <div class="submit-btn">
      <input
        class="login-btn"
        @click.prevent="toLogin"
        type="submit"
        :disabled="agreeChecked"
        value="登录"
        :class="{ active: !agreeChecked }"
      />
    </div>
    <div class="agree-policy">
      <input
        class="agree-checked"
        type="checkbox"
        @click="agreeChecked = !agreeChecked"
        :checked="!agreeChecked"
      />
      <p class="agree-title" @click="agreeChecked = !agreeChecked">同意</p>
      <p class="agree-policy-text" @click="toPolicy">
        《用户使用协议及隐私政策》
      </p>
    </div>
    <div class="login-action-row">
      <span class="register" @click="toRegister">注册账号</span>|<span
        class="Forgot-password"
        @click="toFindPwd"
        >忘记密码</span
      >
    </div>
    <TicpShowComponent :ticpText="ticpText" :ticpShow="ticpShow" />
  </div>
</template>

<script>
import qs from "qs";
import TicpShowComponent from "@/components/TicpShowComponent.vue";
export default {
  props: {
    // 注册
    // mobilephone: 13112234229
    // smsCode: 831235
    // pwd: ljh20001005
    // pwdAgain: ljh20001005
    // lx: 1
    // invitCode:
    // aid: LCOCF93C
    // 登录的账号
    // mobilephone: String,
    // 登录的密码
    // pwd: String,
  },
  components: { TicpShowComponent },
  data() {
    return {
      form: {
        mobilephone: "",
        pwd: "",
      },
      login: "",
      agreeChecked: true,
      userInfo: "",
      token: "",
      ticpText: "",
      ticpShow: false,
    };
  },
  methods: {
    ticpShowTimer() {
      this.ticpShow = true;
      setTimeout(() => {
        this.ticpText = "";
        this.ticpShow = false;
      }, 2000);
    },
    toLogin() {
      let mobilephoneReg = /^1(3|4|5|7|8)\d{9}$/;
      if (mobilephoneReg.test(this.form.mobilephone)) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/doLogin",
            qs.stringify(this.form)
          )
          .then(({ data }) => {
            if (data.success) {
              this.token = data.data.token;
              // console.log(token);
              this.userInfo = data.data.userInfo;
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
              this.$emit("get-token", this.token);
              this.$emit("get-userInfo", this.userInfo);
              localStorage.setItem('kaoa_token', this.token)
              localStorage.setItem('kaoa_user_info', JSON.stringify(this.userInfo))
              this.$router.push({ path: "/home" });
            }
            if (!data.success) {
              this.form.pwd = "";
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
            }
          });
      } else if (!mobilephoneReg.test(this.form.mobilephone)) {
        this.ticpText = "请输入11位手机号码!";
        this.ticpShowTimer();
        this.form.mobilephone = "";
        this.form.pwd = "";
      }
      // this.form.mobilephone = "";
      // this.form.pwd = "";
    },
    toPolicy() {
      this.$router.push({ path: "/mineView/administration/privacy" });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toFindPwd() {
      this.$router.push({ path: "/findpwd" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-con {
  box-sizing: border-box;
  width: calc(100vw - 30px);
  margin: -60px 15px 15px 15px;
  padding: 50px 35px 50px 35px;
  background-image: url(http://zhyumi.cn/static/img/login_bg.89ab90ce.png);
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;

  .login-title {
    font-weight: 700;
    font-size: 18px;
    color: #ff3d3d;
  }

  .login-group {
    display: flex;
    flex-direction: column;

    label {
      display: flex;
      flex-direction: column;
      margin-top: 25px;
      border-bottom: 1px solid #aaa;
      position: relative;

      .input-title {
        line-height: 20px;
        font-size: 12px;
        color: #666;
      }

      .input-con {
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        margin: 5px 0;
        line-height: 40px;
        font-size: 16px;
        color: #333;
        font-weight: 700;
        outline: none;
        border: 0;
        padding-right: 20px;
      }

      input::placeholder {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.3);
      }

      .del-btn {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 999px;
        border: 1px solid #000;
        background-color: #eee;
        position: absolute;
        bottom: 10px;
        right: 0;
        text-align: center;
      }
    }
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 20px 20px 20px;

    .login-btn {
      width: 200px;
      height: 40px;
      background-color: #ff3d3d;
      font-size: 16px;
      border-radius: 50px;
      border: none;

      &.active {
        color: rgba(255, 255, 255, 1);
      }
    }

    .login-btn:disabled {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .agree-policy {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-bottom: 15px;

    .agree-checked {
      margin: 0 5px;
    }

    .agree-policy-text {
      color: #f37b1d;
    }
  }

  .login-action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #666;

    span {
      margin: 0 20px;
    }
  }
}
</style>

