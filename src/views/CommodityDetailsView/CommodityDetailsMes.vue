<template>
  <div class="commodity-details-mes">
    <div class="commodity-details-types">
      <span
        class="details"
        :class="{ active: ComDetType == 'details' }"
        @click="setComDetType('details')"
        >详情</span
      >
      <span
        class="parameter"
        :class="{ active: ComDetType == 'parameter' }"
        @click="setComDetType('parameter')"
        >参数</span
      >
      <span
        class="security"
        :class="{ active: ComDetType == 'security' }"
        @click="setComDetType('security')"
        >食品安全</span
      >
    </div>
    <div class="commodity-details-type">
      <div class="details" v-if="ComDetType == 'details'">
        <p>
          <span class="details-title">规格：</span>
          <span class="details-text">{{ skuList.title }}</span>
        </p>
        <p>
          <span class="details-title">重量：</span>
          <span class="details-text">{{
            skuList.weight + skuList.weightUnitName
          }}</span>
        </p>
        <p>
          <span class="details-title">单位：</span>
          <span class="details-text">{{ skuList.unitName }}</span>
        </p>
      </div>
      <div class="parameter" v-if="ComDetType == 'parameter'">
        <p>
          <span class="parameter-title">单位：</span
          ><span class="parameter-text">{{ detail.shopName }}</span>
        </p>
        <p>
          <span class="parameter-title">联系方式：</span
          ><span class="parameter-text">{{ detail.contractNumber }}</span>
        </p>
        <p>
          <span class="parameter-title">区域：</span
          ><span class="parameter-text">{{ detail.address }}</span>
        </p>
        <p>
          <span class="parameter-title">详细地址：</span
          ><span class="parameter-text">{{ detail.addressDetail }}</span>
        </p>
        <p>
          <span class="parameter-title">预包装：</span
          ><span class="details-text"></span>
        </p>
        <h3>溯源信息</h3>
        <p>
          <span class="parameter-title">供应商：</span
          ><span class="parameter-text">{{ detail.shopName }}</span>
        </p>
        <p>
          <span class="parameter-title">联系方式：</span
          ><span class="parameter-text">{{ detail.contractNumber }}</span>
        </p>
        <p>
          <span class="parameter-title">区域：</span
          ><span class="parameter-text">{{ detail.address }}</span>
        </p>
        <p>
          <span class="parameter-title">详细地址：</span
          ><span class="parameter-text">{{ detail.addressDetail }}</span>
        </p>
      </div>
      <div class="security" v-if="ComDetType == 'security'">
        <h3>包装信息</h3>
        <p>
          <span class="security-title">合格证：</span
          ><span class="security-text"></span>
        </p>
        <p>
          <span class="security-title">生产日期：</span
          ><span class="security-text"></span>
        </p>
        <p>
          <span class="security-title">生产许可证：</span
          ><span class="security-text"></span>
        </p>
        <p>
          <span class="security-title">条形码：</span
          ><span class="security-text"></span>
        </p>
        <h3>相关照片</h3>
        <h3>三品一标</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList: Object,
    info: Object,
    skuList: Object,
    detail: Object,
    ComDetType: String,
    goodDetails: Object,
    marketDetail: Object,
  },
  methods: {
    setComDetType(type) {
      this.$emit("set-com-desc-type", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.commodity-details-mes {
  box-sizing: border-box;
  width: 100vw;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;

  .commodity-details-types {
    display: flex;
    box-sizing: border-box;
    height: 35px;
    margin-bottom: 15px;
    align-items: center;

    span {
      display: block;
      box-sizing: border-box;
      height: 100%;
      padding: 10px 0;
      margin: 0 15px;
      color: #8799a3;
      font-size: 12px;

      &.active {
        font-size: 14px;
        color: #000;
        border-bottom: 2px solid #000;
      }
    }
  }

  .commodity-details-type {
    box-sizing: border-box;
    background-color: #f0f0f0;
    color: #333;
    font-size: 12px;
    margin-bottom: 10px;

    .details {
      p {
        display: flex;
        padding: 5px;
        align-items: center;
        color: #8799a3;

        .details-text {
          font-size: 14px;
          color: #000;
        }
      }
    }

    .parameter {
      width: 100%;
      background-color: #fff;
      color: #666;
      font-size: 12px;

      p {
        display: flex;
        border-bottom: 0.5px solid #f1f1f1;
        .parameter-title {
          display: block;
          width: 100px;
          text-align: right;
          color: #888;
          line-height: 30px;
        }

        .parameter-text {
          display: block;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: left;
          color: #333;
          font-size: 14px;
          line-height: 30px;
        }
      }

      h3 {
        box-sizing: border-box;
        padding: 0px 10px 0;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
      }
    }

    .security {
      font-size: 12px;
      color: #666;
      background-color: #fff;

      h3 {
        box-sizing: border-box;
        padding: 0px 10px 0;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
      }

      p {
        display: flex;
        border-bottom: 0.5px solid #f1f1f1;
        .security-title {
          display: block;
          width: 100px;
          text-align: right;
          color: #888;
          line-height: 30px;
        }
        .security-text {
          display: block;
          box-sizing: border-box;
          padding-left: 10px;
          text-align: left;
          color: #333;
          font-size: 14px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>