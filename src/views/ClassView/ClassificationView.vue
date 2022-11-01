<template>
  <div class="classification">
    <ClassificationHead />
    <ClassificationMain :marketId="marketId" :setShopId="setShopId" :sku="sku" @sendShopCartData="sendShopCartData"/>
  </div>
</template>

<script>
import ClassificationHead from "./ClassificationHead.vue";
import ClassificationMain from "./ClassificationMain.vue";

export default {
  props: {
    marketId: {
      type: String
    },
    setShopId: {
      type: String
    },
    sku: {
      type: Array
    }
  },
  methods: {
    sendShopCartData(val) {
      console.log('数据来了')
      this.$emit("sendShopCartData", val);
    }
  },
  components: {
    ClassificationHead,
    ClassificationMain
  },
};
</script>

<style lang="scss" scoped>
.classification {
  width: 100vw;
  height: 100vh;
  margin-bottom: 55px;
}
</style>