<template>
  <div class="gender" @click.stop="genderSelect = false">
    <div class="gender-con">
      <p class="gender-top">请选择你的性别</p>
      <div class="gender-select">
        <div class="gender-group" @click="gender = 1">
          <div>
            <img class="img-icon" v-if="gender == 1" :src="nanIcon" />
            <span class="img-icon" v-if="gender != 1"></span>
          </div>
          <p>男</p>
        </div>
        <div class="gender-group" @click="gender = 2">
          <div>
            <img class="img-icon" v-if="gender == 2" :src="nvIcon" />
            <span class="img-icon" v-if="gender != 2"></span>
          </div>
          <p>女</p>
        </div>
      </div>
      <div class="btn-click">
        <van-button
          round
          type="info"
          style="width: 90px; height: 40px"
          size="normal"
          color="#ccc"
          @click="$emit('close-select')"
          >取消</van-button
        >
        <van-button
          round
          type="info"
          style="width: 90px; height: 40px"
          size="normal"
          color="#06d291"
          @click="editGender"
          >保存</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      gender: 1,
      nanIcon: "https://zhyumi.cn/static/img/pub/nan.png",
      nvIcon: "https://zhyumi.cn/static/img/pub/nv.png",
    };
  },
  methods: {
    editGender() {
      let form = { gender: this.gender };
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveUserInfo",
          qs.stringify(form)
        )
        .then(({ data }) => {
          if (data.success) {
            let userInfo = JSON.parse(localStorage.kaoa_user_info);
            userInfo.gender = this.gender;
            userInfo = JSON.stringify(userInfo);
            localStorage.setItem("kaoa_user_info", userInfo);
            this.$emit("close-select");
            location.reload();
          } else if (!data.success) {
            console.log(data.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.gender {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 44px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .gender-con {
    width: 250px;
    border-radius: 5px;
    background-color: #fff;

    .gender-top {
      line-height: 50px;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
    }

    .gender-select {
      display: flex;
      justify-content: center;
      align-items: center;

      .gender-group {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 20px;

        .img-icon {
          display: block;
          border-radius: 999px;
          width: 20px;
          height: 20px;
          background-color: #999;
          margin: 0 10px 0 5px;
        }
      }
    }

    .btn-click {
      width: 250px;
      padding: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}
</style>