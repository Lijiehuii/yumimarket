<template>
  <div class="privacy">
    <div class="come-back" @click="goback">
      <span>&lt;</span>
      <span>使用协议与隐私策略</span>
    </div>
    <div class="overflow">
      <div v-html="privacyText.contents" class="privacytext"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      privacyText: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goback() {
      this.$router.push({ path: "/mineView/administration" });
    },
    getData() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/plat/platagreement/getContent?types=1"
        )
        .then(({ data }) => {
          this.privacyText = data.data;
          console.log(this.privacyText);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.privacy {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  background-color: #fff;

  .come-back {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ff3d3d;

    span {
      font-size: 16px;
      color: #fff;
    }

    span:nth-child(1) {
      position: absolute;
      left: 20px;
    }
  }

  .overflow {
    max-width: 100vw;
    max-height: 100vh;
    overflow: auto;

    .privacytext {
      box-sizing: border-box;
      max-width: 100vw;
      height: 100%;
      font-size: 16px;
      padding: 0 15px;
      color: #666;
    }
  }
}
</style>