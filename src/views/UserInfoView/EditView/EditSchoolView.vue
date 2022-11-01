<template>
  <div class="edit-school">
    <RouterPageHeadComponent :routerPageHeadTitle="'编辑学校'" />
    <div class="edit-con">
      <van-field
        v-model="form.school"
        rows="2"
        style="padding: 5px 5px 0 5px"
        type="textarea"
        maxlength="32"
        placeholder="请输入签名"
        show-word-limit
      />
    </div>
    <p class="school-ticp">学校名称最多可以输入32个字哦~</p>
    <div class="submitbtn" @click="editSign">
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
      form: {
        school: "",
      },
      ticpShow: false,
      ticptext: "",
    };
  },
  methods: {
    editSign() {
      if (this.form.school) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveUserInfo",
            qs.stringify(this.form)
          )
          .then(({ data }) => {
            if (data.success) {
              let userInfo = JSON.parse(localStorage.kaoa_user_info);
              userInfo.school = this.form.school;
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem("kaoa_user_info", userInfo);
              this.$router.push({ name: "userInfo" });
              location.reload();
            }
          });
      } else {
        this.ticpShow = true;
        this.ticptext = "请输入学校名称!";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-school {
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-top: 44px;
  background-color: #fff;
  z-index: 500;

  .edit-con {
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin: 20px;
    padding: 4px 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .school-ticp {
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