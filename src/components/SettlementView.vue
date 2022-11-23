
<template>
  <div class="aboutUs">
    <div class="linear-bgc">
      <div class="back-item">
        <span class="span-lf" @click.stop="goBlck">&lt;</span>
        <span class="span-gt">提交订单</span>
      </div>
      <div class="main">
        <div class="change">
          <div class="mode">
            <div class="text-dec">
              <span
                class="span-mode"
                :class="{ active: show }"
                @click.stop="(show = true), (pickupMethod = 1), (concatPhone = '')"
                >骑手配送</span
              >
              <span
                class="span-mode"
                :class="{ active: !show }"
                @click.stop="(show = false), (pickupMethod = 3), (addressId = ''), (setaddress = '')"
                >自提点自取</span
              >
            </div>
            <div class="change-address" v-show="show">
              <div
                class="address-top"
                @click="getLatAndLng(), (showLatAndLng = true)"
              >
                <span class="address-tl">{{
                  setaddress ? setaddress : "请选择收货地址"
                }}</span
                ><span class="address-tg">&gt;</span>
              </div>
              <div class="address-under">
                <span class="address-ul">立即送出</span
                ><span class="address-ug" @click.stop="shows = true"
                  >大约{{
                    JSON.stringify(requireReceiveTime)
                      .slice(0, requireReceiveTime.length - 2)
                      .split(" ")[1]
                  }}到<i>&gt;</i>
                </span>
              </div>
            </div>
            <div v-show="!show" class="personal-address">
              <div class="personal-top">
                <div class="top-fl">
                  <h3>{{ ddfresh.name }}</h3>
                  <p>{{ ddfresh.addressDetail }}</p>
                </div>
                <div class="top-gt">&gt;</div>
              </div>
              <div class="personal-middle">
                <div class="middle-fi" @click.stop="shows = true">
                  <p>自取时间</p>
                  <p>
                    {{
                      JSON.stringify(requireReceiveTime)
                        .slice(0, requireReceiveTime.length - 2)
                        .split(" ")[1]
                    }}&gt;
                  </p>
                </div>
                <div class="middle-sc" @click="overlay = !overlay">
                  预留电话{{ concatPhone }}
                </div>
              </div>
              <div class="personal-under">
                <input type="checkbox" checked />同意并接受<i
                  >《自提点自取服务协议》</i
                >
              </div>
              <van-overlay :show="overlay">
                <div class="wrapper">
                  <div class="block">
                    <div class="block-box">
                      <p>预留电话</p>
                      <div class="textarea-box">
                        <textarea
                          placeholder="请输入预留电话"
                          v-model="phoneNum"
                        ></textarea>
                      </div>
                      <div class="block-footer">
                        <div @click.stop="overlay = false">取消</div>
                        <div
                          @click.stop="
                            (overlay = false), (concatPhone = phoneNum)
                          "
                        >
                          确定
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </van-overlay>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="title">
          {{ JSON.parse($route.query.carList)[0].shopName }}
        </div>
        <div
          class="goods"
          v-for="item in JSON.parse($route.query.carList)[0]?.skuList"
          :key="item.id"
          v-show="item.checked == true"
        >
          <div class="pho">
            <img :src="item.goodsWholeIcon" alt="图片" />
          </div>
          <div class="goods-details">
            <div class="goods-fl">
              <span>{{ item.goodsTitle }}</span>
              <span>{{ item.title }}</span>
              <span>x{{ item.buyNum }}</span>
            </div>
            <div class="goods-gt">
              ￥<strong>{{ item.totalMoney }}</strong>
            </div>
          </div>
        </div>
        <div class="reduce-price" v-show="pickupMethod == 1 && orderShopFeer != 0">
          <span>用户配送费(活动立减3元配送费)</span>
          <span
            ><i class="old-pirce">￥{{ orderShopFeer + 3 }}</i
            >￥<i>{{ orderShopFeer }}</i></span
          >
        </div>
        <div class="actual-price">
          <span>实付</span>
          <i>￥{{ finalMoeny }}</i>
        </div>
        <div class="remarks">
          <span>备注</span>
          <i>推荐使用无接触配送&gt;</i>
        </div>
        <div class="call-back" @click="open = !open">
          <span>如遇缺货</span>
          <i>{{ carList[0].outStock }}&gt;</i>
        </div>
        <van-action-sheet v-model="open" title="标题">
          <div class="content">
            <div
              @click="
                (carList[0].outStock = '缺货时电话与我沟通'), (open = false)
              "
            >
              缺货时电话与我沟通
            </div>
            <div
              @click="
                (carList[0].outStock = '其他商品继续配送 (缺货商品退款)'),
                  (open = false)
              "
            >
              其他商品继续配送 (缺货商品退款)
            </div>
            <div
              @click="
                (carList[0].outStock = '有缺货直接取消订单'), (open = false)
              "
            >
              有缺货直接取消订单
            </div>
          </div>
        </van-action-sheet>
      </div>
      <LatAndLngComponent
        v-show="showLatAndLng"
        :latAndLng="latAndLng"
        @setLatAndLngVal="setLatAndLngVal"
        @setShowLatAndLng="showLatAndLng = false"
      ></LatAndLngComponent>
      <div class="footer-bar">
        <div class="footer-content">
          <p>
            合计<span>￥{{ finalMoeny }}</span>
          </p>
          <p>总重量{{ JSON.parse($route.query.carList)[0].totalWeight }}kg</p>
        </div>
        <div class="cart-right" @click.stop="test">
          <span class="settlement" @click="removeItem(carList[0]?.skuList)">提交订单</span>
        </div>
      </div>
      <van-action-sheet v-model="shows" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>
