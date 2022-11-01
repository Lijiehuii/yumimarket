<template>
  <div class="classification-top-wrapper">
    <div
      class="classification-item"
      v-for="(c, i) in goodsClassList"
      :data-clasId="c.id"
      :key="c.id"
      @click="setClassId(c.children[0].id), setShowList(i), getTopSetected(i)"
      :class="{ active: topSetected == i }"
    >
      <div class="classification-pic">
        <img :src="c.wholeIcon" />
      </div>
      <p class="classification-title">{{ c.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classId:String,
    goodsClassList: Array,
    showList:Number,
    topSetected:Number,
    setShopId: String
  },
  data() {
    return {};
  },
  methods:{
    setShowList(i){
        this.$emit("set-show-ist",i)
    },
    getTopSetected(i){
        this.$emit("top-setected",i)
    },
    setClassId(id){
        this.$emit("set-class-id",id)
    }
  }
};
</script>

<style lang="scss" scoped>
.classification-top-wrapper {
  box-sizing: border-box;
  position: fixed;
  top: 44px;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  overflow: auto;
  background-color: #fffcf6;
  z-index: 1;

  .classification-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: calc(100vw / 4);
    height: 75px;

    .classification-pic {
      box-sizing: border-box;
      padding: 5px;
      width: 38px;
      height: 38px;

      img {
        display: flex;
        width: 100%;
        height: 100%;
      }
    }

    .classification-title {
      margin-top: 5px;
      font-size: 12px;
      color: #666;
    }

    &.active {
      .classification-pic {
        border-radius: 5px;
        border: 1px solid red;
      }

      .classification-title {
        padding: 2px 3px;
        border-radius: 5px;
        background-color: red;
        color: #fff;
      }
    }
  }
}
</style>

