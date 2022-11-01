<template>
  <div class="classification-mian-wrapper">
    <div
      class="classification-left-item"
      v-for="(item, i) in goodsClassList"
      :key="item.id"
      v-show="showList == i"
    >
      <p
        class="left-item"
        v-for="list in item.children"
        :class="{ active: classId == list.id }"
        :key="list.name"
        :data-classId="list.id"
        @click="setClassId(list.id)"
      >
        {{ list.name }}
      </p>
    </div>
    <div class="classification-right-item">
      <div
        class="right-item"
        v-for="item in goodsList"
        :key="item.id"
        @click="(goodId = item.id), goToDetailView()"
      >
        <div class="right-item-pic">
          <img :src="item.wholeIcon" />
        </div>
        <div class="good-desc">
          <p class="good-title">{{ item.title }}</p>
          <p class="good-price">
            <span class="good-price-icon">￥</span>{{ item.price }}
          </p>
          <div class="other-desc">
            <div class="other-text">
              <span class="good-rate">好评率{{ item.goodRate }}%</span
              ><span>已售{{ item.saleNum }}</span>
            </div>
            <div class="icon icon-cart" @click.stop="select(item.id)"></div>
          </div>
        </div>
        <SelectGoodComponents
          :selectGoodId="selectGoodId"
          :item="item"
          :sku="sku"
          @set-selected-id="setSelectedId"
          @sendShopCartData="sendShopCartData"
        />
      </div>
      <p class="nomore">没有更多了！</p>
    </div>
  </div>
</template>

<script>
import SelectGoodComponents from "@/components/SelectGoodComponents.vue";
export default {
  props: {
    classId: String,
    goodsClassList: Array,
    goodsList: Array,
    showList: Number,
    topSetected: Number,
    setShopId: String,
    marketId: String,
    sku: Array
  },
  data() {
    return {
      selectGoodId: "",
      goodId: this.marketId,
      getShopInfo: this.setShopId,
    };
  },
  methods: {
    setClassId(id) {
      this.$emit("set-class-id", id);
    },

    goToDetailView() {
      this.$router.push({
        path: "/details",
        query: {
          goodId: this.goodId,
          getShopInfo: this.getShopInfo,
        },
      });
    },
    select(id) {
      this.selectGoodId = id;
    },

    setSelectedId() {
      this.selectGoodId = "";
    },

    sendShopCartData(val) {
      console.log('数据来了')
      this.$emit("sendShopCartData", val);
    }
  },
  components: {
    SelectGoodComponents,
  },
};

</script>

<style lang="scss" scoped>
.classification-mian-wrapper {
  display: flex;
  width: 100vw;
  background-color: #fff;
  padding-bottom: 55px;

  .classification-left-item {
    display: inline-block;
    width: 89px;
    height: auto;
    position: fixed;
    top: 194px;
    left: 0;

    .left-item {
      position: relative;
      box-sizing: border-box;
      width: 89px;
      height: 45px;
      padding: 0 10px;
      font-size: 12px;
      text-align: center;
      line-height: 45px;

      &.active {
        color: red;
        background-color: #f1f1f1;

        &::after {
          position: absolute;
          content: "";
          width: 4px;
          height: 15px;
          border-radius: 5px 0 0 5px;
          position: absolute;
          background-color: currentColor;
          top: 0;
          right: 0px;
          bottom: 0;
          margin: auto;
        }
      }
    }
  }

  .classification-right-item {
    width: 100%;
    min-height: calc(100vh - 235px);
    margin-top: 174px;
    margin-left: 89px;
    padding-top: 20px;

    .right-item {
      border-left: 1px solid #eee;
      border-bottom: 1px solid #eee;
      display: flex;
      box-sizing: border-box;
      width: auto;
      height: 90px;
      padding: 10px;

      .right-item-pic {
        width: 70px;
        height: 70px;

        img {
          display: block;
          width: 70px;
          height: 70px;
          border-radius: 5px;
        }
      }

      .good-desc {
        width: 100%;
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .good-title {
          font-size: 14px;
          font-weight: 700;
          color: #333;
        }

        .good-price {
          font-size: 16px;
          font-weight: 700;
          color: #e54d42;

          .good-price-icon {
            font-size: 12px;
            font-weight: 0;
          }
        }

        .other-desc {
          display: flex;
          justify-content: space-between;

          .other-text {
            display: flex;
            font-size: 10px;
            color: #aaa;
            align-items: center;
            .good-rate {
              margin-right: 10px;
            }
          }

          .icon {
            display: block;
            margin-right: 20px;
            width: 18px;
            height: 18px;
            color: #f37b1d;
          }
        }
      }
    }

    .nomore {
      width: 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>