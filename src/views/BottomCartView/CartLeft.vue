<template>
  <div class="cart-left" @click="callBusiness">
    <div class="call-pic">
      <img src="http://zhyumi.cn/static/img/shopIndex/phone.png" />
    </div>
    <p>商家</p>
  </div>
</template>

<script>
export default {
  props: {
    tel: String,
  },
  methods: {
    callBusiness() {
      window.location.href = `tel:${this.tel}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-left {
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 12px;
  border-right: 1px solid #fff;

  .call-pic {
    width: 25px;
    height: 25px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>