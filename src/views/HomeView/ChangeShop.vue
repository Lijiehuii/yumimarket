<template>
  <div class="change-shop">
    <div class="change-header">
        <span @click="setRouter">&lt;</span>
        <span>切换超市</span>
    </div>
    <div class="input-box">
      <input type="text" placeholder="请输入关键字" v-model="keyWord"/>
      <button>搜索</button>
    </div>
    <ul>
      <li v-for="item in arr" :key="item.id" class="list" v-show="keyWord == '' || item.name.indexOf(keyWord) != -1 ">
        <div><img src="@/assets/imgs/market.png" alt="" /></div>
        <div class="list-text">
          <div>
            <p class="title">{{ item.name }}</p>
            <p class="distance">距离您步行距离: 0 m</p>
          </div>
          <p class="address">{{ item.address }}</p>
        </div>
        <button class="change-btn" @click="setPosition(item.lat, item.lng, item.id, item.name)">选这个</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      keyWord: ''
    };
  },
  created() {
    this.arr = this.$route.query.arr;
    // this.arr = JSON.parse( this.$route.query.arr)
    // console.log(this.arr, this.$route.query.arr);
  },
  methods: {
    setRouter() {
        this.$router.push({path: '/'})
    },

    setPosition(positionX, positionY, id, name) {
        this.$router.push({path: '/', query:{positionX: positionX, positionY: positionY, shopId: id, name: name}})
    },
  }
};
</script>

<style lang="scss" scoped>
.change-shop {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  overflow: auto;
  background-color: #eee;
  z-index: 101;

  .change-header {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    padding: 4vw 2vw;
    font-weight: 600;
    color: #fff;
    background-color: rgb(255, 61, 61);
    z-index: 99;
  }

  .input-box {
    box-sizing: border-box;
    display: flex;
    padding: 5vw 4vw;
    margin-top: 12vw;
    background-color: #fff;

    input {
        flex: 1;
        padding: 3vw 1vw;
        font-size: 4.2vw;
        border-radius: 1.5vw;
        border: none;
        outline: none;
        background-color: #eee;
    }

    button {
        border: none;
        outline: none;
        background-color: #fff;
    }
  }

  .list {
    display: flex;
    padding: 4vw 3vw;
    margin-bottom: 4vw;
    font-size: 3.4vw;
    text-align: left;
    background-color: #fff;

    .list-text {
        flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .title {
        font-size: 3.8vw;
    }

    .distance {
        line-height: 8vw;
        color: rgb(255, 61, 61);
    } 

    .address {
        font-size: 3.2vw;
        color: #aaa;
    }

    .change-btn {
        width: 15vw;
        height: 8vw;
        line-height: 8vw;
        text-align: center;
        border: none;
        outline: none;
        border-radius: 999px;
        font-size: 3.4vw;
        color: #fff;
        background-color: rgb(255, 61, 61);
       
    }
  }
  img {
    width: 80px;
    height: 80px;
  }
}
</style>