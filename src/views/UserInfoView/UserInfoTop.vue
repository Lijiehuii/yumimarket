<template>
  <div class="user-info-top">
    <div class="user-pic">
      <img
        ref="img"
        :src="
          userInfo.wholeAvatarUrl
            ? userInfo.wholeAvatarUrl
            : 'http://zhyumi.cn/static/img/pub/def_img.png'
        "
      />
      <van-uploader class="upload" :after-read="afterRead" ref="uploadPic" />
    </div>
    <p class="user-id">
      <span class="id-text">ID：{{ userInfo.id }}</span>
    </p>
  </div>
</template>

<script>
import qs from "qs";
export default {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      file: {
        file: "",
      },
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let s = this.dataURLtoBlob(file.content);
      let imgPath = URL.createObjectURL(s);
      this.file.file = imgPath;
      console.log(imgPath, s, qs.stringify(this.file));
      let formData = new FormData();
      formData.append("file", s);
      console.log(formData);
      setTimeout(() => {
        this.$axios
          .post(
            "https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/saveAvatarUrl",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(({ data }) => {
            if (data.success) {
              this.$axios
                .get(
                  `https://admin.zhyumi.cn/ddfresh/app/sys/wxUser/info?id=${this.userInfo.id}`
                )
                .then(({ data }) => {
                  if (data.success) {
                    let newUserInfo = data.data;
                    localStorage.setItem(
                      "kaoa_user_info",
                      JSON.stringify(newUserInfo)
                    );
                    setTimeout(() => {
                      location.reload();
                    }, 2);
                  }
                  console.log(data);
                });
            }
          });
      }, 1000);
    },

    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info-top {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  margin-bottom: 10px;
  background-color: #fff;
  // opacity: 0;

  .user-pic {
    position: relative;
    width: 90px;
    height: 90px;
    margin-bottom: 5px;

    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      flex: 0 0 25px;
      width: 25px;
      height: 25px;
      background-image: url("https://zhyumi.cn/static/img/user/camera.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      content: "";
      z-index: 1;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 999px;
    }
    .upload {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 90px;
      height: 90px;
      overflow: hidden;
      opacity: 0;
      z-index: 20;
    }
  }

  .user-id {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .id-text {
      font-size: 14px;
      padding: 5px 10px;
      display: block;
      border: 1px solid #999;
      color: #999;
      border-radius: 999px;
    }
  }
}
</style>