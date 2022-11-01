<template>
  <div class="address">
    <div class="back-item">
      <span class="span-lf" @click.stop="setLatAndLngVal"
        ><i class="icon icon-keyboard_arrow_left"></i
      ></span>
      <span class="span-gt">编辑地址</span>
    </div>
    <div>
      <div class="input-text" @click.stop="showMap = !showMap">
        <div>收货地址</div>
        <div>
          <span>{{ address.address ? address.address : text }} </span>
          <span></span>
        </div>
      </div>
      <div class="input-text">
        <div>门牌号</div>
        <div>
          <input
            type="text"
            placeholder="详细地址,例:8号楼9层901室"
            :value="address.addressDetail"
            ref="detail"
            @change="(detailText = $refs.detail.value), setMsg()"
          />
        </div>
      </div>
      <div class="input-text">
        <div>联系人</div>
        <div>
          <input
            type="text"
            placeholder="请输入收货人姓名"
            :value="address.receiver"
            ref="receiver"
            @change="(receiverText = $refs.receiver.value), setMsg()"
          />
        </div>
      </div>
      <div class="input-text">
        <div>联系电话</div>
        <div>
          <input
            type="text"
            placeholder="请输入联系电话"
            :value="address.telPhone"
            ref="telPhone"
            @change="(telPhoneText = $refs.telPhone.value), setMsg()"
          />
        </div>
      </div>
      <div class="romove-btn" v-show="show">
        <button @click="removeAddress(), setLatAndLngVal()">删除地址</button>
      </div>
    </div>
    <div class="add-to">
      <button @click="setAddressData(), setLatAndLngVal()" v-show="show">
        保存
      </button>
    </div>
    <div class="add-to">
      <button @click="addAddressData()" v-show="!show">
        保存
      </button>
    </div>
    <BaiduMap
      @setLatAndLngVal="setLat"
      @getAddress="getAddress"
      v-show="showMap"
    ></BaiduMap>
  </div>
</template>

<script>
/*
https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSave 添加地址
https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appDelete 删除地址 携带ids: id 表单数据
userId: 
receiver: 江敏
telPhone: 15907814842
address: 流溪小学
addressDetail: 9号楼粤嵌科技999号
isEnable: 0
lat: 23.547439
lng: 113.582995
*/

/*
userId: 
receiver: 雷德臻
telPhone: 15907814842
address: 我的位置
addressDetail: 粤嵌科技999号
isEnable: 0
lat: 23.54835
lng: 113.58646
*/
import qs from "qs";
import BaiduMap from "./BaiduMap.vue";
export default {
  props: {
    addressId: String,
    show: Boolean,
  },
  data() {
    return {
      address: {},
      id: {
        id: "",
      },
      detailText: "",
      receiverText: "",
      telPhoneText: "",
      addressMsg: {},
      addressText: "雷德臻的家吗",
      text: "请选择",
      showMap: false,
      addMsg: {},
      lat: 0,
      lng: 0,
    };
  },
  methods: {
    getAddressData() {
      console.log("hello");
      this.$axios
        .post(
          `https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appDetail`,
          qs.stringify(this.id)
        )
        .then(({ data }) => {
          console.log(data);
          this.address = data.data.detail;
          this.detailText = this.address.addressDetail;
          this.receiverText = this.address.receiver;
          this.telPhoneText = this.address.telPhone;
        });
    },
    setLatAndLngVal() {
      this.address = {};
      this.detailText = "";
      this.receiverText = "";
      this.telPhoneText = "";
      this.$emit("setLatAndLngVal", false);
    },
    setAddressData() {
      this.$axios
        .post(
          `https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSave`,
          qs.stringify(this.addressMsg)
        )
        .then(({ data }) => {
          console.log(data);
        });
    },
    removeAddress() {
      this.$axios
        .post(
          `https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appDelete`,
          qs.stringify({ ids: this.id.id })
        )
        .then(({ data }) => {
          console.log(data);
        });
    },
    addAddressData() {
      if (this.text == "请选择") {
        this.$toast("请选择地址");
      } else if (this.$refs.detail.value == "") {
        this.$toast("请填写详细地址");
      } else if (this.$refs.receiver.value == "") {
        this.$toast("请填写收货姓名");
      } else if (this.$refs.telPhone.value == "") {
        this.$toast("请填写电话号码");
      } else {
        this.$axios
          .post(
            `https://admin.zhyumi.cn/ddfresh/app/address/addressManage/appSave`,
            qs.stringify(this.addMsg)
          )
          .then(({ data }) => {
            console.log(data);
            this.setLatAndLngVal()
            this.$toast(data.msg)
          });
      }
    },
    setMsg() {
      this.addressMsg = {
        ...this.address,
        receiver: this.receiverText,
        addressDetail: this.detailText,
        telPhone: this.telPhoneText,
      };
      this.addMsg = {
        userId: "",
        receiver: this.receiverText,
        telPhone: this.telPhoneText,
        address: this.text,
        addressDetail: this.detailText,
        isEnable: 0,
        lat: this.lat,
        lng: this.lng,
      };
      console.log(this.addMsg);
    },
    setLat(val) {
      this.showMap = val;
    },
    getAddress(obj) {
      console.log(obj);
      this.text = obj.title;
      this.address.address = obj.title;
      console.log(this.text);
      this.setMsg();
      // this.lat = obj.point.lat
      // this.lng = obj.point.lng
      // console.log(address);
    },
  },
  watch: {
    show() {
      if (this.show) {
        this.id.id = this.addressId;
        console.log(this.id.id);
        this.getAddressData();
      }
    },
  },
  components: { BaiduMap },
};
</script>

<style lang="scss" scoped>
.address {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  z-index: 1002;

  .add-to {
    position: absolute;
    width: 100vw;
    bottom: 0;
    padding: 2vw 4vw;
    background-color: #fff;
    z-index: 1003;

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

  .input-text {
    display: flex;
    justify-content: space-between;
    padding: 0.1vw 4vw;
    font-size: 4vw;
    line-height: 12vw;
    border-bottom: 1px solid #f2f2f2;

    input {
      text-align: right;
      outline: none;
      border: none;
    }
  }

  .romove-btn {
    padding: 4vw;

    button {
      width: 100%;
      border: none;
      padding: 2vw;
      border-radius: 2vw;
      color: #fff;
      background-color: #ff3d3d;
    }
  }
}
</style>