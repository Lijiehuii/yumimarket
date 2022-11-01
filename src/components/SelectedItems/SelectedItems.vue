<template>
  <div>
    <div>
      <!-- https://admin.zhyumi.cn/ddfresh/app/plat/collect/save 
            收藏的网址 post 请求 传入表单数据
            mainId: 4b7f21ec1890a0d38919c881e08e0a20
            colType: 1 
            https://admin.zhyumi.cn/ddfresh/app/goods/orderMain/buyerOrderPage?page=1&limit=10&queryParam=&orderStatus=3&dateBegin=2022-07-17&dateEnd=2022-10-17
            -->
      <div class="come-back">
        <span @click="goback">&lt;</span>
        <span>订单管理</span>
      </div>
    </div>
    <van-tabs v-model="activeName">
      <van-tab @click="orderStatusType = 'all'" title="全部" name="all">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
      <van-tab @click="orderStatusType = 3" title="待付款" name="3">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
      <van-tab @click="orderStatusType = 5" title="待处理" name="5">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
      <van-tab @click="orderStatusType = 9" title="待收款" name="9">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
      <van-tab @click="orderStatusType = 11" title="待评论" name="11">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
      <van-tab @click="orderStatusType = 13" title="售后" name="13">
        <ItemComponent
          :goodsList="goodsList"
          :msg="msg"
          :count="count"
          @sendId="sendId"
          @addPage="addPage"
        >
        </ItemComponent>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ItemComponent from "./ItemComponent.vue";
import qs from "qs";

export default {
  created() {
    this.activeName = this.$route.query.typeId;
    this.getGoodsList();
    console.log(this.page);
  },
  data() {
    return {
      activeName: "全部",
      goodsList: [],
      msg: "",
      goodsId: {
        id: "",
      },
      today: "",
      orderStatusType: "",
      count: "",
      // page: 1
    };
  },
  methods: {
    getGoodsList(orderStatus, page = 1) {
      let status;
      orderStatus ? (status = orderStatus) : (status = this.activeName);  
      //orderStatus:
      //全部 all  ;待付款  3；待处理 5,7 ;  待收货：9  ；待评论 11；售后  13  orderStatus  15：交易关闭  3：待付款
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/orderMain/buyerOrderPage?page=${page}&limit=10&queryParam=&orderStatus=${status}&dateBegin=2021-07-18&dateEnd=${this.today}`
        )
        .then(({ data }) => {
          // console.log(data, "这是历史订单");

          if(page != 1) {
            this.goodsList = [...this.goodsList, ...data.data];
          } else {
            this.goodsList = data.data
          }
          this.count = data.count;
          // console.log(this.goodsList == data.data);
          // console.log(data.count, '这是历史订单');
          // console.log(this.page);
        });
    },
    delList() {
      this.$axios
        .post(
          "https://admin.zhyumi.cn/ddfresh/app/goods/orderMain/cancelOrder",
          qs.stringify(this.goodsId)
        )
        .then(({ data }) => {
          // console.log(data, 4399);
          this.msg = data.msg;
        });
    },
    sendId(id, orderStatus) {
      this.goodsId.id = id;
      this.activeName = orderStatus;
      this.delList();
      setTimeout(() => {
        this.getGoodsList(orderStatus);
      }, 1000);
    },
    pageNum(pageNum) {
      this.page = pageNum;
    },
    getTodaDate() {
      this.today = new Date(2022 - 10 - 18);
    },
    goback() {
      this.$router.push({ path: "/mineView" });
    },
    addPage(page) {
      this.getGoodsList(this.activeName, page);
    },
  },
  components: { ItemComponent },
  watch: {
    activeName(newActiveName) {
      console.log(newActiveName);
      this.getGoodsList(newActiveName);
    },
    goodsList(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.come-back {
  width: 100vw;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #ff3d3d;

  span {
    font-size: 16px;
    color: #fff;
  }

  span:nth-child(1) {
    position: absolute;
    left: 20px;
  }
}
</style>