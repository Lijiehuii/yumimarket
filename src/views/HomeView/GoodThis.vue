<template>
  <div>
    <div class="nav-box" ref="ul">
      <ul class="good-nav">
        <li @click="setId('')" :class="{ active: id == '' }" ref="li">全部</li>
        <li
          v-for="(item, i) in navArr"
          :key="item.id"
          @click="setId(item.id), (index = i), setIndex(item.id)"
          :class="{ active: id == item.id }"
          :data-id="item.id"
          :data-index="i"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <ul class="good-lists">
      <li
        v-for="item in goodData"
        :key="item.id"
        class="good-list"
        @click="goToDetailView(item.id, item.shopId)"
      >
        <div class="img-box">
          <img :src="item.wholeIcon" alt="" />
        </div>
        <div class="good-title">
          <h3 class="title">{{ item.title }}</h3>
          <p class="price">￥{{ item.price }}</p>
          <div class="cart">
            <p class="good-rate">
              <span>好评率{{ item.goodRate }}%</span
              ><span>已售{{ item.saleNum }}</span>
            </p>
            <!-- 点击此处展示添加购物车组件 -->
            <p @click.stop="select(item.id)"><i class="icon-cart"></i></p>
          </div>
        </div>
        <SelectGoodComponents
          :selectGoodId="selectGoodId"
          :item="item"
          :sku="sku"
          @set-selected-id="setSelectedId"
          @sendShopCartData="sendShopCartData"
        ></SelectGoodComponents>
      </li>
    </ul>
    <div><p>没有更多了！</p></div>
  </div>
</template>

<script>
import SelectGoodComponents from "@/components/SelectGoodComponents.vue";
export default {
  props: {
    id: {
      type: String,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    shopId: {
      type: String,
    },
    page: {
      type: Number,
    },
    sku: {
      type: Array
    },
    shopCart: {
      type: Object
    }
  },
  data() {
    return {
      navArr: [],
      goodData: [],
      arrId: "",
      index: 0,
      selectGoodId: ''
    };
  },
  created() {
    this.getNavData();
  if(this.shopId) {
    this.getGoodThisData();
  }
  },
  mounted() {},
  methods: {
    getNavData() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/goods/goodsClass/getGoodsClassForIndex?page=1&limit=8"
        )
        .then(({ data }) => {
          console.log(data);
          this.navArr = data.data;
        });
    },
    getGoodThisData() {
      console.log("这是推荐好物", this.shopId, 'hhh', this.lat, this.id);
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getGoodsList?page=1&limit=20&parentId=${this.id}&saleStatus=1&orderBy=0&marketId=${this.shopId}&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
         
          console.log(data.data);
          this.goodData = data.data;
        });
    },
    setId(id) {
      this.$emit("setId", id);
    },
    setIndex(id) {
      for (let i = 0; i < this.navArr.length; i++) {
        if (id == this.navArr[i].id) {
          let s =
            (this.$refs.li.offsetHeight * i * i - this.$refs.ul.scrollLeft) /
            50;
          if (s <= 0) {
            let timer = setInterval(() => {
              this.$refs.ul.scrollLeft += s;
              if (
                this.$refs.ul.scrollLeft <=
                this.$refs.li.offsetHeight * i * i
              ) {
                this.$refs.ul.scrollLeft = this.$refs.li.offsetHeight * i * i;
                clearInterval(timer);
              }
            }, 4);
          } else {
            let timer = setInterval(() => {
              this.$refs.ul.scrollLeft += s;
              console.log(this.$refs.ul.scrollLeft, s);
              if (
                this.$refs.ul.scrollLeft >=
                this.$refs.li.offsetHeight * i * 2 || this.$refs.ul.scrollLeft == 0
              ) {
                this.$refs.ul.scrollLeft = this.$refs.li.offsetHeight * i * i;
                clearInterval(timer);
              }
            }, 4);
          }
        } else if (id == "") {
          this.$refs.ul.scrollLeft = 0;
        }
      }
    },
    goToDetailView(id, shopId) {
      this.$router.push({
        path: "/details",
        query: {
          goodId: id,
          getShopInfo: shopId,
          sku: JSON.stringify(this.sku),
          shopCart: JSON.stringify(this.shopCart)
        },
      });
    },
    getNewPage(val) {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getGoodsList?page=${val}&limit=20&parentId=${this.id}&saleStatus=1&orderBy=0&marketId=${this.shopId}&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
          console.log("这是推荐好物");
          console.log(data.data);
          this.goodData = [...this.goodData, ...data.data];
        });
    },
  
    select(id) {
      this.selectGoodId = id;
    },

    setSelectedId() {
      this.selectGoodId = "";
    },

    sendShopCartData(val) {
      this.$emit("sendShopCartData", val);
    }

  },
  watch: {
    id(newVal) {
      this.getGoodThisData();
      this.setIndex(newVal);
    },
    arrId(newVal) {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsManage/getGoodsList?page=1&limit=20&parentId=${newVal}&saleStatus=1&orderBy=0&marketId=&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
          console.log(newVal)
          this.goodData = data.data;
        });
    },
    shopId(val) {
      console.log(val);
        this.getGoodThisData();
    },
    page(newVal) {
      this.getNewPage(newVal);
    },
  },
  components: { SelectGoodComponents },
};
</script>

<style lang="scss" scoped>
.active {
  border: 1px solid rgb(255, 61, 61);
}

.nav-box::-webkit-scrollbar {
    width: 0 !important;
  }

.nav-box {
  // display: flex;
  // justify-content: center;
  box-sizing: border-box;
  position: relative;
  width: 90vw;
  margin: 0 auto;
  overflow: auto;
  
  .good-nav {
    // width: 1000%;
    display: flex;
    font-size: 3vw;

    & li:nth-child(1) {
      margin-left: 3vw;
    }

    li {
      // display: inline-block;
      flex-shrink: 0;
      padding: 1vw 3.5vw;
      margin: 1vw 3vw 1vw 0;
      border-radius: 0.8vw;
    }
  }
}

.good-lists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0vw 3vw 3vw 3vw;
  // margin: 0 2vw 2v 0 ;
  box-sizing: border-box;

  .good-list {
    width: 45.8vw;
    margin-bottom: 3vw;
  }

  .img-box {
    width: 45.8vw;
    border-top-left-radius: 3vw;
    border-top-right-radius: 3vw;
    height: 172px;
    overflow: hidden;
    background-color: #fff;

    img {
      display: block;
      width: 100%;
      height: auto;
      border-top-left-radius: 4vw;
      border-top-right-radius: 4vw;
    }
  }

  .good-title {
    border-bottom-left-radius: 3vw;
    border-bottom-right-radius: 3vw;
    padding: 2vw;
    text-align: left;
    line-height: 7vw;
    background-color: #fff;

    .price {
      font-size: 4vw;
      color: rgb(229, 77, 66);
    }

    .good-rate {
      font-size: 3.2vw;
      color: #aaa;
    }

    .title {
      font-size: 4vw;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .cart {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>