<template>
  <div class="id-confi" >
    <p class="change-ticp">
      更换手机号前需要身份验证，当前绑定手机号还在使用吗？
    </p>
    <div class="submitbtn" @click="sure">
      <van-button
        round
        type="info"
        size="large"
        color="#ff3d3d"
        style="height: 40px"
        >还在使用手机,去手机号验证</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sure() {
      this.$emit("id-sure");
    },
  },
};
</script>

<style lang="scss" scoped>
.change-ticp {
  padding: 5px;
  margin: 20px;
  line-height: 25px;
}
.submitbtn {
  padding: 5px;
  margin: 20px;
}
</style>