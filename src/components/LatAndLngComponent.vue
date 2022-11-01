<template>
  <div class="big">
    <div>
      <div class="address-item">
        <div class="back-item">
          <span class="span-lf" @click.stop="setLatAndLngVal(), setMyViewShow()"><i class="icon icon-keyboard_arrow_left"></i></span>
          <span class="span-gt">地址管理</span>
        </div>
        <div
          v-for="item in latAndLng"
          :key="item.id"
          @click="setLatAndLngVal(item.lat, item.lng, item.id, item.address)"
          class="address-list"
        >
          <div>
            <span>{{item.receiver.substring(0, 1)}}</span>
          </div>
          <div>
            <p>{{ item.address }}</p>
            <p>
              <span>{{ item.receiver }}</span
              ><span>{{ item.telPhone }}</span>
            </p>
          </div>
          <div>
            <button @click.stop="show = true, addressId = item.id">编辑</button>
          </div>
        </div>
      </div>
    </div>
    <div class="add-to">
      <button @click="open = true">添加</button>
    </div>
    <SetAddress v-show="show || open" :show="show" :addressId="addressId" @setLatAndLngVal="setShow"></SetAddress>
  </div>
</template>

<script>
import SetAddress from './SetAddress.vue';
//https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appDetail 进入地址编辑
//https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSave 修改地址接口
/* 
id: 3ba0e9a6e5ca14678377e9447c99657b
useStatus: 1
createUserId: LCOCF93C
createTime: 2022-09-30 21:12:15
updateUserId: null
updateTime: null
useStatusName: 在用
userId: LCOCF93C
receiver: 吴鑫棋
telPhone: 15152897322
provinceCode: null
cityCode: null
areaCode: null
address: 拱北街道粤华路新市花园
addressDetail: 112
isEnable: 0
lng: 113.551403
lat: 22.222750
distance: 0
canSelect: false
*/
export default {
    props: {
        latAndLng: Array,
    },
    data() {
        return {
            show: false,
            open: false,
            addressId:' ',
            chosenAddressId: "1",
            list: [
                {
                    id: "1",
                    name: "张三",
                    tel: "13000000000",
                    address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
                    isDefault: true,
                },
                {
                    id: "2",
                    name: "李四",
                    tel: "1310000000",
                    address: "浙江省杭州市拱墅区莫干山路 50 号",
                },
            ],
            disabledList: [
                {
                    id: "3",
                    name: "王五",
                    tel: "1320000000",
                    address: "浙江省杭州市滨江区江南大道 15 号",
                },
            ],
        };
    },
    created() {
        this.list = this.latAndLng;
        console.log(this.latAndLng);
    },
    methods: {
        setLatAndLngVal(lat, lng, id, address) {
            this.$emit("setShowLatAndLng", false);
            this.$emit("setLatAndLngVal", lat, lng, id, address);
            // this.$emit("setMyViewShow", false)
        },
        setMyViewShow() {
          this.$emit("setMyViewShow", false)
        },
        setShow(val) {
          this.show = val
          this.open = val

          this.$emit("getLatAndLngVal")
        }
    },
    components: { SetAddress }
};
</script>

<style lang="scss" scoped>
.big {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 99;

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
}
</style>

<style lang="scss" scoped>
.address-item {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  z-index: 999;
  background-color: #eee;

  .address-list {
    display: flex;
    padding: 2vw 2vw;
    background-color: #fff;

    & div:nth-child(1) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 13vw;
      height: 13vw;
      margin-right: 2vw;
      border-radius: 999px;
      font-weight: bold;
      color: #fff;
      background-color: #8799a3;
    }

    & div:nth-child(2) {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      p {
        font-weight: bold;
      }

      & p:nth-child(2) {
        font-size: 3vw;
        font-weight: normal;
        padding-top: 2vw;
        color: #8799a3;

        span {
          margin-right: 3vw;
        }
      }
    }

    & div:nth-child(3) {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: .1vw solid #eee;
      width: 16vw;
      padding: 1vw;

      button {
        border: none;
        outline: none;
        color: #8799a3;
        background-color: #fff;
      }
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
    }

    .span-lf {
      position: absolute;
      left: 20px;
    }
  }

}
</style>