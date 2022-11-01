<template>
  <div class="beginners-wrapper" key="beginners">
    <div class="beginner-item-list" v-for="item in beginners" :key="item.id">
      <p class="title"><i class="icon"></i>{{ item.title }}</p>
      <div class="beginner-text" v-html="item.content"></div>
     
    </div>
  </div>
</template>


<script>
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      // 存取新人上手的数据
      beginners: [],
    };
  },
  created() {
    this.getBeginnersData = debounce(this.getBeginnersData);
  },
  mounted() {
    this.getBeginnersData();
  },
  methods: {
    // 获取新人上手数据
    getBeginnersData() {
      this.$axios
        .get(`https://admin.zhyumi.cn/ddfresh/app/plat/guide/getstarted/list`)
        .then(({ data }) => {
          this.beginners = data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.beginners-wrapper {
  .beginner-item-list {
    box-sizing: border-box;
    padding: 10px 5px 10px 10px;
    font-size: 14px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;

    .title {
      display: flex;
      width: 100%;
      height: 20px;
      color: #333;
      text-align: center;
      line-height: 20px;

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background-image: url(../../assets/imgs/wenti.png);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
    }

    .beginner-text {
      box-sizing: border-box;
      padding: 10px 0 0 8px;
      color: #999;
      line-height: 20px;
    }
  }
}
</style>