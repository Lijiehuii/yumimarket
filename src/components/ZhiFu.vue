
<template>
  <div class="pay-item">
    <div class="back-item" @click="goBack">
      <span class="span-lf">&lt;</span>
      <span class="span-gt">支付</span>
    </div>
    <div class="pay-amount">
      <p class="pay-text">支付金额</p>
      <p class="money">￥{{$route.query.totalMoney}}</p>
    </div>
    <div>
      <div class="pay-way">
        <!-- <van-radio-group v-model="radio"> -->
        <div class="pay-vxin">
          <div class="vx-lf">
            <img src="https://zhyumi.cn/static/img/pay/wx.png" />
          </div>
          <div class="vx-gt">
            <div class="recommend">
              <p>微信支付</p>
              <p>推荐使用微信支付</p>
            </div>
            <div class="checked">
              <!-- <van-radio name="1" checked-color="#ee0a24"></van-radio> -->
              <van-radio-group v-model="checked">
                <van-radio name="1"></van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>

        <div class="pay-zfb">
          <div class="zfb-lf">
            <img src="https://zhyumi.cn/static/img/pay/zfb.png" />
          </div>
          <div class="zfb-gt">
            <div class="recommend">
              <p>支付宝支付</p>
              <p>推荐使用支付宝支付</p>
            </div>
            <div class="checked">
              <!-- <van-radio name="2" checked-color="#ee0a24"></van-radio> -->
              <van-radio-group v-model="checked">
                <van-radio name="2"></van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
        <!-- </van-radio-group> -->
      </div>

      <div></div>
    </div>
    <div class="btn">
      <span>确认支付</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: "1",
    };
  },
  methods: {
    goBack() {
      this.$router.push({name: 'mineView'})
    }
  },
};
</script>

<style lang="scss" scoped>
.pay-item {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: #eee;

  .back-item {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ff3d3d;

    .span-lf,
    .span-gt {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }

    .span-lf {
      position: absolute;
      left: 20px;
    }
  }

  .pay-amount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 132px;
    text-align: center;
    background-color: #fff;
    .pay-text {
      font-size: 14px;
      color: #909399;
      // padding: 5px 0;
    }
    .money {
      font-size: 25px;
      font-weight: 500;
      padding: 5px 0;
    }
  }

  .pay-way {
    width: 100vw;
    height: 120px;
    background-color: #fff;
    margin-top: 10px;
    padding: 15px;

    .pay-vxin {
      display: flex;
      justify-content: space-between;
      height: 40px;
      padding: 0 25px;
      margin-bottom: 10px;

      .vx-lf {
        display: flex;
        flex: 0 0 35px;
        align-items: center;
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-right: 15px;

        img {
          display: block;
          width: 35px;
          height: 35px;
        }
      }
      .vx-gt {
        display: flex;
        justify-content: space-between;
        height: 40px;
        width: 100%;

        .recommend {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p:nth-child(1) {
            font-size: 20px;
            color: #333;
          }
          p:nth-child(2) {
            font-size: 14px;
            color: #999;
          }
        }

        .checked {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
        }
      }
    }

    .pay-zfb {
      display: flex;
      justify-content: space-between;
      height: 40px;
      padding: 0 25px;

      .zfb-lf {
        display: flex;
        flex: 0 0 35px;
        align-items: center;
        width: 40px;
        height: 40px;
        line-height: 40px;
        margin-right: 15px;

        img {
          width: 35px;
          height: 35px;
        }
      }
      .zfb-gt {
        display: flex;
        justify-content: space-between;
        height: 40px;
        width: 100%;

        .recommend {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p:nth-child(1) {
            font-size: 20px;
            color: #333;
          }
          p:nth-child(2) {
            font-size: 14px;
            color: #999;
          }
        }

        .checked {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
  
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 315px;
    height: 40px;
    margin: 40px auto 15px;
    font-size: 20px;
    color: #fff;
    background-color: #fa436a;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgb(219 63 96 / 40%);
      
    
  }
}
</style>