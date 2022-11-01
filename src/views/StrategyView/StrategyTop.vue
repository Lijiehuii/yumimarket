<template>
  <div class="strategy-top">
    <div class="strategy-head">
      <div class="strategy-head-title">攻略</div>
    </div>
    <div class="strategy-list-wrapper">
      <div class="strategy-list">
        <div
          class="strategy-list-title"
          :class="{ active: selected == 'getstarted' }"
          @click="setSelected('getstarted')"
        >
          <span>新人上手</span>
        </div>
        <div
          class="strategy-list-title"
          :class="{ active: selected == 'questions' }"
          @click="setSelected('questions')"
        >
          <span>常见问题</span>
        </div>
        <div
          class="strategy-list-title"
          :class="{ active: selected == 'infos' }"
          @click="setSelected('infos')"
        >
          <span>商家入驻</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selected: String,
  },
  data() {
    return {};
  },
  methods: {
    setSelected(sel) {
      this.$emit("set-selected", sel);
    },
  },
};
</script>

<style lang="scss" scoped>
.strategy-top {
  position: fixed;
  top: 0;
  left: 0;

  .strategy-head {
    box-sizing: border-box;
    width: 100vw;
    height: 44px;
    padding: 7px 3px;
    background-color: rgb(255, 61, 61);

    .strategy-head-title {
      text-align: center;
      width: 100%;
      height: 30px;
      font-size: 16px;
      font-weight: 700;
      line-height: 30px;
      color: #fff;
    }
  }
  .strategy-list-wrapper {
    box-sizing: border-box;
    width: 100vw;
    height: 50px;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .strategy-list {
      box-sizing: border-box;
      width: 100vw;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f1f1f1;
      border-radius: 20px;

      .strategy-list-title {
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 700;

        &.active {
          color: #fff;
          background-color: #ff3d3d;
          border-radius: 20px;
        }
      }
    }
  }
}
</style>