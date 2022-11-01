<template>
  <div class="mine">
    <router-view />
    <div class="mine-top">
      <router-link tag="p" class="mine-setting" to="/mineView/administration">
        账号设置<i class="icon icon-cog"></i
      ></router-link>
      <div class="login-desc" @click="toLogin">
        <div class="mine-pic">
          <img :src="headPhoto" ref="headphoto" />
        </div>
        <div class="mine-text">
          <p class="nickName">
            {{ userInfo ? userInfo.nickName : "未登录" }}
          </p>
          <p
            class="phone"
            v-html="
              userInfo
                ? '手机号：' + userInfo.mobilephone
                : `点击头像登录 <i class='icon icon-pencil'></i>`
            "
          ></p>
        </div>
      </div>
    </div>
    <div class="mine-order">
      <p class="mine-order-top">
        <span>我的订单</span
        ><router-link
          tag="span"
          :to="{ path: '/selectedItems', query: { typeId: 'all' } }"
          >查看全部订单</router-link
        >
      </p>
      <div class="order-select">
        <div class="order-select-item">
          <i class="icon icon-wallet"></i>
          <i class="icon-spot" v-show="waitPayCount">{{ waitPayCount }}</i>
          <router-link :to="{ path: '/selectedItems', query: { typeId: 3 } }"
            >待付款</router-link
          >
        </div>
        <div class="order-select-item">
          <i class="icon icon-clock"></i>
          <router-link :to="{ path: '/selectedItems', query: { typeId: 5 } }"
            >待处理</router-link
          >
        </div>
        <div class="order-select-item">
          <i class="icon icon-basket"></i>
          <router-link :to="{ path: '/selectedItems', query: { typeId: 9 } }"
            >待收货</router-link
          >
        </div>
        <div class="order-select-item">
          <i class="icon icon-chat"></i>
          <router-link :to="{ path: '/selectedItems', query: { typeId: 11 } }"
            >待评论</router-link
          >
        </div>
        <div class="order-select-item">
          <i class="icon icon-users"></i>
          <router-link :to="{ path: '/selectedItems', query: { typeId: 13 } }"
            >售后</router-link
          >
        </div>
      </div>
    </div>
    <LatAndLngComponent
      v-show="showLatAndLng"
      :latAndLng="latAndLng"
      @setMyViewShow="showLatAndLng = false"
      @getLatAndLngVal="setLatAndLngVal"
    ></LatAndLngComponent>
    <div class="mine-wrapper">
      <router-link tag="div" class="mine-list-item" to="/mineView/shop">
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/img/mine/list/icon0.png" />
        </div>
        <div class="title">店铺中心</div>
        <div class="text">
          <p>查看我的店铺</p>
          <van-icon name="arrow" />
        </div>
      </router-link>

      <router-link
        tag="div"
        class="mine-list-item"
        to="/mineView/distributioncenter"
      >
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/fenxiao/redpacket-fill.svg" />
        </div>

        <div class="title">分销中心</div>

        <div class="text">
          <p>查看我的分销</p>
          <van-icon name="arrow" />
        </div>
      </router-link>

      <div class="mine-list-item" @click="gotoMyCollection">
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/img/mine/list/icon1.png" />
        </div>
        <div class="title">我的收藏</div>
        <div class="text">
          <p>查看我的收藏</p>
          <van-icon name="arrow" />
        </div>
      </div>
      <div
        class="mine-list-item"
        @click="(showLatAndLng = true), getLatAndLng()"
      >
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/img/mine/list/icon2.png" />
        </div>
        <div class="title">地址管理</div>
        <div class="text">
          <p>查看我的地址</p>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="mine-list-item" @click="callCustomerService">
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/img/mine/list/icon3.png" />
        </div>
        <div class="title">客服电话</div>
        <div class="text">
          <p>15338180042</p>
          <van-icon name="arrow" />
        </div>
      </div>

      <router-link
        tag="div"
        class="mine-list-item"
        to="/mineView/administration"
      >
        <div class="icon-pic">
          <img src="http://zhyumi.cn/static/img/mine/list/setting.png" />
        </div>
        <div class="title">我的设置</div>
        <div class="text">
          <p>查看设置</p>
          <van-icon name="arrow" />
        </div>
      </router-link>
    </div>
    <p class="Web-filing">网站备案：粤ICP备2022103915号</p>
  </div>
</template>

