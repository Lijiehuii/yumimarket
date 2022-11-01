<template>
  <div class="good-shop">
    <ul class="shop-class">
      <li>销量最高</li>
      <li>评分最高</li>
      <li>人气最高</li>
      <li>最近开张</li>
    </ul>
    <ul class="list">
      <li v-for="item in goodShopArr" :key="item.id">
        <div>
          <img :src="item.wholeIcon" alt="" />
        </div>
        <div class="text">
          <h3 class="title">{{ item.shopName }}</h3>
          <div class="shop-data">
            <p>
              <span class="overallScore">{{ item.overallScore }}</span
              ><span>分</span>附近<span>{{ item.peopleNum }}人下单</span>
            </p>
            <p class="delivery">蜂鸟即配</p>
          </div>
          <div class="shop-stuts">
            <p>
              <span>已售{{ item.orderNum }}</span
              ><span>人均{{ item.perOrderMoney }}</span>
            </p>
            <p>0m</p>
          </div>
          <div class="discount">
            <span>新客户立减6元</span>
            <span>{{ item.categoryName }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="noting">没有更多了！</div>
  </div>
</template>

<script>
export default {
    props: {
        shopId: {
            type: String
        },
        lat: {
            type: String
        },
        lng: {
            type: String
        }
    },
  data() {
    return {
      goodShopArr: [],
    };
  },

  created() {
    this.getGoodShopData();
  },
  methods: {
    getGoodShopData() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/shop/shopManage/getShopList?page=1&limit=15&orderBy=0&marketId=${this.shopId}&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
          this.goodShopArr = data.data;
          console.log(this.goodShopArr)  
        });
    },
  },

  watch: {
    shopId() {
        this.getGoodShopData()
    }
  }
};
</script>

<style lang="scss" scoped>
.good-shop {
  .shop-class {
    display: flex;
    padding: 1vw;
    box-sizing: border-box;

    li {
      flex: 1;
      padding: 2vw 3vw;
      font-size: 3.2vw;
      margin: 0 1vw;
      background-color: #fff;
    }
  }

  .list {
    li {
      display: flex;
      padding: 5vw;
      margin-top: 3vw;
      font-size: 3.4vw;
      background-color: #fff;

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 3vw;
        .title {
          font-size: 4.2vw;
          font-weight: 600;
        }

        .shop-data {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 4vw;

          .overallScore {
            font-size: 4.5vw;
            color: rgb(255, 61, 61);
          }

          & span:nth-child(2) {
            color: rgb(255, 61, 61);
            margin-right: 3vw;
          }
          & span:nth-child(3) {
            color: #aaa;
            margin-left: 2vw;
          }

          .delivery {
            color: rgb(28, 193, 206);
            transform: translateY(0.1vw);
          }
        }

        .shop-stuts {
          display: flex;
          justify-content: space-between;
          color: #aaa;
        }

        .discount {
          text-align: left;

          span {
            padding: 0vw 1vw;
            border-radius: 0.8vw;
            border: 1px solid rgb(255, 61, 61);
            margin: 0 1vw;
            color: rgb(255, 61, 61);
          }
        }
      }

      img {
        width: 30vw;
      }
    }
  }

  .noting {
    padding: 3vw 0vw;
    text-align: center;
  }
}
</style>