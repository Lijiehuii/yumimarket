<template>
  <div>
    <div class="banner-box">
      <div
        class="banner-img"
        :style="{ left: -left + 'px', transition: transition }"
        @transitionend="stop"
      
      >
        <div v-for="item in bannerArr" :key="item.id" class="img-box" ref="div"   @click="goTo(item.id, item.id)">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div :key="21312312312" class="img-box">
          <img :src="bannerArr[0]?.imgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    lat: {
      type: String
    },
    lng: {
      type: String
    },
    shopId: {
      type: String
    },
    page: {
      type: Number
    }
  },
  data() {
    return {
      bannerArr: [],
      index: 0,
      left: 0,
      transition: "all 1s linear",
      timer: null,
    };
  },
  created() {
    this.getBannerPic();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.index++;
      this.left = this.$refs.div[0].offsetWidth * this.index;
      this.transition = "all .6s ease-out";
    }, 4000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getBannerPic() {
      this.$axios
        .get(
          `https://admin.zhyumi.cn/ddfresh/app/plat/imgShow/appList?page=1&limit=5&useType=0`
        )
        .then(({ data }) => {
          // console.log(data.data);
          this.bannerArr = data.data;
        });
    },

    stop() {
      if (this.index >= this.bannerArr.length) {
        this.index = 0;
        this.transition = "none";

        this.left = this.$refs.div[0].offsetWidth * this.index;
      }
    },

    goTo(id, shopId) {
      // this.$emit('goTo' , id, shopId)
      console.log(id, shopId)
    }
  },
};
</script>

<style lang="scss" scoped>
.banner-box {
  width: 100vw;
  overflow: hidden;
  background-color: #eee;

  .banner-img {
    display: flex;
    position: relative;
    width: 1000%;
    // height: 165px;
    overflow: hidden;

    .img-box {
      position: relative;
      border-radius: 2vw;
      width: 100vw;
      height: 46vw;
      padding: 3vw 5vw;
      box-sizing: border-box;
      overflow: hidden;

      img {
        display: block;
        border: 3px solid #fff;
        border-radius: 3vw;
        width: 98%;
        height: 98%;
         
      }
    }

    .banner-enter {
      left: -100vw;
    }

    .banner-enter-active,
    .banner-leave-active {
      transition: all 1s linear;
    }

    .banner-enter-to,
    .banner-leave {
      left: 0;
    }

    .banner-leave-to {
      left: 100vw;
    }
  }
}
</style>