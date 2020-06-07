import 'babel-polyfill'/* 转码 */
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import 'style/style/index.styl'
/* 移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。 */
import fastclick from 'fastclick'
//引入懒加载
import VueLazyload from 'vue-lazyload'

//引入vuex
import store from './store'
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading:require("style/image/default.png")
})

Vue.config.productionTip = false

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
