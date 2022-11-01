<template>
  <div class="account-safe">
    <div class="head">
      <span class="lt" @click="goback"
        ><i class="icon icon-keyboard_arrow_left"></i></span
      >账号与安全
    </div>
    <div class="user-pic">
      <img
        :src="
          userInfo.wholeAvatarUrl
            ? userInfo.wholeAvatarUrl
            : 'http://zhyumi.cn/static/img/pub/def_img.png'
        "
      />
    </div>
    <div class="user-msg">
      <div class="msg-item">
        <p class="user-name">{{ userInfo.nickName }}</p>
        <p class="title">当前账号</p>
      </div>
      <div class="msg-item" @click="goToChangePhone">
        <p class="user-phone">{{ userInfo.mobilephone }}</p>
        <p class="title"><span class="change-phone">更换手机</span>&gt;</p>
      </div>
      <div class="msg-item" @click="goToFindPwd">
        <p class="user-pvw">密码管理</p>
        <p class="title"><span class="set-pwd">设置密码</span>&gt;</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      userInfoId: "",
    };
  },
  created() {
    this.userInfoId = JSON.parse(localStorage.kaoa_user_info).id;
    this.getUserMsg();
  },
  methods: {
    getUserMsg() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/info?id=${this.userInfoId}`
        )
        .then(({ data }) => {
          //   console.log(data);
          this.userInfo = data.data;
          console.log(this.userInfo);
        });
    },
    goback() {
      this.$router.push({ name: "administration" });
    },
    goToChangePhone() {
      this.$router.push({ name: "changePhone" });
    },
    goToFindPwd() {
      this.$router.push({ name: "findpwd" });
    },
  },
};
</script>

<style lang="scss" scoped>
.account-safe {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
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
  .user-pic {
    width: 100vw;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 999px;
    }
  }

  .user-msg {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .msg-item {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #eee;

      .title {
        width: 80px;
        color: #999;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .change-phone {
          font-size: 16px;
          color: #ff3d3d;
        }
      }
    }
  }
}
</style>