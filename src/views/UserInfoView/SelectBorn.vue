<template>
  <div class="born">
    <div class="data-con">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="submit"
        @cancel="$emit('close-select')"
      />
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  methods: {
    addZero(num) {
      num = num >= 10 ? num : "0" + num;
      return num;
    },
    submit() {
      console.log(123);
      console.log(this.currentDate);
      let y = this.currentDate.getFullYear();
      let m = this.currentDate.getMonth() + 1;
      let d = this.currentDate.getDate();

      let form = {
        born: this.addZero(y) + "-" + this.addZero(m) + "-" + this.addZero(d),
      };
      console.log(form);
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveUserInfo",
          qs.stringify(form)
        )
        .then(({ data }) => {
          if (data.success) {
            console.log("上传出生日期成功!");
            let userInfo = JSON.parse(localStorage.kaoa_user_info);
            userInfo.born = form.born;
            userInfo = JSON.stringify(userInfo);
            localStorage.setItem("kaoa_user_info", userInfo);
            this.$emit("close-select");
            location.reload();
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.born {
  position: absolute;
  top: 44px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 44px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 600;

  .data-con {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>