<script>
// import { value } from "lodash-es";
import { toast } from "vant";
import LatAndLngComponent from "./LatAndLngComponent.vue";
// https://admin.zhyumi.cn/ddfresh/app/sys/params/orderSetList 订单收集列表
//https://admin.zhyumi.cn/ddfresh/app/selectTime 选择时间
//https://admin.zhyumi.cn/ddfresh/app/goods/order/getOrderShopFeer?weight=0.25&id=d427062b0dc84fc399b8d9c92b1e2bd5&lat=22.270202&lng=113.515129 获取订单购物费
//https://admin.zhyumi.cn/ddfresh/app/base/selfLiftingPoint/getList?page=0&limit=1&marketId=d427062b0dc84fc399b8d9c92b1e2bd5应该是市场的id
//https://admin.zhyumi.cn/ddfresh/app/goods/orderMain/buyerOrderPage?page=1&limit=10&queryParam=&orderStatus=3&dateBegin=2022-07-16&dateEnd=2022-10-16 下单的记录
//https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSelectList?page=1&limit=20&receiver=&lat=22.2548767&lng=113.5296236 获取地址

//https://admin.zhyumi.cn/ddfresh/app/goods/order/appSave post
//https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSelectList?page=1&limit=20&receiver=&lat=22.2548767&lng=113.5296236 请求地址模块
// pickupMethod: 1 配送方式 1 是骑手配送 好像3是 自提点自取
//requireReceiveTime: "2022-10-16 17:12:53" https://admin.zhyumi.cn/ddfresh/app/selectTime 获取后选择的时间
//selfLiftingPoint: "5a5751c8d64e57367a60f44038c0e695" 自提点 getItemData数据请求到的id
//concatPhone 自取东西的
export default {
  props: {
    marketId: String,
  },
  data() {
    return {
      open: false,
      overlay: false,
      show: true,
      selfLiftingPoint: "",
      pickupMethod: 1,
      timeArr: [],
      requireReceiveTime: 0,
      orderList: [],
      addressId: "",
      latAndLng: [],
      userLat: "",
      userLng: "",
      itemLat: "",
      itemLng: "",
      itemWeight: "",
      itemId: "",
      setaddress: "",
      distance: 0,
      orderShopFeer: 0,
      shows: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      showLatAndLng: false,
      carList: [],
      concatPhone: "",
      phoneNum: "",
      ddfresh: {},
      // orderList 需要修改数值 shippingFee: 配送费 originalTotalMoney： 原价 totalMoney： 总价 totalWeight：总重量
    };
  },
  created() {
    this.getItemData();
    // this.carList =
    this.carList = JSON.parse(this.$route.query.carList);
    console.log(this.carList)
    console.log(JSON.parse(this.$route.query.carList)); // save 的请求所需参数carList
  },
  computed: {
    finalMoeny() {
      if (
        JSON.parse(this.$route.query.carList)[0].originalTotalMoney >=
          JSON.parse(this.$route.query.carList)[0].marketNewCustomer?.fullmoney &&
        this.pickupMethod == 1
      ) {
        return (
          JSON.parse(this.$route.query.carList)[0].originalTotalMoney * 1 +
          this.orderShopFeer -
          JSON.parse(this.$route.query.carList)[0].marketNewCustomer?.fullmoney *
            1 -
          1
        ).toFixed(1);
      } else if (
        JSON.parse(this.$route.query.carList)[0].originalTotalMoney <
          JSON.parse(this.$route.query.carList)[0].marketNewCustomer?.fullmoney &&
        this.pickupMethod == 1
      ) {
        return (
          JSON.parse(this.$route.query.carList)[0].originalTotalMoney * 1 +
          this.orderShopFeer -
          1
        ).toFixed(1);
      } else if(
        JSON.parse(this.$route.query.carList)[0].originalTotalMoney >=
          JSON.parse(this.$route.query.carList)[0].marketNewCustomer?.fullmoney &&
        this.pickupMethod == 3
      ) {
        return (
          JSON.parse(this.$route.query.carList)[0].originalTotalMoney * 1 -
          JSON.parse(this.$route.query.carList)[0].marketNewCustomer?.fullmoney *
            1 -
          1
        ).toFixed(1);
      } else if(this.pickupMethod == 1) {
        return (
          JSON.parse(this.$route.query.carList)[0].originalTotalMoney * 1 + this.orderShopFeer - 1
        ).toFixed(1);
      } else {
        return (
          JSON.parse(this.$route.query.carList)[0].originalTotalMoney * 1 - 1
        ).toFixed(1);
      }
    },
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.requireReceiveTime = item.name;
      this.shows = false;
      console.log(item);
      toast(item.name);
    },

    changeShow() {
      if (this.show == true) {
        this.show = false;
      } else if (this.show == false) {
        this.show = true;
      }
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

    goBlck() {
      this.$router.push({ path: "/shoppingcart" });
    },
    getItemData() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/base/selfLiftingPoint/getList?page=0&limit=1&marketId=${this.marketId}`
        )
        .then(({ data }) => {
          console.log(data, "应该是超市的信息");
          this.ddfresh = data.data[0];
          this.selfLiftingPoint = data.data[0].id;
          this.itemLat = data.data[0].lat;
          this.itemLng = data.data[0].lng;
          this.itemWeight = data.data[0].weight;
          (this.itemId = data.data[0].marketId),
            (this.selfLiftingPoint = data.data[0].id);
        });
      this.$axios
        .get(`https://admin.zhyumi.cn/ddfresh/app/selectTime`)
        .then(({ data }) => {
          console.log(data, "这是获取配送的时间数据");
          this.timeArr = data.data;
          this.requireReceiveTime = data.data[0];

          for (let i = 0; i < data.data.length; i++) {
            this.actions[i] = {
              name: data.data[i],
            };
          }
          // actions
        });
      this.$axios
        .get(` https://admin.zhyumi.cn/ddfresh/app/sys/params/orderSetList`)
        .then(({ data }) => {
          console.log(data, "起送价和配送费");
          // this.test();
        });
    },
    test() {
      // let s = JSON.parse(this.$route.query.carList)
      // 这是将订单数据传入账号的请求
      if(this.addressId && this.pickupMethod == 1) {
        let obj =  {
          addressId: this.addressId,
          pickupMethod: this.pickupMethod,
          selfLiftingPoint: this.selfLiftingPoint,
          requireReceiveTime: "2022-10-16 18:56:02",
          orderList: this.carList, // 商品的数据
        }
        this.$axios
        .post("https://admin.zhyumi.cn/ddfresh/app/goods/order/appSave", obj)
        .then((data) => {
          console.log(data);
          if(data.data.msg == '保存成功') {
            this.$router.push({
            name: "zhifu",
            query: {
              totalMoney: this.finalMoeny,
            },
          });
          } else {
           setTimeout(()=> {
            this.$toast(data.data.msg)
           })
          }
         
        });
      } else if(!this.addressId && this.pickupMethod == 1) {
        this.$toast('请填写地址')
      }
      
      if(this.concatPhone && this.pickupMethod == 3) {
        let obj =  {
          concatPhone: this.concatPhone,
          pickupMethod: this.pickupMethod,
          selfLiftingPoint: this.selfLiftingPoint,
          requireReceiveTime: "2022-10-16 18:56:02",
          orderList: this.carList, // 商品的数据
        }
        this.$axios
        .post("https://admin.zhyumi.cn/ddfresh/app/goods/order/appSave", obj)
        .then((data) => {
          console.log(data);
          this.$router.push({
            name: "zhifu",
            query: {
              totalMoney: this.finalMoeny,
            },
          });
        });
      } else if(!this.concatPhone && this.pickupMethod == 3) {
        this.$toast('请填写手机号')
      }

      
    },
    getOrderShopFeer() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/order/getOrderShopFeer?weight=${this.$route.query.weight}&id=${this.itemId}&lat=${this.userLat}&lng=${this.userLng}`
        )
        .then(({ data }) => {
          console.log(data, "总共减免的价格, 需要传入商品重量和超市的id");
          this.orderShopFeer = data.data;
        });
    },
    getLatAndLng() {
      //点击进入选择地址之后返回数据
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSelectList?page=1&limit=20&receiver=&lat=22.2548767&lng=113.5296236`
        )
        .then(({ data }) => {
          console.log(data, "选择收货地址，计算经纬度用户经纬度");
          this.latAndLng = data.data;
        });
    },
    // 计算距离函数
    Rad(d) {
      //根据经纬度判断距离, 因为给出的经纬度值还不是弧度哪些东西
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
      s = s.toFixed(1) + "km"; //保留两位小数
      this.distance = s;
      console.log("经纬度计算的距离:" + this.distance);
    },

    setLatAndLngVal(lat, lng, id, address) {
      this.userLat = lat;
      this.userLng = lng;
      this.addressId = id;
      this.setaddress = address;
      this.getOrderShopFeer();
    },
  },
  components: { LatAndLngComponent },
  watch: {
    userLng() {
      this.getDistance(this.userLat, this.userLng, this.itemLat, this.itemLng);
      console.log(this.itemLat, this.itemLng);
      console.log(this.userLat, this.userLng, this.itemLat, this.itemLng);
    },

    finalMoeny(val) {
      this.carList[0] = {
        ...this.carList[0],
        totalMoney: val,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.aboutUs {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: #fff;

  .linear-bgc {
    box-sizing: border-box;
    width: 100vw;
    // height: 100vh;
    // padding: 0px 10px;
    background: linear-gradient(#ff3d3d, rgb(241, 241, 241));

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
    .main {
      margin-top: 10px;

      .mode {
        width: 100vw;
        // background-color: rgb(235, 155, 155);

        // background-color: blue;
        padding: 0px 15px;

        .text-dec {
          display: flex;
          align-items: flex-end;

          .span-mode {
            display: inline-block;
            width: 50%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            background-color: #f3d3d3;
            &.active {
              background-color: #fff;
              //  padding-top: 10px;
              height: 45px;
              line-height: 45px;
            }
          }
        }

        .change-address {
          // height: 45px;
          line-height: 45px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background-color: #fff;
          // background-color: #ff3d3d;
          .address-top,
          .address-under {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            padding: 10px;

            .address-tl {
              color: #333;
              font-weight: 700;
            }

            .address-tg {
              font-weight: 700;
              color: gray;
            }

            .address-ul {
              font-size: 16px;
              color: #333;
              font-weight: 600;
            }

            .address-ug {
              font-size: 14px;
              color: #39b54a;

              i {
                font-size: 14px;
                color: gray;
              }
            }
          }
        }

        .personal-address {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          background-color: #fff;
          .personal-top {
            display: flex;
            justify-content: space-between;
            height: 65px;
            padding: 10px;

            .top-fl {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              h3 {
                font-size: 16px;
                font-weight: 600;
                color: #333;
              }
              p {
                font-size: 12px;
                color: #8799a3;
              }
            }

            .top-gt {
              height: 45px;
              font-size: 16px;
              line-height: 45px;
              color: #8799a3;
            }
          }

          .personal-middle {
            display: flex;
            height: 38px;
            padding: 5px 10px;
            .middle-fi {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              font-size: 12px;
              p:nth-child(2) {
                font-weight: 600;
              }
            }
            .middle-sc {
              font-size: 12px;
              margin-left: 10px;
              color: #8799a3;
            }
          }

          .personal-under {
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 46px;
            line-height: 46px;
            i {
              color: #1cbbb4;
            }
          }
        }
      }
    }

    .footer {
      width: 100vw;
      // height: 100vh;
      margin-top: 10px;

      background-color: #fff;

      .title {
        box-sizing: border-box;
        width: 100vw;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        padding: 0px 10px;
        background-color: #fff;
      }

      .goods {
        display: flex;
        justify-content: space-between;
        width: 100vw;
        // height: 50px;
        padding: 10px;
        // margin: 5px 0;
        border-top: 1px solid #eee;
        border-bottom: 1px solid rgba(255, 255, 255, 0.6);
        background-color: #fff;

        .pho {
          width: 50px;
          height: 50px;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .goods-details {
          flex: 1;
          display: flex;
          justify-content: space-between;
          width: 100vw;
          height: 50px;

          .goods-fl {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 50px;
            padding-left: 15px;

            span {
              font-size: 14px;
              color: #aaa;
              font-weight: 200;
            }

            span:nth-child(1) {
              font-size: 16px;
              color: #333;
              font-weight: 500;
            }

            span:nth-child(3) {
              font-size: 12px;
            }
          }
          .goods-gt {
            height: 50px;
            line-height: 50px;
            font-size: 15.5px;

            strong {
              font-weight: 600;
            }
          }
        }
      }

      .reduce-price {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 45px;
        padding: 0 10px;
        font-size: 14px;
        color: #333;

        .old-pirce {
          font-size: 17px;
          font-weight: 600;
          text-decoration: line-through;
        }

        & i:nth-child(2) {
          color: #e54d42;
        }
      }

      .actual-price {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 45px;
        padding: 0 10px;
        font-size: 14px;
        color: #333;

        i {
          font-weight: 600;
        }
      }

      .remarks,
      .call-back {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        color: #333;
        padding: 0 10px;
        font-size: 16px;

        i {
          font-size: 12px;
          color: #8799a3;
        }
      }
    }
  }

  .footer-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100vw;
    font-size: 3.8vw;
    border-radius: 999px;
    color: #fff;
    background-color: #000;

    .footer-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 3vw;
      // align-items: center;
      // width: 65px;
      height: 100%;
      margin: 0vw 3vw;
      padding: 0 2vw;

      & p:nth-child(1) {
        margin-bottom: 1vw;
        span {
          font-size: 4.8vw;
        }
      }
    }

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
        width: 19vw;
        height: 100%;
        color: #fff;
        font-size: 3.8vw;
        font-weight: 700;
        background-color: #e54d42;
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
      }
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  border-radius: 2vw;
  background-color: #fff;

  p {
    text-align: center;
    line-height: 13vw;
  }

  .block-box {
    width: 90.7vw;
    .textarea-box {
      padding: 1vw;
      background-color: #eee;
    }

    textarea {
      box-sizing: border-box;
      width: 100%;
      height: 40vw;
      border: none;
      outline: none;
    }

    .block-footer {
      display: flex;
      justify-content: flex-end;
      padding: 3vw 4vw;

      div {
        border-radius: 1vw;
        margin-left: 4vw;
      }

      & div:nth-child(1) {
        padding: 1.5vw 2vw;
        border: 0.1vw solid #39b54a;
        color: #39b54a;
      }

      & div:nth-child(2) {
        padding: 1.5vw 2vw;
        border: 0.1vw solid #39b54a;
        color: #fff;
        background-color: #39b54a;
      }
    }
  }
}
</style>