<script>
import LatAndLngComponent from "@/components/LatAndLngComponent.vue";
export default {
  data() {
    return {
      showLatAndLng: false,
      userInfo: "",
      headPhoto: "",
      waitPayCount: "",
      latAndLng: [],
    };
  },
  created() {
    if (localStorage.kaoa_user_info) {
      this.userInfo = JSON.parse(localStorage.kaoa_user_info);
      if (this.userInfo.wholeAvatarUrl) {
        this.headPhoto = this.userInfo.wholeAvatarUrl;
      } else {
        this.headPhoto = "http://zhyumi.cn/static/img/pub/def_img.png";
      }
    } else {
      this.headPhoto = "http://zhyumi.cn/static/img/pub/def_img.png";
    }
    this.getInfoCount();
  },

  updated() {
    // this.getLatAndLng()
  },
  methods: {
    toLogin() {
      if (!localStorage.kaoa_user_info) {
        this.$router.push({ path: "/login" });
      } else if (localStorage.kaoa_user_info) {
        this.$router.push({
          path: "userInfo",
          query: { id: localStorage.kaoa_user_info.id },
        });
      }
    },
    // setLatAndLngVal() {
    //   console
    // },
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
    administration() {
      this.$router.replace({ path: " /administration" });
    },
    callCustomerService() {
      window.location.href = "tel:15338180042";
    },
    getInfoCount() {
      this.$axios
        .get(`https://admin.zhyumi.cn/ddfresh/app/mine/home/info`)
        .then(({ data }) => {
          console.log(data);
          this.waitPayCount = data.data.waitPayCount;
        });
    },
    gotoMyCollection() {
      this.$router.push({ name: "myCollection" });
    },
    setLatAndLngVal() {
      console.log("更新地址");
      setTimeout(() => {
        this.getLatAndLng();
      }, 1000);
    },
  },
  components: { LatAndLngComponent },
};
</script>

<style lang="scss" scoped>
a {
  color: #000;
}
.mine {
  box-sizing: border-box;
  width: 100vw;
  padding-bottom: 65px;

  .mine-top {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 130px;
    padding: 5px 0;
    background-image: linear-gradient(90deg, #ff3d3d, #ff6ca2);
    border-radius: 0 0 400px 400px/0 0 20px 20px;
    margin-bottom: 10px;

    .mine-setting {
      box-sizing: border-box;
      display: flex;
      height: 33px;
      line-height: 23px;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      right: 10px;
      padding: 5px;
      font-size: 14px;

      .icon {
        margin-left: 5px;
        width: 20px;
        height: 20px;
        font-size: 20px;
      }
    }

    .login-desc {
      display: flex;
      justify-content: flex-start;
      align-content: center;
      box-sizing: border-box;
      padding: 35px 5px 0 10px;

      .mine-pic {
        width: 60px;
        height: 60px;
        // background-image: url(http://zhyumi.cn/static/img/pub/def_img.png);
        // background-position: center center;
        // background-repeat: no-repeat;
        // background-size: cover;
        border-radius: 999px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 999px;
        }
      }

      .mine-text {
        padding: 10px;
        color: #fff;
        font-size: 18px;
        font-weight: 700;

        .phone {
          font-size: 12px;
          font-weight: 500;
          margin-top: 10px;

          .icon-logo {
            display: block;
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .mine-order {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    margin: 5px;

    .mine-order-top {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      height: 35px;
      line-height: 34px;
      font-size: 15px;
      padding: 0 10px;
      color: #666;
      @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
        border-bottom: 0.75px solid #eee;
      }

      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        border-bottom: 0.5px solid #eee;
      }

      @media screen and (-webkit-min-device-pixel-ratio: 3) {
        border-bottom: 0.33px solid #eee;
      }
    }

    .order-select {
      display: flex;
      width: 100%;
      height: 100px;

      .order-select-item {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% / 5);
        height: 100%;

        .icon {
          width: 25px;
          height: 25px;
          font-size: 25px;
          margin-bottom: 10px;
        }

        .icon-spot {
          display: flex;
          justify-content: center;
          align-content: center;
          position: absolute;
          top: 5vw;
          right: 0vw;
          padding: 0.6vw 1.5vw;
          font-size: 3vw;
          border-radius: 999px;
          color: #fff;
          background-color: #dd514c;
        }
      }
    }
  }

  .mine-wrapper {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: 2vw;

    .mine-list-item:nth-child(-n + 5) {
      @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
        border-bottom: 0.75px solid #eee;
      }

      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        border-bottom: 0.5px solid #eee;
      }

      @media screen and (-webkit-min-device-pixel-ratio: 3) {
        border-bottom: 0.33px solid #eee;
      }
    }

    .mine-list-item {
      box-sizing: border-box;
      display: flex;
      height: 45px;
      font-size: 4vw !important;
      padding: 0 10px;
      align-items: center;
      font-size: 12px;
      color: #666;

      .icon-pic {
        display: flex;
        width: 34px;
        justify-content: center;
        margin-right: 2vw;

        img {
          display: block;
          width: 16px;
          height: 16px;
        }
      }

      .title {
        display: flex;
        width: 107px;
        height: 100%;
        align-items: center;
      }

      .text {
        display: flex;
        text-align: right;
        justify-content: flex-end;
        width: 100%;
        color: #999;

        p {
          margin-right: 10px;
        }
      }
    }
  }

  .Web-filing {
    box-sizing: border-box;
    width: 100vw;
    height: 34px;
    display: flex;
    padding: 10px;
    font-size: 4vw;
    color: #aaa;
    justify-content: center;
    align-items: center;
  }
}
</style>
