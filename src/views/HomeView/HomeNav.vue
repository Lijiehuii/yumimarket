<template>
  <div>
    <header class="yumi-header">
      <ul class="yumi-title">
        <li>鱼米集市</li>
        <li class="bell">
          <GorPosition tag="div"  :shopName="shopName"></GorPosition>
          <span class="icon icon-bell"></span>
        </li>
      </ul>
      <!-- <ul>
        <li><span class="icon icon-bell"></span></li>
      </ul> -->
      <nav>
        <router-link :to="{path: '/home/search' , query: {marketId: marketId}}" tag="div" class="search-box">
          <i class="icon-search"></i>
          <input type="text" placeholder="搜索商品" />
          <button>搜索</button>
        </router-link>
        <ul class="recommend">
          <li>牛肉</li>
          <li>土豆</li>
          <li>西红柿</li>
          <li>花菜</li>
          <li>老干妈</li>
        </ul>
      </nav>
    </header>
    <router-view :shopCart="shopCart" :sku="sku"></router-view>
  </div>
</template>

<script>
import GorPosition from "./GorPosition.vue";
export default {
  props: {
    marketId: {
      type: String,
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
      // search: [],
      // text: ''
    };
  },
  created() {},
  methods: {
    
  },
  components: { GorPosition },
};
</script>

<style lang="scss" scoped>
.yumi-header {
  width: 100vw;

  .yumi-title {
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    padding: 3.6vw 2vw;
    font-weight: 600;
    color: #fff;
    background-color: rgb(255, 61, 61);
    z-index: 99;

    .bell {
      display: flex;
      vertical-align: middle;

      .icon-bell {
        font-size: 4.5vw;
      }
    }
  }

  nav {
    background-color: #fff;
    padding: 2vw 4vw;
    .search-box {
      position: relative;
      margin-top: 13vw;

      input {
        box-sizing: border-box;
        width: 100%;
        padding: 2.5vw 2vw;
        border-radius: 999px;
        border: 1px solid rgb(255, 61, 61);
        outline: none;
      }

      button {
        position: absolute;
        right: 0;
        top: 0;
        padding: 2.9vw 4vw;
        border: none;
        border-radius: 999px;
        color: #fff;
        background-color: rgb(255, 61, 61);
      }
    }

    .recommend {
      display: flex;
      padding: 2vw;
      font-size: 3.2vw;
      color: rgb(36, 35, 35);

      li {
        margin-right: 2vw;
        border-radius: 1.5vw;
        padding: 1vw 2vw;
        background-color: rgb(241, 241, 241);
      }
    }
  }
}
</style>