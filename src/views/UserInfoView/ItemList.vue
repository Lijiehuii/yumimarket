<template>
  <div class="item-list">
    <p class="item-list-title"></p>
    <p class="item-list-text"></p>
  </div>
</template>

<script>
export default {
  props: {
    middle: Object,
  },
};
</script>

<style lang="scss" scoped>
.item-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  .item-list-title {
    flex: 3;
    text-align: center;
    color: #666;
  }
  .item-list-text {
    flex: 7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>