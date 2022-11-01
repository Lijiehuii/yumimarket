<template>
  <div class="cart">
    <div @click.stop="show = !show" class="cart">
      <CartLeft />
      <CartMiddle
        :sku="sku"
        :listTotalMoney="listTotalMoney"
        :shopingCartData="shopingCartData"
        :buy="buy"
        :distance="distance"
        :weight="weight"
      />
      <CartSettlement
        :sku="sku"
        :shopingCartData="shopingCartData"
        v-show="shoppingCartGoodsList > 0"
        :queryCartList="queryCartList"
        :distance="distance"
        :weight="weight"
        @setCheck="setCheck"
      />
    </div>
    <van-action-sheet v-model="show" title="标题">
      <ShopingComponent
        :sku="sku"
        :ban="ban"
        :buy="buy"
        :show="show"
        :carList="carList"
        :shopingCartData="shopingCartData"
        :listTotalMoney="listTotalMoney"
        :weight="weight"
        v-show="show"
        :marketId="marketId"
        @sendShopCartData="sendShopCartData"
      ></ShopingComponent>
    </van-action-sheet>
  </div>
</template>

<script>
import CartLeft from "./CartLeft.vue";
import CartMiddle from "./CartMiddle.vue";
import CartSettlement from "./CartSettlement.vue";
import ShopingComponent from "../../components/ShopingComponent.vue";
// import { forEach } from 'lodash-es';
export default {
  props: {
    sku: Array,
    marketId: String,
    shopCart: Object,
  },
  data() {
    return {
      shoppingCartGoodsList: 1,
      shopingCartData: {},
      carList: [],
      show: false,
      ban: false,
      listTotalMoney: 0,
      weight: 0,
      queryCartList: [],
      buy: 0,
      distance: 0
    };
  },
  created() {
    this.getShopingCartData();
  },
  methods: {
    getShopingCartData() {
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getCartList",
          {
            skuList: this.shopCart.skuList,
            marketId: this.shopCart.marketId,
            lat: "",
            lng: "",
          }
        )
        .then(({ data }) => {
          console.log(data, "我是不是又被请求了");
          this.queryCartList = data.data;
          if (data.data.length > 0) {
            this.shopingCartData = data.data[0];
            this.carList = data.data[0].skuList;
            console.log(this.shopingCartData);
          } else {
            this.carList = [];
          }

          this.ban = !this.ban;
          this.ShowSettlement();
          this.getDistance(
                22.270202,
                113.515129,
                data.data[0].lat,
                data.data[0].lng
              );
        });
    },

    sendShopCartData(val) {
      console.log("第二次接收数据");
      this.$emit("sendShopCartData", val);
    },

    ShowSettlement() {
      console.log("我触发了", this.carList, this.distance);
      let money = 0;
      let weight = 0;
      let buy = 0;
      for (let i = 0; i < this.carList.length; i++) {
        money += this.carList[i].totalMoney;
        weight += this.carList[i].totalWeight;
        buy += this.carList[i].buyNum;
      }
      console.log(money);
      let yhMoney;
      this.buy = buy;
      this.originalTotalMoney = (money + 1 * this.distance * weight + 5).toFixed(1);
      if (money > this.shopingCartData?.marketNewCustomer?.fullmoney) {
        this.listTotalMoney = (
          money -
          this.shopingCartData?.marketNewCustomer?.fullmoney +
          1 * this.distance * weight + 5
        ).toFixed(1);
        yhMoney =
          (this.shopingCartData?.marketNewCustomer?.fullmoney).toFixed(1);
      } else {
        this.listTotalMoney = (money +  1 * this.distance * weight + 5).toFixed(1);
      }
      console.log(this.listTotalMoney);
      this.weight = weight.toFixed(1);

      this.queryCartList[0] = {
        ...this.queryCartList[0],
        totalMoney: this.listTotalMoney,
        totalWeight: weight,
        shippingFee: 1,
        outStock: "缺货时电话与我沟通",
        originalTotalMoney: money + 1,
        yhMoney: yhMoney ? yhMoney : 0,
        skuList: this.carList,
      };
    },
    setCheck(val) {
      this.queryCartList[0].carList = this.queryCartList[0].skuList.map((g) => {
        return (g.checked = val);
      });
    },

    Rad(d) {
      //根据经纬度判断距离, 因为给出的经纬度值还不是弧度哪些东西 22.270202 113.515129
      return (d * Math.PI) / 180;
    },
    getDistance(lat1, lng1, lat2, lng2) {
      // lat1用户的纬度
      // lng1用户的经度
      // lat2商家的纬度
      // lng2商家的经度
      let radLat1 = this.Rad(lat1);
      let radLat2 = this.Rad(lat2);
      let a = radLat1 - radLat2;
      let b = this.Rad(lng1) - this.Rad(lng2);
      let s =
        2 *
        Math.asin(
          Math.sqrt(
            Math.pow(Math.sin(a / 2), 2) +
              Math.cos(radLat1) *
                Math.cos(radLat2) *
                Math.pow(Math.sin(b / 2), 2)
          )
        );
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      // s = s; //保留两位小数
      s ? this.distance = s : this.distance = 0;
      console.log("经纬度计算的距离:" + this.distance + "km");
    },
  },
  watch: {
    sku() {
      this.getShopingCartData();
    },
  },
  components: {
    CartLeft,
    CartMiddle,
    CartSettlement,
    ShopingComponent,
  },
};
</script>

<style lang="scss" scoped>
.cart {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50px;
  border-radius: 999px;
  background-color: #333;
  display: flex;
}

.van-action-sheet__header {
  line-height: 26px;
  font-size: 14px;
  color: #333;
  background-color: #e2f5ff;
}
</style>