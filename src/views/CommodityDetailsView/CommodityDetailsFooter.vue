<template>
  <div class="commodity-details-footer">
    <div class="comment">
      <div class="good-rate">
        好评度<span class="rate-value">{{ info.goodRate }}%</span>
      </div>
      <div class="good-rate" @click="goComment">
        {{ info.freightMoney }}条评论<span>&gt;</span>
      </div>
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
  props: {
    info: Object,
    goodId: String,
    getShopInfo: String,
  },
  data() {
    return {
      commentList: [],
    };
  },
  created() {
    this.getcommentList = debounce(this.getcommentList);
  },
  mounted() {
    this.getcommentList();
  },
  methods: {
    goComment() {
      this.$router.push({
        path: "/details/comment",
        query: {
          goodId: this.goodId,
          getShopInfo: this.getShopInfo,
        },
      });
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
.commodity-details-footer {
  box-sizing: border-box;
  width: 100vw;
  padding: 10px;
  background-color: #fff;
  font-size: 14px;
  color: #666;

  .comment {
    display: flex;
    justify-content: space-between;
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