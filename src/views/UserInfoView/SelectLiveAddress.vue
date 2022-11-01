<template>
  <div class="live-address">
    <div class="all-list-con">
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="现居城市"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import address from "./address.json";
import qs from "qs";
export default {
  data() {
    return {
      show: false,
      fieldValue: "",
      cascaderValue: "",
      options: [],
      allList: {},
    };
  },
  created() {
    this.options = address;
    this.fieldValue = JSON.parse(localStorage.kaoa_user_info).city;
  },
  methods: {
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("-");

      let form = {
        city: this.fieldValue,
      };
      if (form.city) {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveUserInfo",
            qs.stringify(form)
          )
          .then(({ data }) => {
            if (data.success) {
              let userInfo = JSON.parse(localStorage.kaoa_user_info);
              userInfo.city = this.fieldValue;
              userInfo = JSON.stringify(userInfo);
              localStorage.setItem("kaoa_user_info", userInfo);
              this.$router.push({ name: "userInfo" });
              location.reload();
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  position: absolute;
  top: 44px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: calc(100vh - 44px);
  z-index: 600;
}
</style>