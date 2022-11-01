<template>
  <div class="market">
    <div class="market-pic"><img :src="detail.wholeIcon" /></div>

    <div class="market-des">
      <p class="market-shopname">{{ detail.shopName }}</p>
      <p class="market-mesg">
        <span class="score"
          ><i class="icon icon-star"></i>{{ detail.overallScore }}</span
        ><span class="distance">142.0km</span
        ><span>附近{{ detail.peopleNum }}人下单</span>
      </p>
    </div>
    <router-view :setShopId="setShopId"/>
    <div class="go-store">
      <router-link class="go-btn" tag="span" :to="{path: '/shopstore', query:{goodId: $route.query.goodId, getShopInfo: $route.query.getShopInfo, pathName: $route.query.pathName}}">
        进店&gt;
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
    setShopId: String,
    marketId: String
  },
};
</script>

<style lang="scss" scoped>
.market {
  box-sizing: border-box;
  display: flex;
  width: 100vw;
  height: 74px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;

  .market-pic {
    width: 50px;
    height: 50px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .market-des {
    width: calc(100% - 110px);
    box-sizing: border-box;
    padding: 5px 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .market-shopname {
      font-size: 14px;
      color: #333;
      font-weight: 700;
    }

    .market-mesg {
      height: 17px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #666;
      font-size: 12px;

      .score {
        color: #f37b1d;
      }
    }
  }

  .go-store {
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .go-btn {
      box-sizing: border-box;
      width: 48px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      color: #fff;
      background-color: #e54d42;
      border-radius: 999px;
    }
  }
}
</style>