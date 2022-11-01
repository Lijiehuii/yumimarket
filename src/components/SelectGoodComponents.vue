<template>
  <div class="select-good" v-show="selectGoodId == item.id" @click.stop="">
    <div class="select-good-wrapper">
      <div class="select-good-top">
        <p class="select-good-title">{{ item.title }}</p>
        <span class="close-btn" @click.stop="setSelectId(), sendShopCartData()"
          >X</span
        >
      </div>
      <div class="select-good-text">
        <p class="select-good-size">规格：</p>
        <div class="select-good-size-desc">
          <p v-if="SkuList.length == 1" class="selected-size">
            <span
              :class="{ active: selectedSizeId == SkuList[0].id }"
              :data-id="SkuList[0].id"
              @click="logSkuId(SkuList[0].id)"
            >
              {{ SkuList[0].title }}
            </span>
          </p>
          <p v-if="SkuList.length > 1" class="selected-size">
            <span
              v-for="item in SkuList"
              :key="item.id"
              :data-id="item.id"
              :class="{ active: selectedSizeId == item.id }"
              @click="
                (skuid = item.id),
                  (selectedSizeId = item.id),
                  (selectWeight = item.weight),
                  (selectPrice = item.price),
                  logSkuId(item.id)
              "
            >
              {{ item.title }}
            </span>
          </p>
        </div>
        <p class="has-selected-size">
          已选规格：
          <span v-if="SkuList.length == 1">{{ SkuList[0].title }}</span>
          <span v-if="SkuList.length > 1">{{ selectWeight }}g</span>
        </p>
        <div class="select-good-price">
          <div class="select-good-size-price">
            <p v-if="SkuList.length == 1" class="price-size">
              <span class="price-icon">￥</span
              ><span class="price">{{ SkuList[0].price }}</span>
              <span class="weight"
                >/{{ SkuList[0].weight + SkuList[0].weightUnitName }}</span
              >
            </p>
            <p v-if="SkuList.length > 1" class="price-size">
              <span class="price-icon">￥</span
              ><span class="price">{{ selectPrice }}</span
              ><span class="weight">/{{ selectWeight }}g</span>
            </p>
          </div>
          <div class="select-good-count">
            <p v-if="buyNum == 0" class="add-to-cart" @click="buyNum += 1">
              加入购物车
            </p>
            <p v-if="buyNum > 0" class="add-or-reduce">
              <button @click="buyNum -= 1" class="reduce">-</button
              ><span class="good-count">{{ buyNum }}</span
              ><button @click="(buyNum += 1), logData()" class="add">+</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  props: {
    item: Object,
    selectGoodId: String,
    sku: Array,
  },
  data() {
    return {
      selectSize: [],
      SkuList: [],
      itemArr: [],
      SkuListTitle: "",

      selectedSizeId: "",
      selectWeight: "",
      selectPrice: "",

      // 购买商品id和数量
      skuid: "", // skuid
      selectGood: this.selectGoodId, //好物id
      buyNum: 0, // 数量
    };
  },
  created() {
    this.getSkuList = debounce(this.getSkuList);
  },
  updated() {
    // console.log( this.sku);
  },
  mounted() {
    this.getSkuList();
  },
  computed: {},
  methods: {
    setSelectId() {
      this.$emit("set-selected-id");
    },

    setBuyNum(item) {
      console.log("有没有保持不变的数量");
      if (this.sku) {
        for (let i = 0; i < this.sku.length; i++) {
          if (this.sku[i].goodsId == item.id) {
            this.buyNum = this.sku[i].buyNum;
            break;
          }
        }
      }
    },

    sendShopCartData() {
        console.log("发送数据");
        this.$emit("sendShopCartData", {
          skuId: this.skuid, // skuid
          goodsId: this.selectGoodId, //好物id
          buyNum: this.buyNum,
        });
    },

    getSkuList() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsSku/getSkuList?goodsId=${this.item.id}`
        )
        .then(({ data }) => {
          this.SkuList = data.data;
          this.selectedSizeId = this.SkuList[0].id;
          this.selectWeight = this.SkuList[0].weight;
          this.selectPrice = this.SkuList[0].price;
          this.skuid = this.SkuList[0].id;
        });
    },
    logSkuId(id) {
      console.log(id);
    },
    logData() {
      console.log(this.buyNum, this.skuid);
    },
  },
  watch: {
    selectGoodId() {
      this.setBuyNum(this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
.select-good {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;

  .select-good-wrapper {
    width: 340px;
    background-color: #fff;
    border-radius: 5px;

    .select-good-top {
      position: relative;
      width: 100%;
      height: 50px;
      text-align: center;
      line-height: 50px;

      .select-good-title {
        width: 100%;
        height: 50px;
        color: #666;
      }
      .close-btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        color: rgb(229, 78, 67);
      }
    }

    .select-good-text {
      padding: 15px;
      background-color: #eee;

      .select-good-size {
        font-size: 14px;
        color: #333;
      }

      .select-good-size-desc {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .selected-size {
          color: #333;
          font-size: 14px;
          display: flex;

          span {
            display: block;
            padding: 5px 15px;
            margin: 10px 10px 0 0;
            border-radius: 3px;
            background-color: #fff;

            &.active {
              background-color: #ff3d3d;
              color: #fff;
            }
          }
        }
      }

      .has-selected-size {
        font-size: 12px;
        color: #8799a3;
        margin: 25px 0 15px 0;
        text-align: left;
      }

      .select-good-price {
        display: flex;
        justify-content: space-between;

        .select-good-size-price {
          display: flex;
          align-items: center;
          color: #e54d42;
          font-size: 12px;

          .price {
            font-size: 16px;
            font-weight: 700;
          }

          .weight {
            color: #8799a3;
          }
        }

        .select-good-count {
          .add-to-cart {
            font-size: 14px;
            font-weight: 700;
            padding: 4px;
            background-color: #fbbd08;
            color: #333;
          }

          .add-or-reduce {
            display: flex;
            align-items: center;
            text-align: center;

            button {
              border-radius: 999px;
            }

            .good-count {
              width: 30px;
              box-sizing: border-box;
            }

            .add {
              background-color: #fbbd08;
            }
          }
        }
      }
    }
  }
}
</style>