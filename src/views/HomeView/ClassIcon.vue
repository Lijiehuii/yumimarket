<template>
  <div class="class-box" @scroll="loadLists">
    <div class="class-icon">
      <div v-for="item in iconArr" :key="item.id" class="icon-box1" @click="id = item.id">
        <img :src="item.wholeIcon" alt="" />
        <p class="title">{{ item.name }}</p>
      </div>
    </div>
    <NewMan :marketId="shopId"></NewMan>
    <div>
      <div class="title-change">
        <div @click="flag = true" :class="{ active: flag }"><i></i>好物推荐</div>
        <div @click="flag = false" :class="{ active: !flag }"><i></i>发现好店</div>
      </div>
      <GoodThis v-show="flag" :id="id" :lat="lat" :shopId="shopId" :sku="sku" :shopCart="shopCart" :lng="lng" :page="page" @setId="setId"  @sendShopCartData="sendShopCartData"></GoodThis>
      <GoodShop v-show="!flag" :shopId="shopId" :lat="lat" :lng="lng"></GoodShop>
    </div>
  </div>
</template>

<script>
import GoodThis from "./GoodThis.vue";
import GoodShop from "./GoodShop.vue";
import NewMan from "./NewMan.vue";
export default {
  props: {
    lat: {
      type: String
    },
    lng: {
      type: String
    },
    shopId: {
      type: String
    },
    page: {
      type: Number
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
      iconArr: [],
      flag: true,
      id: ''
    };
  },
  created() {
    this.getIconPic();
  },
  methods: {
    getIconPic() {
      this.$axios
        .get(
          "https://admin.zhyumi.cn/ddfresh/app/goods/goodsClass/getGoodsClassForIndex?page=1&limit=8"
        )
        .then(({ data }) => {
          console.log(data);
          this.iconArr = data.data;
        });
    },

    loadLists(e) {
      console.log('hello', e)
    },

    setId(id) {
      this.id = id 
    },

    sendShopCartData(val) {
      this.$emit("sendShopCartData", val);
    }
  },
  components: { GoodThis, GoodShop, NewMan },
};
</script>

<style lang="scss" scoped>
.class-icon {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2vw 3vw;
  width: 100vw;
  font-size: 3.2vw;
  background-image: linear-gradient(#fff 70%, #f1f1f1);

  .icon-box1 {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vw;
    width: 22vw;

    img {
      display: flex;
      width: 65%;
      height: auto;
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.title-change {
  display: flex;
  justify-content: space-around;

  & div {
    box-sizing: border-box;
    font-size: 4vw;
    font-weight: 600;
    padding: 1vw;
    margin: 2vw;
  }

  .active {
    border-bottom: 2px solid rgb(255, 61, 61);
  }
}
</style>