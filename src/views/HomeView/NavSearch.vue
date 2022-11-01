<template>
  <div class="search-bar">
    <div class="header">
      <span @click="prev">&lt;</span>
      <span class="header-title">搜索</span>
    </div>
    <div class="search-box">
      <i class="icon-search"></i>
      <input type="text" v-model="text" />
      <router-link :to="{ name: 'ruslt', query: { keywrold: text , marketId: $route.query.marketId} }">
        <button>搜索</button>
      </router-link>
    </div>
    <ul class="recommend">
      <p class="text">搜索发现</p>
      <li @click="setRouter">牛肉</li>
      <li @click="setRouter">鸡肉</li>
      <li @click="setRouter">鸡脚</li>
      <li @click="setRouter">饺子</li>
      <li @click="setRouter">生菜</li>
      <li @click="setRouter">马铃薯</li>
      <li @click="setRouter">胡萝卜</li>
      <li @click="setRouter">虾</li>
      <li @click="setRouter">鱼</li>
      <li @click="setRouter">羊肉</li>
    </ul>
    <router-view :sku="sku" :shopCart="shopCart"></router-view>
  </div>
</template>

<script>
export default {
  props: {
    sku: {
      type: Array
    },
    shopCart: {
      type: Object
    }
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    prev() {
      this.$router.push('/home')
    },

    setRouter(e) {
      this.text = e.target.textContent;
      this.$router.push({ name: "ruslt", query: { keywrold: this.text , marketId: this.$route.query.marketId} });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: #eee;

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

  .search-box {
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
      right: 8vw;
      top: 6vw;
      padding: 0vw 4vw;
      border: none;
      outline: none;
      border-left: 1.5px solid #ddd;
      color: #000;
      background-color: transparent;
    }
  }

  .recommend {
    display: flex;
    flex-wrap: wrap;
    padding: 2vw;
    font-size: 3.2vw;
    color: rgb(36, 35, 35);
    border-top-right-radius: 3vw;
    border-top-left-radius: 3vw;
    background-color: #fff;

    li {
      margin-right: 2vw;
      border-radius: 1.5vw;
      padding: 1.5vw 2.5vw;
      margin: 0 2vw 3vw 0;
      font-size: 3.8vw;
      background-color: rgb(241, 241, 241);
    }

    .text {
      display: block;
      white-space: nowrap;
      margin: 0 80% 3vw 0;
      color: #000;
    }
  }
}
</style>