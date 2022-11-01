<template>
  <div class="reset-verification" v-if="resetPwd">
    <form class="input-group">
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
    </form>
    <div class="submit-btn">
      <input class="submit" type="submit" value="确定" @click="sure" />
    </div>
    <TicpShowComponent :ticpText="ticpText" :ticpShow="ticpShow" />
  </div>
</template>

<script>
import qs from "qs";
import TicpShowComponent from "@/components/TicpShowComponent.vue";
export default {
  props: {
    resetPwd: Boolean,
    mobilephone: Number,
    smsCode: Number,
  },
  components: { TicpShowComponent },
  data() {
    return {
      form: {
        mobilephone: "",
        smsCode: "",
        smsWay: 5,
        pwd: "",
        pwdAgain: "",
      },
      ticpText: "",
      ticpShow: false,
    };
  },
  methods: {
    ticpShowTimer() {
      this.ticpShow = true;
      setTimeout(() => {
        this.ticpShow = false;
      }, 2000);
    },
    sure() {
      this.form.smsCode = this.smsCode;
      this.form.mobilephone = this.mobilephone;
      console.log(this.form);
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/doFindpwd",
          qs.stringify(this.form)
        )
        .then(({ data }) => {
          console.log(data);
          if (data.success) {
            console.log(data);
            console.log(this.form);
            this.ticpText = data.msg + " !";
            this.ticpShowTimer();
            this.$router.push({ name: "login" });
          }
          if (!data.success) {
            this.ticpText = data.msg + " !";
            this.ticpShowTimer();
            if (data.msg == "验证码已失效，请重新发送。") {
              this.$emit("reset-pwd-page");
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-verification {
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
</style>