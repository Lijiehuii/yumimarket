<template>
  <div class="home" @scroll="loadLists">
    <div class="home-view" ref="home">
      <HomeNav :marketId="id"  :lat="lat"
        :lng="lng" :shopName="shopName" :shopCart="shopCart" :sku="sku"></HomeNav>
      <HomeBanner
        :lat="lat"
        :lng="lng"
        :shopId="id"
        :page="page"
        @goTo="goTo"
      ></HomeBanner>
      <ClassIconVue
        :lat="lat"
        :lng="lng"
        :shopId="id"
        :page="page"
        :shopCart="shopCart"
        :sku="sku"
        @sendShopCartData="sendShopCartData"
      ></ClassIconVue>
    </div>
  </div>
</template>

<script>
import HomeNav from "./HomeNav.vue";
import HomeBanner from "./HomeBanner.vue";
import ClassIconVue from "./ClassIcon.vue";
// import NewMan from "./NewMan.vue";

export default {
  props: {
    marketId: {
      type: String,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String
    },
    shopName: {
      type: String
    },
    shopCart: {
      type: Object
    },
    sku: {
      type: Array
    }
  },
  data() {
    return {
      page: 1,
      timer: null
    };
  },

  created() {
    // document.body.onscroll = () => {
    //   console.log('hello')
    // }
  },

  methods: {
    setMarketId(shopId, lat, lng, name) {
      console.log("值有没有传给父亲");
      this.$emit("setMarkeId", shopId, lat, lng, name);
    },

    loadLists(e) {
      // console.log(e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight, e.target.offsetHeight)
      if (e.target.scrollTop + 1 >= e.target.scrollHeight - e.target.offsetHeight) {
        console.log("hello");
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.page++;
        }, 300)
      }
    },

    goTo(id) {
      this.$router.push({
        path: "/details",
        query: {
          goodId: id,
          getShopInfo: this.id,
        },
      });
    },

    sendShopCartData(val) {
      this.$emit("sendShopCartData", val);
    }
  },

  computed: {
    id() {
      if (this.$route.query.shopId) {
        return this.$route.query.shopId;
      } else {
        return this.marketId;
      }
    },
  },

  watch: {
    id() {
     if(this.$route.query.shopId) {
      this.setMarketId(
        this.$route.query.shopId,
        this.$route.query.positionX,
        this.$route.query.positionY,
        this.$route.query.name
      );
     }
    },
  },

  components: {
    HomeNav,
    HomeBanner,
    ClassIconVue,
},
};
</script>

<style lang="scss" scoped>
.home {
  text-align: center;
  height: 100%;
  padding-bottom: 55px;
  overflow: auto;
}
</style>
