<template>
  <div class="ticp" v-if="ticpShow">{{ ticpText }}</div>
</template>

<script>
export default {
  props: {
    ticpText: String,
    ticpShow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.ticp {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
}
</style>