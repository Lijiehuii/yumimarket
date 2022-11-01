<template>
  <div class="shop-item">
    <div class="header">
      <div class="gouback">
        <span @click="coneBack">&lt;</span>
        <span>3</span>
      </div>
      <div class="middle">
        <div class="middle-nav">
          <div class="lf-top">
            <h2>{{ shopMsg.shopName }}</h2>
          </div>
          <div class="lf-botton">
            <span>星{{ shopMsg.overallScore }}</span
            ><span>已售{{ shopMsg.peopleNum }}</span
            ><span>人均￥ {{ shopMsg.perOrderMoney }}</span>
          </div>
        </div>
        <div class="middle-pho"><img :src="shopMsg.wholeIcon" /></div>
      </div>
      <div class="notice">
        公告：{{ shopMsg.notice ? shopMsg.notice : "暂无公告" }}
      </div>
      <div class="new-customer" v-if="newCustomer">
        <span>新客立减{{ newCustomer.money }}元</span>
        <span>共{{ newCustomer.status }}个优惠&gt;</span>
      </div>
    </div>
    <div class="nav-list">
      <div class="overflow" ref="flow">
        <div
          v-for="n in listType"
          :key="n.id"
          class="lists"
          ref="lists"
          :data-id="n.id"
          :class="{ active: classSelect == n.id }"
          @click="classSelect = n.id"
        >
          <a :class="{ active: classSelect == n.id }" :href="`#${n.id}`">{{
            n.name
          }}</a>
        </div>
      </div>
      <div class="scroll" @scroll="linkage">
        <div
          v-for="n in listType"
          :key="n.id"
          :id="n.id"
          ref="shopname"
          class="shopname"
        >
          <div>{{ n.name }}</div>
          <div v-for="t in n.goodsList" :key="t.id" class="nav-text">
            <div class="pho"><img :src="t.wholeIcon" alt="" /></div>
            <div class="nav-shop">
              <div class="shop-goods">
                <span>{{ t.title }}</span
                ><span>约({{ t.weight }}{{ t.weightUnitName }})</span>
              </div>
              <div class="goodrate">
                <span>已售{{ t.saleNum }}</span
                ><span>好评率{{ t.goodRate }}</span>
              </div>
              <div class="shop-money">
                <span
                  ><i>￥{{ t.price }}</i
                  >/{{ t.weight + t.weightUnitName }}</span
                ><span
                  >
                  <AddBuyNum
                    :sku="sku"
                    :ban="ban"
                    :itemSkuId="t.skuList[0].id"
                    :show="show"
                    :goodsId="t.id"
                    @sendShopCartData="sendShopCartData"
                  ></AddBuyNum>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="box">
      <cart-view :shopCart="shopCart" :marketId="marketId" :sku="sku" @sendShopCartData="sendShopCartData"></cart-view>
    </div>
  </div>
</template>

