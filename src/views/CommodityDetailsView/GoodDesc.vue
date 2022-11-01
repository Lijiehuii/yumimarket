<template>
  <div class="good-desc">
    <div class="good-text">
      <p class="good-title">{{ info.title }}</p>
      <p class="good-soled">已售{{ info.saleNum }}</p>
      <p class="good-price">
        <span class="price-icon">￥</span>{{ info.price }}
      </p>
    </div>
    <div class="good-sub">
      <div class="collection" :class="{ active: collection == true }">
        <i class="icon icon-star" @click.stop="setCollection(), test()"></i>
        <p class="text" ref="collectioned">{{collection ? '已收藏' : '收藏'}}</p>
      </div>
      <div>
        <div class="select-good-count">
          <p v-if="buyNum == 0" class="add-to-cart" @click="buyNum += 1">
            <button @click="buyNum += 1" class="add">+</button>
          </p>
          <p v-if="buyNum > 0" class="add-or-reduce">
            <button @click="buyNum -= 1" class="reduce add">-</button
            ><span class="good-count">{{ buyNum }}</span
            ><button @click="buyNum += 1" class="add">+</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
//https://admin.zhyumi.cn/ddfresh/app/plat/collect/save  收藏 post mainId: 14f627ae2d449d6aae95a521085f3d65 colType: 1 表单数据
export default {
  props: {
    collection: Boolean,
    info: Object,
    sku: Array
  },
  data() {
    return {
      buyNum: 0,
      skuId: ''
    }
  },
  created() {
    console.log(this.info.id)
    this.getSkuList()
  },
  updated() {
    console.log('能更新吗')
  },
  methods: {
    setCollection() {
      if (this.collection == false) {
        this.$refs.collectioned.innerHTML = "已收藏";
      } else if (this.collection == true) {
        this.$refs.collectioned.innerHTML = "收藏";
      }
      this.$emit("set-collection");

      this.$axios.post('https://admin.zhyumi.cn/ddfresh/app/plat/collect/save', qs.stringify({mainId:this.info.id, colType: 1})).then(data=> {
        console.log(data)
      })
    },

    test() {
      console.log(this.info)
    },

    sendShopCartData() {
        console.log("发送数据");
        this.$emit("sendShopCartData", {
          skuId: this.skuId, // skuid
          goodsId: this.info.id, //好物id
          buyNum: this.buyNum,
        });
    },
    //https://admin.zhyumi.cn/ddfresh/app/plat/collect/isCollect?mainId=4b7f21ec1890a0d38919c881e08e0a20&colType=1
    // 返回值为Boolean 判断是否已收藏

    getSkuList() {
     if(JSON.stringify(this.info) !== '{}') {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/goods/goodsSku/getSkuList?goodsId=${this.info.id}`
        )
        .then(({ data }) => {
          console.log(data)
          let SkuList = data.data;
          // this.selectedSizeId = this.SkuList[0].id;
          // this.selectWeight = this.SkuList[0].weight;
          // this.selectPrice = this.SkuList[0].price;
          this.skuId = SkuList[0].id;
          this.setBuyNum()
        });
     }
    },

    setBuyNum(val) {
        console.log('修改规定')
        let arr;
        val ? arr = val : arr = this.sku
      for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i].goodsId , this.goodsId)
        if (arr[i].goodsId == this.info.id) {
          this.buyNum = arr[i].buyNum;
          console.log(this.buyNum)
        }
      }
    },
  },

  watch: {
    buyNum() {
      this.sendShopCartData()
      // this.setBuyNum()
    },
    info() {
      this.getSkuList()
      
    },
    sku() {
      this.setBuyNum()
    }
  }
};
</script>

<style lang="scss" scoped>
.good-desc {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 108px;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;

  .good-text {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: space-between;

    p {
      display: flex;
      align-items: center;
      height: calc(100% / 3);
    }

    .good-title {
      color: #333;
      font-weight: 700;
      font-size: 16px;
    }

    .good-soled {
      color: #aaa;
      font-size: 12px;
    }

    .good-price {
      font-size: 18px;
      font-weight: 700;
      color: #e54d42;

      .price-icon {
        font-size: 12px;
      }
    }
  }

  .good-sub {
    display: flex;
    width: 88px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% / 2);
    }

    .collection {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &.active {
        .icon {
          color: #fbbd08;
        }
      }

      .icon {
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        font-size: 22px;
        color: #aaa;
      }
    }

    .add {
      box-sizing: border-box;
      margin-top: 10px;
      width: 25px;
      height: 25px;
      background-color: #fbbd08;
    }
  }
}
</style>