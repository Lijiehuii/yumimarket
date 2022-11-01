<template>
  <div class="distribution-center">
    <div class="back-item">
      <span class="span-lf" style="font-size: 27px" @click="goback">
        <van-icon name="arrow-left"/>
      </span>
      <span class="span-gt">分销中心</span>
    </div>
    <div class="main">
      <div class="user">
        <div class="user-lf">
          <div class="pho"><img :src="kaoaList.wholeAvatarUrl ? kaoaList.wholeAvatarUrl : `http://zhyumi.cn/static/img/pub/def_img.png`" /></div>
          <div class="text">
            <p>用户：{{ kaoaList.mobilephone }}</p>
            <p>手机号：{{ kaoaList.mobilephone }}</p>
          </div>
        </div>
        <div class="icon"><van-icon name="setting-o" /></div>
      </div>
    </div>
    <div class="invitation">
      <img src="https://zhyumi.cn/static/img/businesscard-fill.1783d800.svg" />
      <p>我的邀请码：{{kaoaList.id}}</p>
    </div>
    <div class="now-money">
      <div class="success van-hairline--bottom">
        <div class="suc-top"><span>0</span><span>暂无申请中金额</span></div>
        <div class="suc-under">
          <span>成功提现佣金(元)</span><span>查看明细</span>
        </div>
      </div>
      <div class="can-Withdrawal">
        <p>0</p>
        <div class="suc-Withdrawal">
          <span>可提现佣金(元)</span><span>佣金体现</span>
        </div>
      </div>
    </div>
    <div class="details-four">
      <div class="details van-hairline--surround">
        <img src="https://zhyumi.cn/static/fenxiao/jinbiduihuan.svg" /><span
          >分销佣金</span
        >
      </div>
      <div class="details van-hairline--surround">
        <img src="https://zhyumi.cn/static/fenxiao/dingdan.svg" /><span
          >分销订单</span
        >
      </div>
      <div class="details van-hairline--surround">
        <img
          src="https://zhyumi.cn/static/fenxiao/xinyongqiahuankuan.svg"
        /><span>提现明细</span>
      </div>
      <div class="details van-hairline--surround">
        <img src="https://zhyumi.cn/static/fenxiao/renqun.svg" /><span
          >我的下线</span
        >
      </div>
    </div>
    <div @click="showPopup">
      <van-cell class="qr-code" is-link>
      <div class="qr" >
        <img src="	https://zhyumi.cn/static/fenxiao/erweima.svg" />
        <span>推广二维码</span>
      </div>
    </van-cell>
    </div>
    <van-popup class="popip" v-model="show" position="bottom" :style="{ height: '70%' }" >
      <div class="core-main">
        <div class="photo">
          <div class="imgs"><img :src="kaoaList.wholeAvatarUrl ? kaoaList.wholeAvatarUrl : 'http://zhyumi.cn/static/img/pub/def_img.png'" /></div>
          <p>您好！我是：{{kaoaList.nickName}}</p>
        </div>
        <div class="core-qr">
          <img :src="kaoaList.wholeInvitCodeUrl" />
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  created() {
    console.log(JSON.parse(localStorage.getItem("kaoa_user_info")));
    this.getkaoaList();
  },
  data() {
    return {
      kaoaList: "",
      show: false,
    };
  },
  methods: {
    getkaoaList() {
      this.kaoaList = JSON.parse(localStorage.getItem("kaoa_user_info"));
    },
    showPopup() {
      this.show = true;
    },
    goback(){
      this.$router.push({path:'/mineView'})
    }
  },
};
</script>
<style lang="scss" scoped>
.distribution-center {
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
      left: 15px;
    }
  }

  .invitation {
    display: flex;
    align-items: center;
    width: 100vw;
    height: 44px;
    margin: 10px 0;
    padding: 0 5.4vw;
    background-color: #fff;

    img {
      width: 27px;
      height: 27px;
    }

    p {
      margin-left: 15px;
      font-size: 14px;
      color: #666;
    }
  }

  .main {
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100vw;
      height: 16vh;
      padding: 0 5.4vw;
      background: linear-gradient(90deg, #ff3d3d, #ff6ca2);

      .user-lf {
        display: flex;
        .pho {
          width: 50px;
          height: 50px;
          img {
            display: flex;
            border-radius: 999px;
            width: 100%;
            height: 100%;
          }
        }
        .text {
          padding: 10px;

          p {
            font-size: 14px;
            line-height: 16px;
            color: #fff;
          }
        }
      }
      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .now-money {
    width: 100vw;
    height: 125px;
    margin-top: 10px;
    padding: 0 5.4vw;
    background-color: #fff;

    .success {
      height: 50%;
      .suc-top {
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:nth-child(1) {
          color: #ffa500;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #708090;
          font-size: 12px;
        }
      }
      .suc-under {
        height: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1) {
          color: #666;
          font-size: 14px;
        }
        span:nth-child(2) {
          color: #000;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 4px;
          background: linear-gradient(90deg, #ff3d3d, #ff6ca2);
        }
      }
    }

    .can-Withdrawal {
      height: 50%;
      p {
        display: flex;
        align-items: center;
        height: 50%;
        color: #ffa500;
        font-size: 22px;
      }
      .suc-Withdrawal {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        span:nth-child(1) {
          color: #666;
          font-size: 14px;
        }
        span:nth-child(2) {
          color: #000;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 4px;
          background: linear-gradient(90deg, #ff3d3d, #ff6ca2);
        }
      }
    }
  }

  .details-four {
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    height: 154px;
    margin-top: 10px;
    .details {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 50%;
      background-color: #fff;
      img {
        width: 25px;
        height: 25px;
        margin: 0 5px;
      }
      span {
        color: #666;
        font-size: 14px;
        margin: 0 5px;
      }
    }
  }

  .qr-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 46px;
    padding: 0 5.4vw;
    margin-top: 10px;
    background-color: #fff;
    .qr {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
      }
      span {
        margin-left: 15px;
        color: #666;
        font-size: 15px;
      }
    }
  }

  .popip {
    position: fixed;
    width: 100vw;
    height: 70%;
    background: url(http://yumi-image.zhyumi.cn/avatarUrl/202210/DIUAVPIN_haibaodi.jpg) no-repeat;
    background-size: 100% 100%;
    .core-main {
      position: absolute;
      width: 58%;
      height: 50%;
      left: 21%;
      top: 35%;
      // background-color: red;
      margin: 0 auto;

      .photo {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .imgs{
          width: 50px;
          height: 50px;
          img {
          display: block;
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          border-radius: 999px;
        }
        }
        
        p {
          height: 50px;
          line-height: 50px;
          font-size: 17px;
          color: rgb(19 62 43);
        }
      }
      .core-qr {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 20px 0;
        img {
          display: block;
          flex: 0 0 132px;
          width: 132px;
          height: 132px;
          margin: 0 auto;
        }
      }

    }
  }
}
</style>