<template>
  <!-- <div>
        <div v-for="(t,i) in goodsList" :key="i" class="">
            <div>{{t.billCode}} &lt;</div>
            <div>关闭交易{{}}</div>
            根据数据判断哪些是代付款，关闭交易的值
        </div>
        <div>
            <div>
                <div>
                    <img :src="t.goodsOrderDetails.wholeShopIcon" alt="商店">
                </div>
                <div>
                    店名
                </div>
            </div>
            <div>
                <div>
                    应该需要循环在此商店够买的所有商品
                    <img src="" alt="商品图">
                </div>
                <div>
                    <p>优惠后价钱</p>
                    <p>原价</p>
                    <p>商品数量</p>
                </div>
            </div>
        </div>
        <div>
            <div>优惠-￥{{'多少钱'}}</div>
            <div>实付价钱</div>
            如果交易不是代付款或什么的不会出现这两个按钮
            <button>取消订单</button>
            <button>支付</button>
        </div>
    </div> -->
  <div class="allpage">
    <div class="goods-item" @scroll="addPage">
      <div v-if="count == 0" class="empty">
        <van-empty description="还没有订单再去逛逛吧" />
      </div>

      <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      > -->
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->

      <div class="good-nav" v-for="t in goodsList" :key="t.billCode + t.id">
        <div class="goods-num van-hairline--bottom">
          <span>{{ t.billCode }} &gt;</span>
          <span>{{ orderStatusMap[t.orderStatus] }}</span>
        </div>
        <div class="shop-img">
          <img :src="t.orderList[0]?.wholeShopIcon" alt="photo" />
          <span>{{ t.orderList[0]?.shopName }}</span>
        </div>
        <div class="shop-quantity van-hairline--bottom">
          <div class="quantity-lf">
            <div
              class="imgs"
              v-for="s in t.orderList[0]?.goodsOrderDetails"
              :key="s.id"
            >
              <div class="img-total">
                <div class="img-lf">
                  <img :src="s.wholeIcon" alt="" />
                  <p>{{ s.goodsTitle + s.title }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="img-gt">
            <p>￥{{ t.orderList[0]?.totalAmt }}</p>
            <p>￥{{ t.orderList[0]?.goodsSum }}</p>
            <p>共{{ t.orderList[0]?.totalNum }}件</p>
          </div>
        </div>
        <div class="pay-item">
          <span v-if="t.yhMoney != 0" class="yh"
            >优惠<i>-￥{{ t.yhMoney }}</i></span
          >
          <span class="sj">实付￥{{ t.totalAmt }}</span>

          <span
            @click="
              showPopup(), (goodsId = t.id), (orderStatus = t.orderStatus)
            "
            class="cancel"
            v-if="t.orderStatus == 3"
            >取消订单</span
          >

          <span class="pay" v-if="t.orderStatus == 3">支付</span>
        </div>
      </div>

      <!-- </van-list> -->

      <van-popup
        v-model="show"
        style="width: 300px; height: 150px; border-radius: 6px"
        class="van-popup1"
      >
        <div class="popup-item">
          <p
            style="
              height: 50px;
              line-height: 50px;
              text-align: center;
              font-size: 18px;
              color: #333;
              font-weight: 600;
            "
          >
            提示
          </p>
          <p
            style="
              height: 50px;
              line-height: 50px;
              text-align: center;
              font-size: 14px;
              color: #999;
              border-bottom: 1px solid rgb(241, 241, 241);
            "
          >
            确认取消订单？
          </p>
          <div class="yorn" style="width: 300px; display: flex">
            <span
              @click="cancel"
              style="
                display: block;
                color: black;
                width: 150px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 18px;
                border-right: 1px solid rgb(241, 241, 241);
              "
              >取消</span
            >
            <span
              @click.stop="sendId()"
              style="
                display: block;
                color: blue;
                width: 150px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 18px;
              "
              >确认</span
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsList: Array,
    msg: String,
    count: {
      type: [Number, String],
    },
  },
  data() {
    return {
      show: false,
      goodsId: "",
      orderStatus: "",
      page: 1,
      orderStatusMap: {
        3: "待付款",
        5: "5", //退款
        7: "待发配", //退款
        9: "待收货",
        11: "待评论",
        13: "已完成",
        15: "交易关闭",
        17: "售后",
        80: "骑手到店",
        20: "骑手接单", //退款
        2: "配送中",
        1: "订单已生成", //退款
        16: "订单异常", //退款
        4: "订单取消",
      },
    };
  },
  created() {
    // console.log(this.orderStatusMap["3"]);
    // console.log(this.count, "yyyy");
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    sendId() {
      // console.log(this.goodsId, this.goodsList);
      // 传过去的值
      this.$emit("sendId", this.goodsId, this.orderStatus);
      this.show = false;
      // this.$toast(this.msg);
    },
    cancel() {
      this.show = false;
    },
    addPage(e) {
      // console.log(e.target.scrollTop, e.target.scrollHeight - e.target.offsetHeight)

      if (e.target.scrollTop >= e.target.scrollHeight - e.target.offsetHeight) {
        this.page++;
        // console.log("hello", this.page);
        this.$emit("addPage", this.page);
      }
    },
  },
  mounted() {
    // console.log(this.goodsList, 9999);
    // console.log(this.count, 1999);
  },
  watch: {
    goodsId() {
      // console.log(this.goodsId, this.orderStatus);
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-item {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 88px;
  left: 0;
  padding-bottom: 88px;
  background-color: #eee;
  overflow: hidden;
  overflow-y: auto;
  z-index: 600;
}

.good-nav {
  width: 98vw;
  height: 216px;
  padding: 10px 0px;
  margin: 10px auto;
  border-radius: 4px;
  background-color: #fff;

  .goods-num {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    // border-bottom: 1px solid rgb(193, 193, 193);

    span:nth-child(1) {
      font-size: 12px;
      color: #333;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #39b54a;
    }
  }

  .shop-img {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 55px;
    line-height: 55px;
    padding: 10px;

    img {
      display: block;
      width: 35px;
      height: 35px;
    }

    span {
      font-size: 14px;
      color: #333;
      font-weight: 600;
      padding-left: 10px;
    }
  }

  .shop-quantity {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 84px;
    // border-bottom: 1px solid rgb(193, 193, 193);

    .quantity-lf {
      display: flex;
      width: 275px;
      overflow: hidden;
      overflow-x: auto;

      .imgs {
        display: flex;

        .img-total {
          display: flex;
          justify-content: space-between;

          .img-lf {
            height: 75px;
            width: 79px;
            margin: 0px 10px;

            img {
              display: block;
              width: 75px;
              height: 63px;
            }

            p {
              width: 75px;
              font-size: 12px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              padding-top: 5px;
            }
          }
        }
      }
    }

    .img-gt {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: flex-end;
      width: 70px;
      height: 84px;
      line-height: 14px;
      padding: 0 10px;
      text-align: center;

      p:nth-child(1) {
        font-size: 12px;
        font-weight: 600;
        color: #333;
      }
      p:nth-child(2) {
        font-size: 12px;
        color: #aaa;
        text-decoration: line-through;
      }
      p:nth-child(3) {
        font-size: 12px;
        color: #aaa;
      }
    }
  }

  .pay-item {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    padding: 10px;

    .yh {
      font-size: 12px;
      color: #666;
      margin-left: 10px;
      i {
        font-size: 12px;
        color: #e54d42;
      }
    }
    .sj {
      font-size: 12px;
      font-weight: 600;
      color: #333;
      margin-left: 10px;
    }
    .cancel {
      display: inline-block;
      padding: 5px 15px;
      font-size: 12px;
      font-weight: 600;
      color: #333;
      border: 1px solid #bcbcbc;
      border-radius: 4px;
      margin-left: 10px;
    }

    .pay {
      font-size: 12px;
      font-weight: 600;
      border: 1px solid #bcbcbc;
      border-radius: 4px;
      padding: 5px 15px;
      margin-left: 10px;
      background-image: linear-gradient(90deg, #fbaaa2, #ff3d3d);
    }
  }
}
</style>