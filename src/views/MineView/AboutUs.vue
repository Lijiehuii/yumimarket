<template>
  <div class="aboutUs">
    <div class="back-item">
      <span @click="goback">&lt;</span>
      <span>关于我们</span>
    </div>
    <div class="dic-item" v-html="aboutUs.contents">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        aboutUs:[],
    };
  },
  created(){
    this.aboutUsData()
  },
  methods: {
    goback() {
      this.$router.push({ path: "/mineView/administration" });
    },
    aboutUsData() {
      this.$axios
        .get("https://admin.zhyumi.cn/ddfresh/app/base/aboutUs/getContent")
        .then(({ data }) => {
          this.aboutUs = data.data
          console.log(this.aboutUs);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.aboutUs {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: #fff;

  .back-item {
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

  .dic-item {
    line-height: 20px;
    font-size: 16px;
    margin-top: 30px;
    padding: 0 30px;
  }
}
</style>