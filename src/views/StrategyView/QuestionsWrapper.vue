<template>
  <div class="questions-wrapper" key="questions">
    <div class="question-item-list" v-for="item in questions" :key="item.id">
      <div class="question-text">
        <div class="question-type"><i class="icon"></i>{{ item.typeName }}</div>
        <div class="question-item">
          <p
            class="question"
            v-for="ques in item.questionList"
            :key="ques.id"
            :data-quesId="ques.id"
            :class="{ active: item.questionList.length >= 2 }"
            @click="goQuestionDetailView(ques.id)"
          >
            {{ ques.q }}
          </p>
        </div>
      </div>
      <p class="loading-more" ref="loadingmore">加载更多∨</p>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      // 存取常见问题的数据
      questions: [],
    };
  },
  created() {
    this.getQuestionData = debounce(this.getQuestionData);
  },
  mounted() {
    this.getQuestionData();
  },
  methods: {
    // 获取常见问题数据
    getQuestionData() {
      this.$axios
        .get("https://admin.zhyumi.cn/ddfresh/app/plat/guide/question/list")
        .then(({ data }) => {
          this.questions = data.data;
        });
    },

    goQuestionDetailView(id) {
      this.$router.push({
        path: "/strategy/questionDetail",
        query: {
          questionId: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.questions-wrapper {
  box-sizing: border-box;
  width: 100%;

  .question-item-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;

    .question-text {
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      display: flex;
      padding: 10px 0;

      .question-type {
        box-sizing: border-box;
        display: flex;
        width: 100px;
        height: 80px;
        flex-direction: column;
        padding: 0 15px;
        justify-content: center;
        align-items: center;
        @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
          border-right: 0.75px solid #999;
        }

        @media screen and (-webkit-min-device-pixel-ratio: 2) {
          border-right: 0.5px solid #999;
        }

        @media screen and (-webkit-min-device-pixel-ratio: 3) {
          border-right: 0.33px solid #999;
        }

        .icon {
          display: block;
          margin-bottom: 10px;
          width: 30px;
          height: 30px;
          background-image: url(../../assets/imgs/jiaoyi.png);
        }
      }

      .question-item {
        box-sizing: border-box;
        width: calc(100% - 100px);
        height: 80px;
        font-size: 14px;

        .question {
          box-sizing: border-box;
          display: block;
          min-width: 250px;
          height: 40px;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 10px 20px 10px 10px;

          &.question:nth-child(1).active {
            @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
              border-bottom: 0.75px solid #999;
            }

            @media screen and (-webkit-min-device-pixel-ratio: 2) {
              border-bottom: 0.5px solid #999;
            }

            @media screen and (-webkit-min-device-pixel-ratio: 3) {
              border-bottom: 0.33px solid #999;
            }
          }
        }
      }
    }

    .loading-more {
      display: flex;
      justify-content: center;
      padding-bottom: 20px;
      color: #f2270c;
    }
  }
}
</style>