<script>
import AddBuyNum from "@/components/AddBuyNum.vue";
import CartView from '../BottomCartView/CartView.vue';
export default {
  props: {
    setShopId: String,
    marketId: String,
    shopCart: Object,
    sku: Array,
  },
  data() {
    return {
      show: false,
      ban: false,
      shopMsg: [],
      newCustomer: [],
      listType: [],
      productList: [],
      classSelect: "fa87f4fc811ed4a936c8171eebe7a762",
    };
  },
  created() {
    console.log(this.setShopId);
    this.getShopMsg();
    this.getProductList();
  },
  methods: {
    coneBack() {
      console.log(this.$route.query.pathName, this.$route.query.goodId);
      // this.$router.replace({ name: "details" });
    if(this.$route.query.pathName) {
      this.$router.push({
        path: "/details",
        query: {
          goodId: this.$route.query.goodId,
          getShopInfo: this.$route.query.getShopInfo,
          sku: this.$route.query.sku,
          shopCart: this.$route.query.shopCart,
          pathName: this.$route.query.pathName,
        },
      });
    } else {
      this.$router.push('/home')
    }
      // this.$router.back(-1);
    },
    getShopMsg() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/shop/shopManage/getShopInfo?id=${this.setShopId}&lat=&lng=`
        )
        .then(({ data }) => {
          this.shopMsg = data.data.detail;
          this.newCustomer = data.data.marketNewCustomer;
          //   console.log(this.shopMsg);
          //   console.log(this.newCustomer);
        });
    },
    getProductList() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getShopClassAndGoods?shopId=${this.setShopId}`
        )
        .then(({ data }) => {
          this.listType = data.data;
          this.productList = data.data.goodsList;
          console.log(this.listType);
            console.log(this.productList);
        });
    },
    linkage(e) {
      let arr = [0];
      let listsArr = [0];
      let H = 0;
      let h = 0;
      for (let i = 0; i < this.$refs.shopname.length; i++) {
        H += this.$refs.shopname[i].offsetHeight;
        h += this.$refs.lists[i].offsetHeight;
        arr.push(H);
        listsArr.push(h);
      }
      for (let i = 0; i < arr.length; i++) {
        if (e.target.scrollTop >= arr[i] && e.target.scrollTop < arr[i + 1]) {
          this.$refs.flow.scrollTop = listsArr[i];
          this.classSelect = this.$refs.lists[i].dataset.id;
        }
        if (e.target.scrollTop >= arr[arr.length - 1] - 520) {
          this.classSelect =
            this.$refs.lists[this.$refs.lists.length - 1].dataset.id;
        }
      }
      // console.log(e)
    },

    sendShopCartData(val) {
        console.log('接收数据')
        this.$emit('sendShopCartData', val)
    }
  },
  watch: {
    $route(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  components: { AddBuyNum, CartView },
};
</script>

<style lang="scss" scoped>
.shop-item {
  box-sizing: border-box;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 600;
  background-color: #fff;
  padding-bottom: 60px;

  .box {
    width: 100vw;
    height: 44px;
    background-color: pink;
  }

  .gouback {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    color: black;
    padding: 0 15px;
  }

  .middle {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100vw;
    // height: 122px;
    padding: 15px;

    .middle-nav {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: auto;
      height: 60px;

      .lf-top {
        font-size: 22px;
        font-weight: 600;
      }

      .lf-botton {
        font-size: 12px;
        color: #8799a3;
        padding-right: 10px;

        span {
          display: inline-block;
          margin-right: 10px;
        }
      }
    }

    .middle-pho {
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .notice {
    font-size: 12px;
    color: #8799a3;
    margin-left: 15px;
  }

  .new-customer {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;

    span:nth-child(1) {
      padding: 1px 2px;
      font-size: 12px;
      color: #e54d42;
      border: 1px solid #e54d42;
      border-radius: 3px;
    }

    span:nth-child(2) {
      font-size: 12px;
      color: #8799a3;
    }
  }
}

.nav-list {
  box-sizing: border-box;
  display: flex;
  height: calc(100vh - 160px);
  padding-bottom: 60px;

  .overflow {
    width: 100px;
    height: 100%;
    overflow: auto;

    .lists {
      width: 100px;
      height: 50px;
      font-size: 14px;
      line-height: 50px;
      text-align: center;

      a {
        display: inline-block;
        text-decoration: none;
        color: #333;

        &.active {
          color: #f37b1d;
        }
      }
    }
  }

  .scroll {
    width: calc(100% - 100px);
    height: 100%;
    overflow: auto;

    .shopname {
      width: 100%;

      .nav-text {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 85px;
        // line-height: 85px;
        padding: 5px;

        .pho {
          width: 75px;
          height: 75px;

          img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }

        .nav-shop {
          width: 100%;
          padding-left: 10px;
          .shop-goods {
            margin-bottom: 10px;
            span {
              font-size: 14px;
              font-weight: 600;
              color: #333;
              padding-right: 5px;
              margin-bottom: 10px;
            }
          }

          .goodrate {
            margin-bottom: 10px;
            span {
              font-size: 12px;
              color: #8799a3;
              padding-right: 5px;
            }
          }

          .shop-money {
            display: flex;
            justify-content: space-between;

            span {
              font-size: 12px;
              color: #8799a3;
              i {
                font-size: 16px;
                color: #e54d42;
                font-weight: 600;
              }
            }

            span:nth-child(2) {
              display: inline-block;
              height: 18px;
              line-height: 18px;
              text-align: center;
              color: #333;
              padding: 0px 4px;
              font-weight: 600;
              border-radius: 4px;
              // background-color: #fbbd08;
            }
          }
        }
      }
    }
  }
}
</style>