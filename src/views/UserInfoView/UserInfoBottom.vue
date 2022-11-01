<template>
  <div class="user-info-middle">
    <div class="item-list" @click="goToEditSchool">
      <p class="item-list-title">学校:</p>
      <p class="item-list-text">
        {{ userInfo.school ? userInfo.school : "无" }}
      </p>
    </div>
    <div class="city-select">
      <SelectLiveAddress class="select-com" />
    </div>
    <div class="item-list">
      <p class="item-list-title">身份:</p>
      <p class="item-list-text ">{{ userInfo.lxName }}</p>
    </div>
  </div>
</template>



<script>
import SelectLiveAddress from "./SelectLiveAddress.vue";
export default {
  components: { SelectLiveAddress },
  props: {
    userInfo: Object,
  },
  data() {
    return {
      cityShow: false,
      arr: [],
      cityArr: [],
      areaArr: []
    };
  },
  created() {
    this.getAllList()
  },
  methods: {
    goToEditSchool() {
      this.$router.push({ path: "/userInfo/editSchool" });
    },

    getAllList() {
      console.log(123)
      this.$axios.get('https://admin.zhyumi.cn/ddfresh/app/base/area/getAllList').then(({data}) => {
        console.log(data.data)
        this.areaArr = data.data.areaData.map( t => {
          return t[0].map(f => {
            return {
              text: f.label,
              value: f.value
            }
          })
        })

        this.cityArr = data.data.cityData.map( (t, i) => {
          return t.map(c => {
            return {
              text: c.label,
              value: c.value,
              children: this.areaArr[i]
            }
          })
        })

       this.arr = data.data.provinceData.map((t, i) => {
        return {
          text: t.label,
          value: t.value,
          children: this.cityArr[i]
        }
       })
       console.log(this.arr,  this.cityArr)
      })
    }
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