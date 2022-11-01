<template>
  <div class="change-phone">
    <div class="head">
      <span class="lt" @click="goback"
        ><i class="icon icon-keyboard_arrow_left"></i></span
      >更换手机号
    </div>
    <IdConfi v-if="confi == 1" @id-sure="confi = 2" />
    <SendOldCode
      v-if="confi == 2"
      @next-step="confi = 3"
      @get-Old-Form="getOldForm"
    />
    <TochangePhone v-if="confi == 3" :oldForm="oldForm" />
  </div>
</template>

<script>
import IdConfi from "./IdConfi.vue";
import SendOldCode from "./SendOldCode.vue";
import TochangePhone from "./TochangePhone.vue";

export default {
  components: { IdConfi, SendOldCode, TochangePhone },
  data() {
    return {
      confi: 1,
      oldForm: "",
    };
  },
  methods: {
    goback() {
      this.$router.push({ name: "accountSafe" });
    },
    getOldForm(oldVal) {
      this.oldForm = oldVal;
      console.log("this.oldForm => ", this.oldForm);
    },
  },
};
</script>

<style lang="scss" scoped>
.change-phone {
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
}
</style>