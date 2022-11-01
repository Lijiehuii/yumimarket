<template>
  <div class="register">
    <RouterPageHeadComponent :routerPageHeadTitle="'注册账号'" />
    <div class="register-con">
      <form class="input-group">
        <label>
          <span class="title">手机号：</span>
          <input
            type="tel"
            minlength="11"
            maxlength="11"
            placeholder="请输入手机号码"
            v-model.trim.number="form.mobilephone"
          />
        </label>
        <div class="smsCode-con">
          <label>
            <span class="title">验证码：</span>
            <input
              type="number"
              class="smsCode"
              placeholder="请输入验证码"
              v-model="form.smsCode"
            />
          </label>
          <span class="sent-smsCode" @click="sendCode">
            <span v-show="!hadSendCode">发送验证码</span>
            <van-count-down
              :time="time"
              v-show="hadSendCode"
              ref="countDown"
              :auto-start="false"
              style="color: red"
              @finish="countDownFinish"
            >
              <template #default="timeData">
                <span>{{ timeData.seconds }}s</span>
              </template>
            </van-count-down>
          </span>
        </div>
        <label>
          <span class="title">密码：</span>
          <input
            type="password"
            minlength="6"
            maxlength="16"
            placeholder="请输入密码"
            v-model="form.pwd"
          />
        </label>
        <label>
          <span class="title">重复密码：</span>
          <input
            type="password"
            minlength="6"
            maxlength="16"
            placeholder="请再次输入密码"
            v-model="form.pwdAgain"
          />
        </label>
        <div class="lx">
          <span class="lx-title">我的身份：</span>
          <div class="lx-con">
            <span
              class="lx-type"
              v-for="type in lxType"
              :key="type.zdj"
              :class="{ active: form.lx == type.zdj }"
              @click="form.lx = type.zdj"
              >{{ type.zdz }}</span
            >
          </div>
        </div>
        <label>
          <span class="title">输入邀请码：</span>
          <input
            type="text"
            placeholder="请输入对方邀请码"
            v-model="form.aid"
          />
        </label>
      </form>
      <div class="submit-btn">
        <input
          class="submit"
          type="submit"
          value="注册"
          @click="goToRegiste()"
        />
      </div>
      <p class="footer-text" @click="goToLogin">已有账号？前往登录</p>
    </div>
    <!-- <div class="ticp" v-show="ticpShow">{{ ticpText }}</div> -->
    <TicpShowComponent :ticpText="ticpText" :ticpShow="ticpShow" />
  </div>
</template>

<script>
import qs from "qs";
import RouterPageHeadComponent from "@/components/RouterPageHeadComponent.vue";
import TicpShowComponent from "@/components/TicpShowComponent.vue";
export default {
  data() {
    return {
      form: {
        mobilephone: "",
        smsCode: "",
        pwd: "",
        pwdAgain: "",
        lx: 1,
        invitCode: "",
        aid: "",
      },
      lxType: "",
      ticpText: "",
      ticpShow: false,
      time: 60 * 1000,
      hadSendCode: false,
    };
  },

  created() {
    this.getLX();
  },
  methods: {
    ticpShowTimer() {
      this.ticpShow = true;
      setTimeout(() => {
        this.ticpText = "";
        this.ticpShow = false;
      }, 2000);
    },
    getLX() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/sys/zdgl/getList?zdj=sys_wx_user_lx"
        )
        .then(({ data }) => {
          this.lxType = data.data;
        });
    },
    // 发送验证码
    sendCode() {
      let getCode = {
        mobilephone: this.form.mobilephone,
        smsWay: 3,
      };
      console.log(123);
      console.log(getCode.mobilephone, getCode.smsWay);
      console.log(qs.stringify(getCode));
      console.log(getCode.mobilephone);
      let mobilephoneReg = /^1(3|4|5|7|8)\d{9}$/;
      if (mobilephoneReg.test(getCode.mobilephone)) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/sms/sendCode",
            qs.stringify(getCode)
          )
          .then(({ data }) => {
            console.log(data);
            if (data.success) {
              this.hadSendCode = true;
              this.$refs.countDown.start();
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
            }
            if (!data.success) {
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
            }
          });
      } else if (!mobilephoneReg.test(getCode.mobilephone)) {
        this.ticpText = "请输入11位手机号码!";
        this.ticpShowTimer();
      }
    },

    // 注册
    goToRegiste() {
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/doReg",
          qs.stringify(this.form)
        )
        .then(({ data }) => {
          if (data.success) {
            this.msg = data.msg + " !";
            this.$router.push({ path: "/login" });
            this.form = {
              mobilephone: "",
              smsCode: "",
              pwd: "",
              pwdAgain: "",
              lx: 1,
              invitCode: "",
              aid: "",
            };
          }
          if (!data.success) {
            this.ticpText = data.msg;
            this.ticpShowTimer();
          }
        });
      console.log(qs.stringify(this.form));
    },
    // 去登录
    goToLogin() {
      this.$router.push({ path: "/login" });
    },
    countDownFinish() {
      this.hadSendCode = false;
      this.$refs.countDown.reset();
    },
  },

  components: {
    RouterPageHeadComponent,
    TicpShowComponent,
  },
};
</script>

<style lang="scss" scoped>
.register {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 44px 0;
  z-index: 500;

  .register-con {
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
          width: 100px;
          padding-left: 10px;
          text-align: center;
          color: #ff3d3d;
          border-left: 1px solid #999;
        }
      }

      .lx {
        // height: 151px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        color: #999;
        font-size: 14px;
        .lx-title {
          flex: 0 0 110px;
          width: 100px;
          height: 40px;
          line-height: 20px;
          padding: 10px 0 10px 20px;
        }

        .lx-con {
          display: flex;
          flex-wrap: wrap;
          padding: 10px 0;

          .lx-type {
            margin-bottom: 10px;
            margin-right: 5px;
            width: 70px;
            line-height: 37px;
            text-align: center;
            font-size: 12px;
            border-radius: 5px;
            background-color: #f7f8fb;
            color: #333;

            &.active {
              background-color: #ff3d3d;
              color: #fff;
            }
          }
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

    .footer-text {
      text-align: center;
      color: #666;
      padding: 0 20px;
      font-size: 14px;
    }
  }

  .ticp {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    font-weight: 500;
    border-radius: 5px;
    text-align: center;
  }
}
</style>