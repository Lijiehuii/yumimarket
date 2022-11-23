<template>
  <div id="app">
    <router-view
      :lat="lat"
      :lng="lng"
      :shopName="shopName"
      :setShopId="setShopId"
      :marketId="marketId"
      :shopCart="shopCart"
      :sku="sku"
      @setMarkeId="setMarketId"
      @sendShopCartData="sendShopCartData"
      @removeItem="removeItem"
    />
    <nav class="tab-bar">
      <router-link class="tab-bar-item home" tag="div" :to="{ path: '/home' }"
        ><i class="icon icon-home"></i>首页</router-link
      >

      <router-link
        class="tab-bar-item classification"
        tag="div"
        to="/classification"
        ><i class="icon icon-fl"></i>分类</router-link
      >
      <router-link
        class="tab-bar-item shoppingcart"
        tag="div"
        to="/shoppingcart"
        ><i class="icon icon-gwc"></i>购物车</router-link
      >
      <router-link class="tab-bar-item strategy" tag="div" to="/strategy"
        ><i class="icon icon-gl"></i>攻略</router-link
      >

      <router-link class="tab-bar-item mineView" tag="div" to="/mineView"
        ><i class="icon icon-mine"></i>我的</router-link
      >
    </nav>
    <!-- <SelectGoodComponents :sku="sku"></SelectGoodComponents> -->
  </div>
</template>

