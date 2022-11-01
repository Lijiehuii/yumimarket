<template>
  <div class="good-pic">
    <img :src="imgList.wholePath" />
    <div class="evaluate">
      <p class="good-rate">{{ info.goodRate }}%好评度</p>
      <p class="evaluate-quantity">{{ info.freightMoney }}条评价</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: Object,
    info: Object,
  },
};
</script>

<style lang="scss" scoped>
.good-pic {
  position: relative;
  img {
    width: 100%;
  }

  .evaluate {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 35px;
    left: 20px;
    bottom: 20px;
    font-size: 12px;
    color: #000;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 75px;
      height: 35px;
    }

    .good-rate {
      background-color: rgba(255, 218, 171, 0.8);
      border-right: 1px solid #000;
      border-top-left-radius: 999px;
      border-bottom-left-radius: 999px;
    }

    .evaluate-quantity {
      background-color: rgba(255, 255, 255, 0.8);
      border-top-right-radius: 999px;
      border-bottom-right-radius: 999px;
    }
  }
}
</style>