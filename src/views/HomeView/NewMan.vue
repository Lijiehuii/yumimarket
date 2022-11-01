<template>
  <div class="new-man" v-if="newCustomerShopList.length > 0">
    <div class="newman-box">
      <div class="newman-title">
        <div class="title-left">新客专享优惠</div>
        <div class="title-right">
          <span>新客补贴</span><span>全场低价</span>
        </div>
      </div>
      <div class="sub">
        <div class="seizeaseat"></div>
        <div class="sub-right">
          <p>{{ newCustomerShopList[0].shopName }}</p>
          <span><i>门店新客专享</i></span>
         <div>
            <p>
            首单满
            <span>￥{{ newCustomerShopList[0].marketNewCustomer?.fullmoney }}</span
            >立减￥<span>{{
              newCustomerShopList[0].marketNewCustomer?.fullmoney
            }}</span>

          </p>
          <button @click="$router.push('/shopstore')">前往下单</button>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marketId: String
  },
  data() {
    return {
      newCustomerShopList: [],
    };
  },
  created() {
    this.getNewManData();
  },
  methods: {
    getNewManData() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/shop/shopManage/getNewCustomerShopList?page=1&limit=5&marketId=${this.marketId}`
        )
        .then(({ data }) => {
          console.log(data.data, "这是新人的数据");
          this.newCustomerShopList = data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new-man {
  width: 100vw;
  padding: 0vw 2.5vw 2.5vw 2.5vw;
  background-image: linear-gradient(#f1f1f1 50%,#fff 92%, #f1f1f1);
}
.newman-box {
  width: 100%;
  height: 40vw;
  border-radius: 2vw;
  background-image: url(@/assets/imgs/new-customer-bg2.28e0d9af.png);
  background-size: contain;

  .newman-title {
    display: flex;
    justify-content: space-between;
    padding: 2.8vw;
    color: #fff;

    .title-left {
      font-size: 3.8vw;
      font-weight: 700;
    }

    .title-right {
      font-size: 3vw;

      span {
        margin-left: 1.5vw;
      }
    }
  }

  .sub {
    display: flex;
    justify-content: flex-end;
    width: 97%;
    height: 24vw;
    margin: 0 auto;
    border-radius: 2vw;
    text-align: left;
    background-image: url(@/assets/imgs/new-customer-item.56a7d085.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .seizeaseat {
        width: 27vw;
        height: 24vw;
    }

    .sub-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
        height: 100%;
        padding: 2.6vw 3.7vw;

        & p:nth-child(1) {
            font-size: 3.7vw;
            font-weight: bold;
        }

        & span:nth-child(2) {
            
            i {
                padding: 0.4vw 1vw;
                border-radius: .5vw;
                font-size: 3vw;
                border: 0.2vw solid red;
                color: red;
            }
        }

        & div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            align-items: center;

            p {
                font-size: 3vw;
                font-weight: normal;
                color: red;

                & span:nth-child(2) {
                    display: inline-block;
                    transform: translateY(.2vw);
                    font-size: 5.3vw;
                    font-weight: bold;
                }
            }

            button {
                height: 6vw;
                line-height: 6vw;
                padding: 0 2.7vw;
                border: none;
                outline: none;
                border-radius: 999px;
                font-size: 3vw;
                color: #fff;
                background-color: #e54d42;
            }
        }
    }
  }
}
</style>