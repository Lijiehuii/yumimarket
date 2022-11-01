<template>
  <div>
    <div class="select-good-count">
      <p v-show="buyNum <= 0" class="add-to-cart" @click="buyNum += 1">
        加入购物车
      </p>
      <p v-show="buyNum > 0" class="add-or-reduce">
        <button @click="buyNum -= 1" class="reduce">-</button
        ><span class="good-count">{{ buyNum }}</span
        ><button @click="buyNum += 1" class="add">+</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopingCartData: Object,
    sku: Array,
    goodsId: String,
    show: Boolean,
    itemSkuId: String,
    ban: Boolean
  },
  data() {
    return {
      carList: [],
      buyNum: 0,
    };
  },
  created() {
    this.setBuyNum()
  },
updated() {
 this.setBuyNum()
},
  methods: {
    setBuyNum() {
      for (let i = 0; i < this.sku.length; i++) {
      
        if (this.sku[i].goodsId == this.goodsId) {
          this.buyNum = this.sku[i].buyNum;
        }
      }
    },

    sendShopCartData() {
        this.$emit("sendShopCartData", {
          skuId: this.itemSkuId, // skuid
          goodsId: this.goodsId, //好物id
          buyNum: this.buyNum,
        });
    },
  },

  //ddfresh/app/goods/orderMain/buyerOrderPage?page=1&limit=10&queryParam=&orderStatus=all&dateBegin=2022-07-15&dateEnd=2022-10-15

  watch: {
    buyNum() {
      this.sendShopCartData();
    },
    show() {
      this.setBuyNum();
    },
    ban() {
      this.setBuyNum()
    }
  },
};
</script>