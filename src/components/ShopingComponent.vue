<template>
  <div class="shop-component">
    <div class="cart">
      <div class="shop-cart">
        <span>购物车<i>{{`(共${buy}件商品,总重量约${weight}kg)`}}</i></span>
        <span>清空购物车</span>
      </div>

      <div v-for="item in carList" :key="item?.id" class="shopcart-list">
        <div class="img-box">
          <img :src="item.goodsWholeIcon" alt="" />
        </div>
        <div class="shop-list">
          <div class="text">
            <p>{{ item.goodsTitle }}</p>
            <p>{{ item.title }}</p>
            <!-- <p>x{{ item.buyNum }}</p> -->
            <div class="total">
              <div class="total-money">
                <i>￥</i>{{ item.totalMoney }} <span>/多少克</span>
              </div>
              <div class="total-btn">
                <AddBuyNum
                  :sku="sku"
                  :ban="ban"
                  :itemSkuId="item.skuId"
                  :show="show"
                  :goodsId="item.goodsId"
                  @sendShopCartData="sendShopCartData"
                ></AddBuyNum>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddBuyNum from "./AddBuyNum.vue";
export default {
  props: {
    shopingCartData: Object,
    show: Boolean,
    sku: Array,
    carList: Array,
    ban: Boolean,
    buy:Number,
    weight: {
      type: [Number , String]
    }
  },
  data() {
    return {
      //   carList: [],
      buyNum: 0,
    };
  },
  created() {

  },
  updated() {},
  methods: {
    sendShopCartData(val) {
      console.log("接收数据");
      this.$emit("sendShopCartData", val);
    },
  },
  watch: {},
  components: { AddBuyNum },
};
</script>

<style lang="scss" scoped>
.shop-component {
  // position: fixed;
  // top: 44px;
  // bottom: 50px;
  // width: 100%;

  .cart {
    // position: absolute;
    // bottom: 0;
    height: 60vh;
    background-color: rgb(248, 248, 248);

    .shop-cart {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100vw;
      height: 36px;
      padding: 10px;
      background-color: rgb(248, 248, 248);

      span:nth-child(1) {
        font-size: 12px;
        font-weight: 600;
        color: #333;

        i {
          font-size: 12px;
          color: #aaa;
          font-weight: 400;
        }
      }

      span:nth-child(2) {
        font-size: 12px;
        color: #aaa;
      }
    }

    .shopcart-list {
      display: flex;
      width: 100vw;
      height: 85px;
      padding: 5px;
      border-bottom: 1px solid #eee;
      background-color: #fff;

      .img-box {
        flex: 0 0 75px;
        width: 75px;
        height: 75px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }

      .shop-list {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-left: 10px;

        .text {
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-between;
          height: 75px;

          p:nth-child(1) {
            font-size: 14px;
            color: #333;
            font-weight: 600;
          }

          p:nth-child(2) {
            font-size: 12px;
            color: #8799a3;
          }

          .total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 22px;

            .total-money {
              font-size: 16px;
              color: #e54a42;
              font-weight: 600;

              i {
                font-size: 12px;
                font-weight: 400;
              }

              span {
                font-size: 12px;
                color: #8799a3;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
  }
}
</style>