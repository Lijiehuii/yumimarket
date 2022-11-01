<template>
  <div class="change-con">
    <p class="authen-ticp">
      <span class="title">绑定手机</span>
      1个手机号仅能被1个账号使用哦~
    </p>
    <div class="change">
      <form class="input-group">
        <label>
          <span class="title">手机号：</span>
          <input
            type="tel"
            minlength="11"
            maxlength="11"
            placeholder="请输入手机号码"
            v-model.trim.number="form.newMobilephone"
          />
        </label>
        <div class="smsCode-con">
          <label>
            <span class="title">验证码：</span>
            <input
              type="number"
              class="smsCode"
              placeholder="请输入验证码"
              v-model="form.newSmsCode"
            />
          </label>
          <span class="sent-smsCode" @click="sendSmsCode">
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
      </form>
      <div class="submit-btn" @click="goToChangePhone">
        <input class="submit" type="submit" value="确定" />
      </div>
      <TicpShowComponent :ticpText="ticpText" :ticpShow="ticpShow" />
    </div>
  </div>
</template>

<script>
import qs from "qs";
import TicpShowComponent from "@/components/TicpShowComponent.vue";
export default {
  components: { TicpShowComponent },
  props: {
    oldForm: Object,
  },
  data() {
    return {
      form: {
        oldMobilephone: this.oldForm.oldMobilephone,
        oldSmsCode: this.oldForm.oldSmsCode,
        newMobilephone: "",
        newSmsCode: "",
      },
      ticpText: "",
      ticpShow: false,
      time: 60 * 1000,
      hadSendCode: false,
    };
  },
  methods: {
    ticpShowTimer() {
      this.ticpShow = true;
      setTimeout(() => {
        this.ticpShow = false;
      }, 2000);
    },
    sendSmsCode() {
      let newPhone = {
        mobilephone: this.form.newMobilephone,
        smsWay: 9,
      };
      let mobilephoneReg = /^1(3|4|5|7|8)\d{9}$/;
      if (mobilephoneReg.test(newPhone.mobilephone)) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/sms/sendCode",
            qs.stringify(newPhone)
          )
          .then(({ data }) => {
            if (data.success) {
              console.log(data);
              this.hadSendCode = true;
              this.$refs.countDown.start();
              this.ticpText = data.msg;
              this.ticpShowTimer();
            }
            if (!data.success) {
              console.log(data);
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
            }
          });
      } else if (!mobilephoneReg.test(newPhone.mobilephone)) {
        this.ticpText = "请输入11位手机号码!";
        this.ticpShowTimer();
      }
    },
    goToChangePhone() {
      let mobilephoneReg = /^1(3|4|5|7|8)\d{9}$/;
      if (mobilephoneReg.test(this.form.newMobilephone)) {
        console.log(1111);
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/doChangePhone",
            qs.stringify(this.form)
          )
          .then(({ data }) => {
            if (data.success) {
              this.ticpText = data.msg;
              this.ticpShowTimer();
              localStorage.removeItem("kaoa_user_info");
              localStorage.removeItem("kaoa_token");
              this.$router.push({ name: "login" });
            }
            if (!data.success) {
              console.log(this.form);
              this.ticpText = data.msg + " !";
              this.ticpShowTimer();
              console.log(this.form);
            }
          });
      } else if (!mobilephoneReg.test(this.form.newMobilephone)) {
        this.ticpText = "请输入11位手机号码!";
        this.ticpShowTimer();
      }
    },
    countDownFinish() {
      this.hadSendCode = false;
      this.$refs.countDown.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.authen-ticp {
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 10px 20px;
  color: #999;
  .title {
    font-size: 22px;
    margin-bottom: 20px;
    color: #000;
  }
}
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
}

.submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-top: 30px;
  padding: 20px 40px;

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
</style>