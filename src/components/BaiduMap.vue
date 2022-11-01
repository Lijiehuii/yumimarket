<template>
  <div class="baidu-map">
    <div class="back-item">
      <span class="span-lf" @click.stop="setLatAndLngVal"
        ><i class="icon icon-keyboard_arrow_left"></i
      ></span>
      <span class="span-gt">地址管理</span>
    </div>
    <baidu-map
      style="display: flex; flex-direction: column-reverse"
      id="allmap"
      @ready="mapReady"
      @click="getLocation"
      :scroll-wheel-zoom="true"
    >
      <div style="display: flex; justify-content: center; margin: 15px" class="search">
        <bm-auto-complete
          v-model="searchJingwei"
          :sugStyle="{ zIndex: 999999 }"
        >
          <input
            v-model="searchJingwei"
            style="width: 300px; height: 30px; margin-right: 10px; border: .1vw solid #aaa;"
            placeholder="输入地址"
          />
        </bm-auto-complete>
        <button @click="getBaiduMapPoint">搜索</button>
      </div>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-marker
        v-if="infoWindowShow"
        :position="{ lng: longitude, lat: latitude }"
      >
        <bm-label
          content=""
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker>
      <bm-info-window
        :position="{ lng: longitude, lat: latitude }"
        :show="infoWindowShow"
        @clickclose="infoWindowClose"
      >
        <p>纬度:{{ this.latitude }}</p>
        <p>经度:{{ this.longitude }}</p>
      </bm-info-window>
    </baidu-map>
    <div class="lists-box">
      <ul class="address-lists">
        <li
          @click="getAddressData(myObj), setLatAndLngVal()"
          class="address-list"
        >
          <h3>{{ searchJingwei ? searchJingwei : "我的位置" }}</h3>
          <p>{{ myAddress }}</p>
        </li>
        <li
          v-for="item in pointaddress"
          :key="item.uid"
          class="address-list"
          @click="getAddressData(item), setLatAndLngVal()"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      searchJingwei: "",
      myAddress: "",
      infoWindowShow: false,
      longitude: 113.587,
      latitude: 23.5453,
      point: "",
      pointaddress: [],
      myObj: {},
    };
  },
  created() {},
  methods: {
    //地图初始化
    mapReady({ BMap, map }) {
      // 选择一个经纬度作为中心点
      // 浏览器获取经纬度的
      // let geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r){
      //        let mk = new BMap.Marker(r.point);
      //         map.addOverlay(mk);
      //         map.panTo(r.point);
      //         console.log(r.point.lat, r.point.lng)
      // })
      this.point = new BMap.Point(this.longitude, this.latitude);
      console.log(this.point);
      map.centerAndZoom(this.point, 15);
      this.BMap = BMap;
      this.map = map;
      this.getBaiduMapPoint();
      this.getData(BMap, map);
    },
    //点击获取经纬度
    getLocation(e) {
      this.longitude = e.point.lng;
      this.latitude = e.point.lat;
      this.infoWindowShow = true;
    },
    getBaiduMapPoint() {
      let that = this;
      let myGeo = new this.BMap.Geocoder();

      myGeo.getPoint(this.searchJingwei, function (point) {
        if (point) {
          console.log(point, "看看");
          that.map.centerAndZoom(point, 15);
          console.log(point.lat);
          that.latitude = point.lat;
          that.longitude = point.lng;
          that.infoWindowShow = true;
        }
      });

      let points = new this.BMap.Point(that.longitude, that.latitude);
      myGeo.getLocation(points, function (point) {
        if (point) {
          let pointadd = point.addressComponents;
          that.pointaddress = point.surroundingPois;
          let address =
            pointadd.province +
            pointadd.city +
            pointadd.district +
            pointadd.street +
            pointadd.streetNumber; //获取地址

          that.myAddress = address;

          that.myObj = {
            title: that.searchJingwei || address,
            address: that.myAddress,
            point: {
              lat: that.longitude,
              lng: that.latitude,
            },
          };
          setTimeout(function () {
            console.log("您当前所在位置是：" + address, pointadd, point);
          }, 1000);
        }
      });
    },
    //信息窗口关闭
    infoWindowClose() {
      this.latitude = "";
      this.longitude = "";
      this.infoWindowShow = false;
    },

    getPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              let latitude = position.coords.latitude;
              let longitude = position.coords.longitude;
              let data = {
                latitude: latitude,
                longitude: longitude,
              };
              resolve(data);
            },
            function () {
              reject(arguments);
            }
          );
        } else {
          reject("破谷歌不给经纬度");
        }
      });
    },
    getData() {
      this.getPosition()
        .then((result) => {
          // 返回结果
          // {latitude: 30.318030999999998, longitude: 120.05561639999999}
          // 小数点只取六位
          let queryData = {
            longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
            latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
            channelType: "00",
          };
          console.log(queryData);

          this.longitude = queryData.longtitude;
          this.latitude = queryData.latitude;

          console.log(this.longitude, this.latitude);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAddressData(obj) {
      this.$emit("getAddress", obj);
    },

    setLatAndLngVal() {
      this.$emit("setLatAndLngVal", false);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.baidu-map {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100vw;
  background-color: #fff;
  z-index: 1009;

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

  .lists-box {
    height: 40vw;
    overflow: auto;

    .address-lists {
    // background-color: #ff3d3d;

    .address-list {
      margin: 2vw;
      padding: 2vw 1vw;
      line-height: 1.4;
      border-bottom: .1vw solid #eee;
    }
  }
  }
 
}
#allmap {
  height: 450px;
  width: 100%;
  margin: 10px 0;
}

.search {

  button {
    border: none;
    outline: none;
    background-color: #fff;
  }
}
</style>

