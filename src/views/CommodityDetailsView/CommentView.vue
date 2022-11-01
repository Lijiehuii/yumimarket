<template>
  <div class="comment">
    <div class="comment-head">
      <span class="lt" @click="goback">&lt;</span>商品评价
    </div>
    <div class="comment-item">
      <div class="comment-empty" v-if="commentList.length == 0">
        <p>暂时没有更多评论</p>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      goodsId: "",
      commentList: [],
    };
  },
  created() {
    this.goodsId = this.$route.path.goodsId;
    this.getcommentList = debounce(this.getcommentList);
  },
  mounted() {
    this.getcommentList();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getcommentList() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/orderEvaluation/getByGoodsId?page=1&limit=20&goodsId=${this.goodsId}`
        )
        .then((data) => {
          this.commentList = data.data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
  padding: 44px 0;
  z-index: 999;

  .comment-head {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 44px;
    padding: 7px 3px;
    background-color: rgb(255, 61, 61);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    color: #fff;
    z-index: 999;

    .lt {
      width: 27px;
      height: 27px;
      line-height: 27px;
      position: absolute;
      left: 10px;
      font-size: 30px;
    }
  }

  .comment-item {
    background-color: #fff;
    color: #666;
    padding: 10px;
    font-size: 14px;

    .comment-empty {
      display: flex;
      height: 40px;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>