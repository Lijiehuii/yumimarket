<template>
  <div class="edit-nickname">
    <RouterPageHeadComponent :routerPageHeadTitle="'编辑昵称'" />
    <div class="edit-con">
      <van-field
        style="padding: 5px 5px 0 5px; height: 32px"
        v-model="nickName"
        placeholder="请输入昵称"
      />
    </div>
    <p class="nickname-ticp">昵称最多10个字</p>
    <div class="submitbtn" @click="editNickName">
      <van-button
        round
        type="info"
        size="large"
        color="#06d291"
        style="height: 40px"
        >保存</van-button
      >
    </div>
    <van-overlay :show="ticpShow" @click="ticpShow = false">
      <TicpShowComponent :ticpShow="ticpShow" :ticpText="ticptext" />
    </van-overlay>
  </div>
</template>

<script>
import qs from "qs";
import RouterPageHeadComponent from "@/components/RouterPageHeadComponent.vue";
import TicpShowComponent from "@/components/TicpShowComponent.vue";

export default {
  components: { RouterPageHeadComponent, TicpShowComponent },
  data() {
    return {
      nickName: "",
      ticpShow: false,
      ticptext: "",
    };
  },
  created() {
    this.nickName = JSON.parse(localStorage.kaoa_user_info).nickName;
  },
  methods: {
    editNickName() {
      console.log(this.nickName);
      let form = {
        nickName: this.nickName,
      };
      if (this.nickName) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveUserInfo",
            qs.stringify(form)
          )
          .then(({ data }) => {
            console.log(data);
            if (data.success) {
              let userInfo = JSON.parse(localStorage.kaoa_user_info);
              userInfo.nickName = this.nickName;
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem("kaoa_user_info", userInfo);
              this.$router.push({ name: "userInfo" });
              location.reload();
            }
          });
      } else if (!this.nickName) {
        this.ticpShow = true;
        this.ticptext = "昵称不能为空！";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-nickname {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 44px;
  background-color: #fff;
  z-index: 500;

  .edit-con {
    padding: 5px 5px;
    margin: 20px 20px;
    border: 1px solid #999;
    border-radius: 999px;
    font-size: 15px;
  }

  .nickname-ticp {
    margin: 20px;
    font-size: 14px;
    color: #999;
  }

  .submitbtn {
    padding: 5px 5px;
    margin: 20px 20px;
  }
}
</style>