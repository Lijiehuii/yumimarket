<template>
  <div class="strategy-item">
    <BeginnersWrapper v-show="selected == 'getstarted'"/>
    <QuestionsWrapper v-show="selected == 'questions'"/>
    <InfosWrapper v-show="selected == 'infos'" />
  </div>
</template>

<script>
import BeginnersWrapper from "./BeginnersWrapper.vue";
import QuestionsWrapper from "./QuestionsWrapper.vue";

import InfosWrapper from "./InfosWrapper.vue";
export default {
  props: {
    selected: String,
  },
  components: {
    BeginnersWrapper,
    QuestionsWrapper,
    InfosWrapper,
  },
};
</script>