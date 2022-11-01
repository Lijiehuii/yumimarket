<template>
  <div class="strategy">
    <StrategyTop :selected="selected" @set-selected="setSelected" />
    <StrategyItem :selected="selected" />
  </div>
</template>

<script>
import StrategyTop from "./StrategyTop.vue";
import StrategyItem from "./StrategyItem.vue";
export default {
  data() {
    return {
      // 攻略选择
      selected: "getstarted",
    };
  },
  methods: {
    setSelected(selected) {
      this.selected = selected;
    },
  },
  components: {
    StrategyTop,
    StrategyItem,
  },
};
</script>

<style lang="scss" scoped>
.strategy {
  position: relative;
  width: 100vw;
  height: 100vh;

  .strategy-item {
    box-sizing: border-box;
    padding: 104px 5px 65px 5px;

    .move-enter {
      transform: translateX(100%);
    }

    .move-leave-active,
    .move-enter-active {
      transform: all linear 0.5s;
    }

    .move-leave,
    .move-enter-to {
      transform: translateX(0);
    }

    .move-leave-to {
      transform: translateX(-100%);
    }
  }


}
</style>