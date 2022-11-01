<template>
  <div class="my-collection">
    <div class="back-item">
      <span class="span-lf" @click="$router.back(-1)"><i class="icon icon-keyboard_arrow_left"></i></span>
      <span class="span-gt">我的收藏</span>
    </div>
    <div class="collection-class">
      <div class="shop-item">
        <span>商品</span>
      </div>
      <div class="collection-shop">
        <span>店铺</span>
      </div>
    </div>
    <div v-for="item in collectArr" :key="item.id" class="collection-item">
      <div>
        <input type="checkbox" @click="item.checked = true" />
      </div>
      <MyCollectionCompoent :item="item" class="collection-content"></MyCollectionCompoent>
    </div>
    <div>   
      <!-- <div><input type="checkbox" /></div> -->
      <div class="add-to">
        <button @click="setCollection()">取消收藏</button>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import MyCollectionCompoent from "./MyCollectionCompoent.vue";
export default {
  data() {
    return {
      collectArr: [],
      ids: {
        ids: "",
      },
      collectId: "",
    };
  },
  created() {
    this.getCollectData();
  },
  methods: {
    getCollectData() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/plat/collect/getList?colType=1&limit=15&page=1`
        )
        .then(({ data }) => {

          this.collectArr = data.data.map((t) => {
            return {
              ...t,
              checked: false,
            };
          });
        });
    },
    setCollection() {
      for (let i = 0; i < this.collectArr.length; i++) {
        if (this.collectArr[i].checked == true) {
          this.ids.ids += this.collectArr[i].id + ",";
        }
      }

      if (this.ids.ids.charAt(this.ids.ids.length - 1) == ",") {
        this.ids.ids = this.ids.ids.substring(0, this.ids.ids.length - 1);
      }
      // this.ids.ids = '80c198aef98a24cb1d534efa428d02c2,80c198aef98a24cb1d534efa428d02c2'
      // console.log(qs.stringify(this.ids));
      // this.ids.ids =
      this.$axios
        .post(
          `https://admin.zhyumi.cn/ddfresh/app/plat/collect/cancel `,
          qs.stringify(this.ids)
        )
        .then(({ data }) => {
          console.log(data);
          this.getCollectData();
        });
    },
  },

  components: {
    MyCollectionCompoent,
  },
};
//https://admin.zhyumi.cn/ddfresh/app/plat/collect/cancel 这是取消收藏的请求
//https://admin.zhyumi.cn/ddfresh/app/plat/collect/getList?colType=1&limit=15&page=1 这是请求已收藏商品的接口
</script>

<style lang="scss" scoped>
.my-collection {
  position: fixed;
  width: 100vw;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 800;

  .add-to {
    position: absolute;
    width: 100vw;
    bottom: 0;
    padding: 2vw 4vw;
    background-color: #fff;
    z-index: 1000;

    button {
      width: 100%;
      border-radius: 999px;
      outline: none;
      border: none;
      padding: 3.5vw;
      font-size: 5vw;
      color: #fff;
      background-color: #ff3d3d;
    }
  }

  .collection-class {
    display: flex;
    text-align: center;

    .shop-item {
      flex: 1;
      padding: 5vw 5vw;
    }

    .collection-shop {
      flex: 1;
      padding: 5vw 5vw;
    }

    span {
      padding: 5vw 5vw;
    }

  }

  .back-item {
    width: 100vw;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #ff3d3d;

    .span-lf,
    .span-gt {
      font-size: 14px;
      font-weight: 600;
      color: #fff;

      .icon {
        font-size: 7vw;
        vertical-align:middle;
      }
    }

    .span-lf {
      position: absolute;
      left: 20px;
    }
  }

  .collection-item {
    display: flex;
    padding: 2.8vw 5.5vw;

    & div:nth-child(1) {
        width: 10vw;
    }

    .collection-content {
        flex: 1;
    }
  }
}
</style>