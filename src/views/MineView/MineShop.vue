<template>
  <div class="shop-authentication">
    <div class="come-back">
      <span @click.stop="goback">&lt;</span>
    </div>
    <!-- <h2>{{ shopData.msg }}</h2> -->
    <h2>完成门店资料筹备，即可开门营业</h2>
    
    <div class="msg-authentication">
      <div class="msg-lf">
        <p>1、实名认证审核</p>
        <p>实名认证审核中，请耐心等待</p>
      </div>
      <div class="msg-gt">
        <span>待完成</span>
        <i>&gt;</i>
      </div>
    </div>
    <div class="msg-authentication">
      <div class="msg-lf">
        <p>2、门店信息录入</p>
        <p>您还未填写门店信息，请先填写相关资料</p>
      </div>
      <div class="msg-gt">
        <span>待完成</span>
        <i>&gt;</i>
      </div>
    </div>
    
    <div class="msg-authentication">
      <div class="msg-lf">
        <p>3、添加银行卡</p>
        <p>用于门店营业产生订单后收款提现</p>
      </div>
      <div class="msg-gt">
        <span>待完成</span>
        <i>&gt;</i>
      </div>
    </div>

    <div class="msg-authentication">
      <div class="msg-lf">
        <p>4、签约合作协议</p>
        <p>您还未签订协议</p>
      </div>
      <div class="msg-gt">
        <span>待完成</span>
        <i>&gt;</i>
      </div>
    </div>

    <div class="msg-phone">如遇问题，可联系客服电话：18926966560</div>

    <div class="open-door">
      <span>开门营业</span>
    </div>
  </div>
</template>
SelectedItems
<script>
// import qs from "qs";
export default {
  data() {
    return {
      shopData: [],
      // login: {
      //   mobilephone: 15152897322,
      //   pwd: 111111,
      // },
    };
  },
  created() {
    this.getdate();
  },
  methods: {
    goback() {
      this.$router.push({ path: "/mineView" });
    },
    getdate() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/shopcenter/home/getInfo?shopId="
        )
        .then(({ data }) => {
          this.shopData = data;
          console.log(this.shopData);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-authentication {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: rgb(241, 241, 241);

  .come-back {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    background-color: #ff3d3d;

    span {
      display: block;
      color: #fff;
      font-size: 22px;
      margin-left: 15px;
    }
  }

  h2 {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    color: #333;

  }

  .msg-authentication {
    display: flex;
    justify-content: space-between;
    height: 70px;
    width: 90vw;
    margin: 10px auto ;
    padding: 15px;
    background-color: #fff;

    .msg-lf {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p:nth-child(1){
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }

      p:nth-child(2){
        font-size: 12px;
        font-weight: 400;
        color: #8799a3;
      }
    }

    .msg-gt {
      display: flex;
      align-items: center;
      font-size: 14px;

      span {
        color: #f37b1d;
      }

      i {
        font-size: 14px;
      }
    }
  }

  .msg-phone {
    width: 100vw;
    text-align: center;
    font-size: 12px;
    color: #8799a3;
    margin-top: 30px;
  }

  .open-door {
    width: 100vw;
    height: 90px;
    padding: 15px;
    span {
      display: flex;
      width: 100%;
      height: 100%;
      margin: auto;
      justify-content: center;
      align-items: center;
      color: #0000004d;
      background-color: #f7f7f7;
    }
  }

}
</style>