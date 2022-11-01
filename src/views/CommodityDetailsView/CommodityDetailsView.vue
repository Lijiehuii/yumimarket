<template>
  <div class="commodity-details">
    <div class="commodity-details-head">
      <span class="lt" @click="goback">&lt;</span>商品详情
    </div>
    <div class="commodity-details-main">
      <GoodPic :imgList="imgList" :info="info" />
      <GoodDesc
        :info="info"
        :sku="sku"
        :collection="collection"
        @set-collection="setCollection"
        @sendShopCartData="sendShopCartData"
      />
      <MarketModule :detail="detail" :shopCart="shopCart" :marketId="marketId" :sku="sku" />
      <CommodityDetailsMes
        :imgList="imgList"
        :info="info"
        :detail="detail"
        :skuList="skuList"
        :ComDetType="ComDetType"
        @set-com-desc-type="setComDescType"
      />
      <CommodityDetailsFooter
        :info="info"
        :goodId="goodId"
        :getShopInfo="getShopInfo"
      />
    </div>
    <BottomCartView :shopCart="shopCart" :marketId="marketId" :sku="sku" @sendShopCartData="sendShopCartData"/>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import GoodPic from "./GoodPic.vue";
import GoodDesc from "./GoodDesc.vue";
import MarketModule from "./MarketModule.vue";
import CommodityDetailsMes from "./CommodityDetailsMes.vue";
import CommodityDetailsFooter from "./CommodityDetailsFooter.vue";
import BottomCartView from "../BottomCartView/CartView.vue";

export default {
  props: {
    sku: Array,
    marketId: String,
    shopCart: Object
  },
  data() {
    return {
      goodId: "",
      getShopInfo: "",

      imgList: {},
      info: {},
      skuList: {},
      detail: {},

      ComDetType: "details",
      collection: false,
    };
  },
  created() {
    // console.log(this.$route.query.pathName)
    this.goodId = this.$route.query.goodId;
    this.getShopInfo = this.$route.query.getShopInfo;
    this.getGoodCommodityDetails = debounce(this.getGoodCommodityDetails);
   
  },
  mounted() {
    this.getGoodCommodityDetails();
  },
  methods: {
    getGoodCommodityDetails() {
    
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getInfo?id=${this.goodId}`
        )
        .then((data) => {
          console.log(data)
          let goodDetails = data.data.data;
          this.imgList = goodDetails.imgList[0];
          this.info = goodDetails.info;
          this.skuList = goodDetails.skuList[0];
          this.getIsCollect()
        });
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/shop/shopManage/getShopInfo?id=${this.getShopInfo}&lat=&lng=`
        )
        .then((data) => {
          let marketDetail = data.data.data;
          this.detail = marketDetail.detail;
        });
    },
    setCollection() {
      this.collection = !this.collection;
    },
    getIsCollect() {
      console.log(this.info.id)
      this.$axios.get(`https://admin.zhyumi.cn/ddfresh/app/plat/collect/isCollect?mainId=${this.info.id}&colType=1`).then(({data}) => {
        console.log(data, '这是判断是否已经收藏')
        this.collection = data.data
      })
    },
    setComDescType(type) {
      this.ComDetType = type;
    },
    goback() {
      console.log(this.$route.query.pathName)
        this.$router.push({
        path: JSON.parse(this.$route.query.pathName).path,
        query:  JSON.parse(this.$route.query.pathName)?.query
      });
      // this.$router.go()
    },
    sendShopCartData(val) {
      console.log('第三次数据来了')
      this.$emit('sendShopCartData', val)
    }
  },

  components: {
    GoodPic,
    GoodDesc,
    MarketModule,
    CommodityDetailsMes,
    CommodityDetailsFooter,
    BottomCartView,
  },
};
</script>

<style lang="scss" scoped>
.commodity-details {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #f1f1f1;
  padding: 44px 0 60px 0;
  z-index: 500;

  .commodity-details-head {
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

  .commodity-details-main {
    width: 100vw;
  }
}
</style>