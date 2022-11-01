<template>
  <div class="settlement">
    <div class="delivery-fee">
      <p>预计配送费</p>
      <p>￥{{paramValue ? ( paramValue * weight * distance + parseInt(basicDistributionFee)).toFixed(1) : 0 }}</p>
    </div>
    <div
      class="new-man"
      v-show="originalTotalMoney >= sendData?.marketNewCustomer?.money"
    >
      <p>{{ sendData?.marketNewCustomer?.money ? "门店新客立减" : "" }}</p>
      <p class="market-money">
        {{
          sendData?.marketNewCustomer?.money
            ? "-￥" + sendData?.marketNewCustomer?.money
            : ""
        }}
      </p>
    </div>
    <div class="total">
      <p>
        {{
          sendData?.marketNewCustomer?.money
            ? "已优惠 ￥" + sendData?.marketNewCustomer?.money
            : ""
        }}
      </p>
      <div>
        <button class="btn" @click="goToSettlementview">
          <span>￥{{ listTotalMoney }}</span>
          <span>去结算</span>
        </button>
      </div>
    </div>
    <div class="weight">
      <span>
        总重量约{{ weight }}kg, 限重{{ specifications[1]?.paramValue }}kg
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sendData: Object,
    listTotalMoney: {
      type: [Number, String],
    },
    weight: {
      type: [Number, String],
    },
    specifications: Array,
    distance: {
      type: [Number, String],
    },
    startingPrice: {
      type: [Number, String],
    },
    distributionScope: {
      type: [Number, String],
    },
    weightLimit: {
      type: [Number, String],
    },
    showCart: Boolean,
    queryCartList: Array,
    originalTotalMoney: {
      type: [Number, String],
    },
    paramValue: {
      type: [Number, String]
    },
    basicDistributionFee:  {
      type: [Number, String]
    },
  },
  created() {
    // this.getDistance()
  },
  data() {
    return {};
  },
  methods: {
    goToSettlementview() {
      console.log("hhhh");
      if (
        this.showCart &&
        this.listTotalMoney >= this.startingPrice &&
        this.weight <= this.weightLimit &&
        this.distance <= this.distributionScope
      ) {
        this.$router.push({
          name: "settlementview",
          query: {
            carList: JSON.stringify(this.queryCartList),
            listTotalMoney: this.listTotalMoney,
            weight: this.weight,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.settlement {
  border-top: 1px solid #eee;
  background-color: #fff;
  font-size: 3.8vw;

  .delivery-fee {
    display: flex;
    justify-content: space-between;
    padding: 5vw;
  }

  .new-man {
    display: flex;
    justify-content: space-between;
    padding: 5vw;
    .market-money {
      color: red;
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5vw;
    font-size: 3.2vw;
  }

  .btn {
    border: none;
    padding: 2vw 2.5vw;
    font-size: 3.8vw;
    font-weight: 600;
    background-color: transparent;

    & span:nth-child(1) {
      padding: 2vw 2.5vw;
      border-top-left-radius: 999px;
      border-bottom-left-radius: 999px;
      background-color: #ffeadd;
    }

    & span:nth-child(2) {
      padding: 2vw 2.5vw;
      border-top-right-radius: 999px;
      border-bottom-right-radius: 999px;
      color: #fff;
      background-color: #ff3d3d;
    }
  }

  .weight {
    padding: 2vw 0 5vw 0;
    text-align: center;

    span {
      padding: 1vw 2vw;
      font-size: 3.2vw;
      background-color: #eee;
      color: #aaa;
    }
  }
}
</style>