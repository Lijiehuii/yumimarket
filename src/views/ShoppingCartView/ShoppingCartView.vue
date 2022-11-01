<template>
  <div class="shopping-cart">
    <div class="shopping-head">
      <div class="shopping-head-title">购物车</div>
      <span
        class="setting"
        @click="(edit = !edit), selecred(carList), (show = !show)"
        >{{ edit ? "完成" : "编辑" }}</span
      >
    </div>
    <div class="shopping-list">
      <div class="empty-shopping-car" v-show="empty">
        <img src="http://zhyumi.cn/static/img/shopCart/empty.png" />
        <p>空空如也~</p>
      </div>
      <div class="shopping-car" v-show="!empty">
        <div class="shop-name">
          <div
            class="settlement-all"
            :class="{ active: allSelecred == true }"
            @click="selecredBtn(carList), (show = !show)"
          >
            {{ allSelecred ? "√" : "" }}
          </div>
          <span> {{ data?.shopName }}</span
          ><span>&gt;</span>
        </div>
        <div v-for="item in carList" :key="item?.id" class="shopcart-list">
          <div
            class="settlement-all"
            :class="{ active: item.checked == true }"
            @click="(item.checked = !item.checked), (show = !show)"
          >
            {{ allSelecred ? "√" : item.checked ? "√" : "" }}
          </div>
          <div class="img-box">
            <img :src="item.goodsWholeIcon" alt="" />
          </div>
          <div class="text">
            <p>{{ item.goodsTitle }}</p>
            <p>{{ item.title }}</p>
            <p>x{{ item.buyNum }}</p>
          </div>
          <p class="total">￥{{ item.totalMoney }}</p>
        </div>
      </div>
      <div :class="{ hide: edit }" id="list">
        <SettlementCommpent
          v-show="showCart"
          :sendData="data"
          :weight="weight"
          :listTotalMoney="listTotalMoney"
          :specifications="specifications"
          :startingPrice="startingPrice"
          :distance="distance"
          :distributionScope="distributionScope"
          :weightLimit="weightLimit"
          :showCart="showCart"
          :queryCartList="queryCartList"
          :paramValue="paramValue"
          :originalTotalMoney="originalTotalMoney"
          :basicDistributionFee="basicDistributionFee"
        ></SettlementCommpent>
      </div>
    </div>
    <div class="settlement-list">
      <div class="settlement-checked">
        <div
          class="settlement-all"
          :class="{ active: allSelecred == true }"
          @click="selecredBtn(carList), (show = !show)"
        >
          {{ allSelecred ? "√" : "" }}
        </div>
        <div class="settlement-text">全选</div>
      </div>
      <div :class="{ hide: edit }">
        <div class="settlement-desc">
          <div class="total-price">
            <p>
              合计<span class="price"
                >￥{{ showCart ? listTotalMoney : 0 }}</span
              >
            </p>
            <p>
              总优惠<span class="discount"
                >￥{{ showCart ? data?.marketNewCustomer?.money : 0 }}</span
              >
            </p>
          </div>
          <div
            class="settlement"
            :class="{
              active:
                showCart &&
                listTotalMoney >= startingPrice &&
                distance <= distributionScope &&
                weight <= weightLimit,
            }"
            @click="goToSettlementview"
          >
            <p class="btn-text">
              {{ btnResults }}
            </p>
            <p class="business">{{ showCart ? 1 : 0 }}个商家</p>
          </div>
        </div>
      </div>

      <div :class="{ hide: !edit }">
        <div class="settlement-desc">
          <div class="settlement" :class="{ active: showCart }">
            <p
              class="business"
              @click="
                removeItem(carList), (remove = !remove), (allSelecred = false)
              "
            >
              删除
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import SettlementCommpent from "./SettlementCommpent.vue";
export default {
  props: {
    shopCart: {
      type: Object,
    },
  },
  data() {
    return {
      empty: true,
      allSelecred: false,
      checked: false,
      carList: [],
      data: {},
      count: 0,
      show: false,
      showCart: false,
      listTotalMoney: 0,
      weight: 0,
      weightLimit: 0,
      edit: false,
      removeArr: [],
      remove: false,
      queryCartList: [],
      specifications: [],
      startingPrice: 0,
      distance: 0,
      distributionScope: 0,
      originalTotalMoney: 0,
      paramValue: 0,
      basicDistributionFee: 0,
    };
  },
  created() {
    this.getShoppingCarList = debounce(this.getShoppingCarList);
  },
  mounted() {
    console.log(this.shopCart);
    this.getShoppingCarList();
  },
  methods: {
    selecredBtn(list) {
      this.allSelecred = !this.allSelecred;
      for (let i = 0; i < list.length; i++) {
        list[i].checked = this.allSelecred;
      }
    },
    selecred(list) {
      for (let i = 0; i < list.length; i++) {
        list[i].checked = false;
      }
      this.allSelecred = false;
    },
    ShowSettlement() {
      console.log("我触发了");
      let count = 0;
      let money = 0;
      let weight = 0;
      for (let i = 0; i < this.carList.length; i++) {
        if (this.carList[i].checked) {
          money += this.carList[i].totalMoney;
          weight += this.carList[i].totalWeight;
          count++;
        }
      }
      let yhMoney;
      this.originalTotalMoney = (
        money 
      ).toFixed(1);
      if (money > this.data?.marketNewCustomer?.money) {
        this.listTotalMoney = (
          money -
          this.data?.marketNewCustomer?.money +
          (this.paramValue * this.distance * weight) +
          parseInt(this.basicDistributionFee) 
        ).toFixed(1);
        yhMoney = (this.data?.marketNewCustomer?.money).toFixed(1);
      } else {
        this.listTotalMoney = (
          money +
          (this.paramValue * this.distance * weight) +
          parseInt(this.basicDistributionFee) 
        ).toFixed(1);
      }
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

      if (count > 0) {
        this.showCart = true;
        this.allSelecred = false;
      } else {
        this.showCart = false;
      }

      if (count == this.carList.length && count !== 0) {
        console.log("改变就是好事");
        this.allSelecred = true;
      }

      if (count == 0 && this.carList.length == 1) {
        this.allSelecred = false;
      }
    },

    getSpecifications() {
      this.$axios
        .get(`https://admin.zhyumi.cn/ddfresh/app/sys/params/orderSetList`)
        .then(({ data }) => {
          console.log(data);
          this.specifications = data.data;
          this.startingPrice = data.data[0].paramValue;
          this.distributionScope = data.data[2].paramValue;
          this.weightLimit = data.data[1].paramValue;
          this.paramValue = data.data[3].paramValue;
          this.basicDistributionFee = data.data[4].paramValue;
        });
    },

    getShoppingCarList() {
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
          console.log(data);
          this.queryCartList = data.data;
          this.data = data.data[0];
          if (data.data.length > 0) {
            if (data.data[0].skuList.length > 0) {
              this.empty = false;
              this.carList = data.data[0].skuList;
              this.carList = this.carList.map((t) => {
                return (t = {
                  ...t,
                  checked: false,
                });
              });

              this.getDistance(
                22.270202,
                113.515129,
                data.data[0].lat,
                data.data[0].lng
              );
            }
          } else {
            this.carList = [];
            this.data = {};
            this.empty = true;
          }
        });

      this.getSpecifications();
    },
    setChecked(id) {
      this.checked = id;
    },

    removeItem(list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        console.log(list[i].checked);
        if (list[i].checked) {
          arr.push(list[i].goodsId);
        }
      }

      this.$emit("removeItem", arr);
    },

    goToSettlementview() {
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
      s = s.toFixed(1); //保留两位小数
      this.distance = s;
      console.log("经纬度计算的距离:" + this.distance + "km");
    },
  },
  computed: {
    btnResults() {
      let r;
      this.showCart
        ? this.listTotalMoney >= this.startingPrice
          ? this.distance <= this.distributionScope
            ? this.weight <= this.weightLimit
              ? (r = "去结算")
              : (r = "超重")
            : (r = "超出配送范围")
          : (r = "还差 " + this.startingPrice - this.listTotalMoney)
        : (r = "结算");
      console.log(r);
      return r;
    },
  },
  watch: {
    shopCart() {
      this.getShoppingCarList();
    },
    show() {
      this.ShowSettlement();
    },
    remove() {
      this.getShoppingCarList();
    },
  },
  components: { SettlementCommpent },
};
</script>

