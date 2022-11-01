import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import vantUi from '@/tools/vant'
import BaiduMap from 'vue-baidu-map'

Vue.use(vantUi)


Vue.use(BaiduMap, {
  ak: 'ZOUuW5U7w0dGVOZmkXDi762wRY9TdnSN'
})


Vue.use(VueAxiosPlugin, {
  
  
  // 请求拦截处理
  reqHandleFunc: config => {
    //判断是否登录
    
  //  if( localStorage.getItem('kaoa_token')) {
    const token = localStorage.getItem('kaoa_token')
   
    const id = JSON.parse(localStorage.getItem('kaoa_user_info'))?.id

    token && (config.headers['kaoa-app-token'] = token)
    
    id && (config.headers['kaoa-app-userid'] = id)

    token && (config.headers['kaoa-app-login'] = true)

    if (config.method === 'get' && token) {
      config.params = {
        "kaoa-app-token": token,
          ...config.params
      }
    }
   
    return config
  },
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
}),


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


if(!localStorage.kaoa_user_info) {
  router.replace('/login')
}

// VueAxiosPlugin.default.withCredentials = true
