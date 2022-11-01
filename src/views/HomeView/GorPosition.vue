<template>
  <div>
    <router-link :to="{ name: 'changeShop', query: { arr: arr } }" tag="h3"
      ><span><i class="icon icon-location"></i></span
      >{{ $route.query.name || defaultShop }}
      <span class="icon-arrow"
        ><i class="icon icon-keyboard_arrow_left"></i></span
    ></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    shopName: {
      type: String,
    },
  },
  data() {
    return {
      arr: [],
      defaultShop: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/base/company/getMarketList?page=1&limit=25&name=&compAttr=3&lat=&lng="
        )
        .then(({ data }) => {
          console.log(data, data.data[0].name);
          this.defaultShop = this.shopName || data.data[0].name;
          this.arr = data.data;
          //   this.setPosition( data.data[0].lat, data.data[0].lng)
          //https://admin.zhyumi.cn/ddfresh/app/plat/collect/cancel 这是取消收藏的请求
          //https://admin.zhyumi.cn/ddfresh/app/plat/collect/getList?colType=1&limit=15&page=1 这是请求已收藏商品的接口
        });
    },

    setPosition(positionX, positionY) {
      this.$router.push({
        path: "/",
        query: { positionX: positionX, positionY: positionY },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  // font-size: 4vw;
  color: #fff;
  .icon-location {
    display: inline-block;
    transform: scale(1.15, 0.95) translateY(.1vw);
    font-size: 4vw;
    margin-right: 1vw;
    // vertical-align: middle;
  }
  .icon-arrow {
    display: inline-block;
    transform: rotate(180deg) translateY(0.1vw);
    vertical-align: middle;
    font-size: 5vw;
  }
}
</style>