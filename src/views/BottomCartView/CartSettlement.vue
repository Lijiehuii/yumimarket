<template>
  <div class="cart-right" @click="goToSettlementview">
    <span class="settlement">去结算</span>
  </div>
</template>

<script>
export default {
  props: {
    queryCartList: Array,
    listTotalMoney: {
      type: [Number, String]
    },
    weight: {
      type: [Number, String]
    }
  },
    methods: {
      goToSettlementview() {
      // if (
      //   this.showCart &&
      //   this.listTotalMoney >= this.startingPrice &&
      //   this.weight <= this.weightLimit &&
      //   this.distance <= this.distributionScope
      // )
      
      // {
        this.$emit("setCheck", true)
        this.$router.push({
          name: "settlementview",
          query: {
            carList: JSON.stringify(this.queryCartList),
            listTotalMoney: this.listTotalMoney,
            weight: this.weight,
          },
        });
      }
    // },
    }
}
</script>

<style lang="scss" scoped>
.cart-right {
  display: flex;
  width: 100px;
  height: 50px;
  justify-content: flex-end;
  align-items: center;

  .settlement {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 65px;
    height: 100%;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    background-color: #e54d42;
    border-top-right-radius: 999px;
    border-bottom-right-radius: 999px;
  }
}
</style>