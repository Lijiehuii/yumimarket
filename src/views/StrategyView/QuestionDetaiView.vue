<template>
  <div class="question-detail">
    <div class="detail-head">
      <span class="lt" @click="goback">&lt;</span>问题详情
    </div>
    <div class="question-answer">
      <div class="question" v-html="questionAnswer.q"></div>
      <div class="answer" v-html="questionAnswer.a"></div>
    </div>
    <div class="back" @click="goback">返回</div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      questionId: "",
      questionAnswer: [],
    };
  },
  created() {
    this.questionId = this.$route.query.questionId;
    this.getQuestionDetail = debounce(this.getQuestionDetail);
  },
  mounted() {
    this.getQuestionDetail();
  },
  methods: {
    // 获取问答数据
    getQuestionDetail() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/plat/guide/question/questionDetail?id=${this.questionId}`
        )
        .then(({ data }) => {
          this.questionAnswer = data.data.detail;
        });
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-detail {
  box-sizing: border-box;
  padding: 44px 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f1f1f1;
  z-index: 999;

  .detail-head {
    box-sizing: border-box;
    width: 100vw;
    height: 44px;
    padding: 7px 3px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(255, 61, 61);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    color: #fff;

    .lt {
      width: 27px;
      height: 27px;
      line-height: 27px;
      position: absolute;
      left: 10px;
      font-size: 30px;
    }
  }

  .question-answer {
    box-sizing: border-box;
    width: 100vw;
    padding: 10px 10px 30px 10px;
    background-color: #fff;

    .question {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 5px;
      font-weight: 600;
      color: #f2270c;
      font-size: 14px;

      &::before {
        display: inline-block;
        content: "";
        width: 4px;
        height: 16px;
        border-radius: 999px;
        margin-right: 3px;
        background-color: #f2270c;
      }
    }

    .answer {
      padding: 4px;
      box-sizing: border-box;
      color: #8799a3;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .back {
    box-sizing: border-box;
    width: 100vw;
    height: 44px;
    padding: 7px 3px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(255, 61, 61);
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    color: #fff;
  }
}
</style>