<style lang="scss" scoped>
.hide {
  display: none;
}
.shopping-cart {
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 100vh;
  padding-bottom: 55px;

  .shopping-head {
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 44px;
    padding: 7px 3px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(255, 61, 61);

    .shopping-head-title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 225px;
      height: 30px;
      line-height: 30px;
    }

    .setting {
      position: absolute;
      width: 50px;
      height: 100%;
      height: 44px;
      top: 0;
      right: 5px;
      text-align: center;
      line-height: 44px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .shopping-list {
    box-sizing: border-box;
    width: 100vw;
    height: 220px;
    padding: 3vw 3vw;

    .empty-shopping-car {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #8799a3;

      img {
        display: block;
        width: 150px;
      }
    }

    .shopping-car {
      // padding: 4vw;
      background-color: #fff;

      .shop-name {
        display: flex;
        align-items: center;
        padding: 2vw;
        font-size: 4vw;
        font-weight: 600;

        .settlement-all {
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          border: 1px solid #aaa;
          border-radius: 999px;
          margin-right: 5px;
          font-size: 16px;
          color: #fff;
          font-weight: 900;

          &.active {
            background-color: #e54d42;
            border-color: #e54d42;
          }
        }
      }
      .shopcart-list {
        display: flex;
        align-items: center;
        padding: 2vw;
        border-top: 1px solid #eee;

        & p:nth-child(1) {
          font-size: 3.8vw;
        }

        & p:nth-child(2) {
          font-size: 3.2vw;
          line-height: 5.4vw;
          color: #aaa;
        }

        & p:nth-child(3) {
          font-size: 3.2vw;
          color: #aaa;
        }

        .settlement-all {
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          border: 1px solid #aaa;
          border-radius: 999px;
          margin-right: 5px;
          font-size: 16px;
          color: #fff;
          font-weight: 900;

          &.active {
            background-color: #e54d42;
            border-color: #e54d42;
          }
        }

        .img-box {
          width: 12.2vw;
          height: 12.2vw;
          overflow: hidden;

          img {
            border-radius: 2vw;
            width: 100%;
          }
        }

        .text {
          flex: 1;
        }

        .total {
          width: 17vw;
        }
      }
    }
  }

  .settlement-list {
    box-sizing: border-box;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    left: 0;
    bottom: 55px;
    width: 100vw;
    height: 50px;
    padding: 0 15px;
    background-color: #fff;

    .settlement-checked {
      display: flex;
      align-items: center;

      .settlement-all {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 26px;
        height: 26px;
        border: 1px solid #aaa;
        border-radius: 999px;
        margin-right: 5px;
        font-size: 16px;
        color: #fff;
        font-weight: 900;

        &.active {
          background-color: #e54d42;
          border-color: #e54d42;
        }
      }
    }

    .settlement-desc {
      display: flex;
      align-items: center;
      .total-price {
        margin-right: 10px;
        font-size: 14px;
        color: #333;
        text-align: right;
        .price {
          font-weight: 700;
          margin-left: 5px;
        }

        .discount {
          font-size: 12px;
          font-weight: 700;
          color: #e54d42;
          margin-left: 5px;
        }
      }
    }

    .settlement {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 35px;
      color: #fff;
      font-size: 16px;
      padding: 0 10px;
      background-color: #aaa;
      border-radius: 20px;
      font-weight: 700;

      .business {
        font-size: 12px;
        font-weight: 500;
      }

      .btn-text {
        font-size: 3.2vw;
        line-height: 5vw;
      }

      &.active {
        background-color: #ff3d3d;
      }
    }
  }
}
</style>