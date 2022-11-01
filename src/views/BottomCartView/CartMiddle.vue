<template>
  <div class="cart-middle">
    <div class="cart-middle-pic">
      <img src="http://zhyumi.cn/static/img/shopIndex/cart.png" />
      <span class="goodsNum">{{buy}}</span>
    </div>
    <div class="price-desc">
      <p class="total-price"><span class="price-icon">￥</span>{{listTotalMoney}}</p>
      <p class="estimated-cost">预估配送费￥<span>{{5 + (1 * distance * weight).toFixed(1)}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sku: Array,
    listTotalMoney:{
      type: [Number, String]
    },
    buy: Number,
    weight: {
      type: [Number, String]
    },
    distance: {
      type: [Number, String]
    }
  },
};
</script>

<style lang="scss" scoped>
.cart-middle {
  width: calc(100vw - 150px);
  display: flex;
  align-items: center;
  .cart-middle-pic {
    box-sizing: border-box;
    position: relative;
    padding: 0 10px;
    width: 60px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }

    .goodsNum {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      top: 3px;
      right: 7px;
      padding: 2px;
      color: #fff;
      font-size: 12px;
      border-radius: 999px;
      background-color: red;
    }
  }

  .price-desc {
    box-sizing: border-box;
    color: #fff;
    font-size: 12px;
    padding-left: 5px;
    .total-price {
      height: 20px;
      font-size: 18px;

      .price-icon {
        font-size: 12px;
      }
    }

    .estimated-cost {
      color: #8799a3;
      font-size: 10px;
    }
  }
}
</style>