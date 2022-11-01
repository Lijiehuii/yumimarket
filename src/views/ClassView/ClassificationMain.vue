<template>
  <div class="classification-container">
    <div class="main">
      <ClassificationItem
        :goodsClassList="goodsClassList"
        :showList="showList"
        :topSetected="topSetected"
        :classId="classId"
        :setShopId="setShopId"
        @set-show-ist="setShowList"
        @top-setected="getTopSetected"
        @set-class-id="setClassId"
      />
      <ClassificationMianWrapper
        :goodsClassList="goodsClassList"
        :goodsList="goodsList"
        :showList="showList"
        :classId="classId"
        :setShopId="setShopId"
        :marketId="marketId"
        :sku="sku"
        @set-class-id="setClassId"
        @sendShopCartData="sendShopCartData"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

import ClassificationItem from "./ClassificationItem.vue";
import ClassificationMianWrapper from "./ClassificationMianWrapper.vue";
export default {
  props: {
    marketId: {
      type: String
    },
    setShopId: {
      type: String
    },
    sku: {
      type: Array
    }
  },
  data() {
    return {
      // 顶部商品分类id,默认值: fa87f4fc811ed4a936c8171eebe7a762
      classId: "fa87f4fc811ed4a936c8171eebe7a762",
      // 顶部商品分类的列表数组
      goodsClassList: [],
      topSetected: 0,
      // 中间商品分类的列表数组
      goodsList: [],

      showList: 0,

      // 超市id
      // marketId: "44786843df2a0910b3824c866018d1a9",

      // lat经度
      lat: "23.54558",

      // 纬度
      lng: "113.591571",
    };
  },
  created() {
    this.getGoodsClassList = debounce(this.getGoodsClassList);
    this.getGoodsList = debounce(this.getGoodsList);
  },
  mounted() {
    this.getGoodsClassList();
    this.getGoodsList();
  },
  watch: {
    classId() {
      this.getGoodsList();
    },
  },
  methods: {
    setShowList(i) {
      this.showList = i;
    },
    getTopSetected(i) {
      this.topSetected = i;
    },
    setClassId(id) {
      this.classId = id;
    },
    // 顶部商品分类的列表 api 申请渲染
    getGoodsClassList() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/goods/goodsClass/getGoodsClassList"
        )
        .then(({ data }) => {
          this.goodsClassList = data.data;
        });
    },
    getGoodsList() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getGoodsList?classification=1&limit=20&marketId=${this.marketId}&classId=${this.classId}&saleStatus=1&orderBy=0&lat=${this.lat}&lng=${this.lng}`
        )
        .then((data) => {
          this.goodsList = data.data.data;
          console.log(this.goodsList);
        });
    },
    sendShopCartData(val) {
      console.log('数据来了')
      this.$emit("sendShopCartData", val);
    }
  },
  components: {
    ClassificationItem,
    ClassificationMianWrapper,
  },
};
</script>

<style lang="scss" scoped>
.classification-container {
  position: relative;
  .main {
    position: relative;
  }
}
</style>