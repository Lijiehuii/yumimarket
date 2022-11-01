<template>
  <div class="user-info-middle">
    <div class="item-list" @click="goToEditNickName">
      <p class="item-list-title">昵称:</p>
      <p class="item-list-text">
        {{ userInfo.nickName ? userInfo.nickName : "无" }}
      </p>
    </div>
    <div class="item-list" @click="goToEditSign">
      <p class="item-list-title">签名:</p>
      <p class="item-list-text">{{ userInfo.sign ? userInfo.sign : "无" }}</p>
    </div>
    <div class="item-list" @click="genderSelect = true">
      <p class="item-list-title">性别:</p>
      <p class="item-list-text">{{ userInfo.gender == 1 ? "男" : "女" }}</p>
    </div>
    <div class="item-list" @click="bornSelect = true">
      <p class="item-list-title">生日:</p>
      <p class="item-list-text">{{ userInfo.born ? userInfo.born : "无" }}</p>
    </div>
    <SelectGender v-if="genderSelect" @close-select="genderSelect = false" />
    <SelectBorn v-if="bornSelect" @close-select="bornSelect = false" />
  </div>
</template>

<script>
import SelectGender from "./SelectGender.vue";
import SelectBorn from "./SelectBorn.vue";
export default {
  components: {
    SelectGender,
    SelectBorn,
  },
  props: {
    userInfo: Object,
  },
  data() {
    return {
      middleObj: {},
      genderSelect: false,
      bornSelect: false,
    };
  },
  methods: {
    goToEditNickName() {
      this.$router.push(`/userInfo/editNickName`);
    },
    goToEditSign() {
      this.$router.push("/userInfo/editSignv");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-middle {
  background-color: #fff;
  margin-bottom: 10px;
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
}
</style>