<script>
// import SelectGoodComponents from './components/SelectGoodComponents.vue';
//购物车需要使用POST请求，返回参数为{lat: '', lng: '', marketId, skuList: [{购买数量buyNum，好物的idgoodsId，超市id：shopId，和一个skuId}]}
export default {
  data() {
    return {
      lat: "23.54558",
      lng: "113.591571",
      marketId: "",
      shopName: "",
      localdata: null,
      setShopId: "",
      shopCart: {
        //购物车的数据
        lat: "",
        lng: "",
        marketId: "",
        skuList: [],
      },
      blckPath: "",
      blckQuery: "",
      sku: [],
    };
  },
  created() {
    // console.log(this.sku, "这是列表");
   
    if (localStorage.getItem("data") && Object.keys(JSON.parse(localStorage.getItem("data") )).length > 1) {
      let localdata = JSON.parse(localStorage.getItem("data"));
      this.localdata = localdata;
      console.log(this.localdata, "这是数据持久化数据");
      this.lat = localdata.position?.positionX;
      this.lng = localdata.position?.positionY;
      this.marketId = localdata.position?.marketId;
      this.shopName = localdata.position?.shopName;
      this.setShopId = localdata?.setShopId;
    } else {
      this.getData();
    }
  },
  methods: {
    setMarketId(marketIdVal, latVal, lngVal, nameVal) {
      this.lat = latVal;
      this.lng = lngVal;
      this.marketId = marketIdVal;
      this.shopName = nameVal;
      this.localdata = {
        ...this.localdata,
        position: {
          positionX: this.$route.query.positionX,
          positionY: this.$route.query.positionY,
          marketId: this.$route.query.shopId,
          shopName: this.$route.query.name,
        },
      };
    },
    getData() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/base/company/getMarketList?page=1&limit=25&name=&compAttr=3&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
          // console.log(data, data.data[0].name, data.data[0].id);
          this.lat = data.data[0].lat;
          this.lng = data.data[0].lng;
          this.marketId = data.data[0].id;
          this.shopName = data.data[0].name;
          // this.getShopId();
        });
    },
    getShopId() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/shop/shopManage/getShopList?page=1&limit=15&orderBy=0&marketId=${this.marketId}&lat=${this.lat}&lng=${this.lng}`
        )
        .then(({ data }) => {
          console.log(data)
          // for (let i = 0; i < data.data.length; i++) {
            this.setShopId = data.data[0]?.id;
            this.localdata = {
              ...this.localdata,
              setShopId: this.setShopId,
            };
          // }
        });
    },
    sendShopCartData(val) {
      console.log("数据到手", val, val.buyNum);
      
    
      let newval = [...this.shopCart.skuList];
      let count = 0;
      for (let i = 0; i < newval.length; i++) {
        if (newval[i].goodsId == val.goodsId) {
          console.log('hello')
          newval[i] = {
            ...newval[i],
            ...val,
            shopId: this.setShopId,
          };
        } else {
          count++;
        }
      }

      if (count == newval.length ) {
        console.log('执行了吗')
        newval = [
          ...newval,
          {
            ...val,
            shopId: this.setShopId,
          },
        ];
      }

      newval = newval.filter(f => {
        return f.buyNum != 0
      })
      console.log(newval);

      this.shopCart = {
        ...this.shopCart,
        skuList: newval,
      };
      // this.shopCart.skuList = this.shopCart.skuList.map(f => {
      //   return f.buyNum != val.buyNum
      // })
      console.log(this.shopCart);

      this.sku = this.sku.filter((f) => {
        return f.goodsId != val.goodsId && f.buyNum != 0;
      });

      this.sku = [...this.sku, val];
     
      console.log(this.sku)
    },

    removeItem(arr) {
      console.log('删了没')
      for (let i = 0; i < arr.length; i++) {
        this.sku = this.sku.filter((f) => {
          return f.goodsId != arr[i];
        });
      }

      for (let i = 0; i < arr.length; i++) {
        this.shopCart.skuList = this.shopCart.skuList.filter((f) => {
          return f.goodsId != arr[i];
        });
      }

      console.log("删除后的数组", this.sku, this.shopCart);
    },
  },
  watch: {
    localdata() {
      console.log("触发本地存储");
      let localdata = JSON.stringify(this.localdata);
      localStorage.setItem("data", localdata);
    },
    marketId() {
      this.getShopId();
      this.shopCart = {
        ...this.shopCart,
        marketId: this.marketId,
      };
    },
    $route(val, oldval) {
      if (
        (oldval.name == "home" && val.name == "details") ||
        (oldval.name == "classification" && val.name == "details")
      ) {
        this.blckPath = oldval.name;
        this.blckQuery = oldval.query;
        let s = { path: oldval.path, query: oldval.query };
        this.$router.replace(
          val.fullPath + "&" + "pathName=" + JSON.stringify(s)
        );
      }
      if (oldval.name == "ruslt" && val.name == "details") {
        let s = { path: oldval.path, query: oldval.query };
        this.$router.replace(
          val.fullPath + "&" + "pathName=" + JSON.stringify(s)
        );
      }

      // if(oldval.name == 'home' && val.name == '/shopstore') {
        
      // }
    },
    sku(val) {
      console.log(val)
    }
  },
  // components: { SelectGoodComponents }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  .tab-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 55px;
    background-color: #fff;
    @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
      border-top: 0.75px solid #999;
      border-bottom: 0.75px solid #999;
    }

    @media screen and (-webkit-min-device-pixel-ratio: 2) {
      border-top: 0.5px solid #999;
      border-bottom: 0.5px solid #999;
    }

    @media screen and (-webkit-min-device-pixel-ratio: 3) {
      border-top: 0.33px solid #999;
      border-bottom: 0.33px solid #999;
    }

    .tab-bar-item {
      display: flex;
      flex-direction: column;
      width: calc(100vw / 5);
      justify-content: center;
      align-items: center;

      .icon {
        display: block;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .icon-home {
        background-image: url(./assets/imgs/home.png);
      }

      .icon-fl {
        background-image: url(./assets/imgs/fl.png);
      }

      .icon-gwc {
        background-image: url(./assets/imgs/gwc.png);
      }

      .icon-gl {
        background-image: url(./assets/imgs/gl.png);
      }
      .icon-mine {
        background-image: url(./assets/imgs/mine.png);
      }

      &.router-link-active {
        color: red;
        .icon-home {
          background-image: url(./assets/imgs/home_act.png);
        }
      }

      &.router-link-exact-active {
        color: red;

        .icon-fl {
          background-image: url(./assets/imgs/fl_act.png);
        }

        .icon-gwc {
          background-image: url(./assets/imgs/gwc_act.png);
        }

        .icon-gl {
          background-image: url(./assets/imgs/gl_act.png);
        }
        .icon-mine {
          background-image: url(./assets/imgs/mine_act.png);
        }
      }
    }
  }
}
</style>

