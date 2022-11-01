<template>
  <div class="search-ruslt">
    <div class="header">
      <span @click="prev">&lt;</span>
      <span class="header-title">商品搜索</span>
    </div>
    <div class="search">
      <div class="search-box">
        <i class="icon-search"></i>
        <input type="text" v-model.trim.lazy="text" />
        <button @click="getSearchData">搜索</button>
      </div>
      <span>切换店铺</span>
    </div>
    <div class="search-list">
      <div class="change">
        <div><span>综合排序</span></div>
        <div><span>全部筛选</span></div>
      </div>
      <ul class="lists">
        <li
          v-for="item in searchArr"
          :key="item.id"
          class="list"
          @click="goToDetailView(item.id, item.shopId)"
        >
          <div class="list-top">
            <div>
              <img :src="item.wholeIcon" alt="" />
            </div>
            <div class="list-title">
              <div>
                <h3>{{ item.title }}</h3>
                <p class="comment">0条店铺评价<span>0条好评</span></p>
              </div>
              <p class="price">
                <span class="">￥{{ item.price }}</span
                ><span>已售0</span>
              </p>
            </div>
          </div>
          <div class="list-bottom">
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <p class="shop-name">{{ item.shop.shopName }}</p>
              </div>
            </div>

            <div class="shop-with">
              <p>
                <span class="overallScore">{{ item.shop.overallScore }}分</span
                ><span>已售 {{ item.shop.orderNum }}</span
                ><span>人均￥{{ item.shop.perOrderMoney }}</span>
              </p>
              <p>
                <span>{{ item.shop.peopleNum }}人下单</span> <span>0m</span>
              </p>
            </div>
          </div>
        </li>
        <li>没有更多了！</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopCart: Object,
    sku: Array,
  },

  data() {
    return {
      searchArr: [],
      text: this.$route.query.keywrold,
    };
  },
  created() {
    // console.log(this.shopCart, this.sku);
    this.getSearchData();
  },
  methods: {
    getSearchData() {
      let data;
      this.text ? (data = this.text) : (data = this.$route.query.keywrold);
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getGoodsList?title=${data}&parentId=&classId=&saleStatus=1&orderBy=0&page=1&limit=15&marketId=${this.$route.query.marketId}&lat=23.54558&lng=113.591571`
        )
        .then(({ data }) => {
          this.searchArr = data.data;
          // this.text = "";
        });
    },
    prev() {
      this.$router.push({
        path: "/home/search",
        query: {
          marketId: this.$route.query.marketId,
        },
      });
    },

    goToDetailView(id, shopId) {
      this.$router.push({
        path: "/details",
        query: {
          goodId: id,
          getShopInfo: shopId,
          shopCart: JSON.stringify(this.shopCart),
          sku: JSON.stringify(this.sku),
        },
      });
    },
  },
  watch: {
    text() {
      this.getSearchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.search-ruslt {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  overflow: auto;
  background-color: rgb(241, 241, 241);
  z-index: 99999;

  .header {
    position: relative;
    display: flex;
    padding: 4vw 2vw;
    font-weight: 600;
    color: #fff;
    background-color: rgb(255, 61, 61);

    .header-title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .search {
    display: flex;
    align-items: center;
    font-size: 4vw;
    padding: 0vw 2vw 0vw 0vw;
    .search-box {
      flex: 1;
      position: relative;
      padding: 3vw;
      box-sizing: border-box;

      input {
        box-sizing: border-box;
        width: 90%;
        padding: 3vw 2vw;
        border-radius: 999px;
        border: none;
        outline: none;
      }

      button {
        position: absolute;
        right: 7vw;
        top: 3.4vw;
        padding: 3vw 4vw;
        border: none;
        outline: none;
        border-radius: 999px;
        color: #fff;
        background-color: rgb(255, 61, 61);
      }
    }

    span {
      display: block;
      font-size: 3.4vw;
      color: #aaa;
      width: 10vw;
    }
  }

  .list {
    background-color: #fff;
    padding: 2vw;
    margin-top: 2vw;
    .list-top {
      display: flex;
      text-align: left;

      img {
        width: 35vw;
      }

      .list-title {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h3 {
          font-weight: 600;
        }

        .comment {
          font-size: 3.6vw;
          padding: 3vw 0vw;
          color: #aaa;
        }

        .price {
          display: flex;
          justify-content: space-between;

          & span:nth-child(2) {
            font-size: 3.6vw;
            color: #aaa;
          }

          & span:nth-child(1) {
            color: rgb(255, 61, 61);
          }
        }
      }
    }

    .list-bottom {
      font-size: 3.6vw;
      text-align: left;
      color: #aaa;

      .shop-name {
        line-height: 8vw;
        color: #000;
      }
      .overallScore {
        font-size: 3vw;
        color: rgb(255, 61, 61);
      }

      .shop-with {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .search-list {
    .change {
      display: flex;
      justify-content: space-between;

      div {
        padding: 3vw;
        font-size: 3.2vw;
      }
    }
  }
}
</style>