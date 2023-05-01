// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' // 引入ElementUI/index.js
import yootk from '@/assets/js/yootk'
import frontApi from './axios/frontApi'
import '@/assets/css/style.css'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import store from './store' /* 引入store，设置目录自动找到index.js */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import SIdentify from './components/Identify'
import axios from './axios/config'
import oauth2Config from './config/oauth2Config'
import oauth2 from './axios/oauth2'
import querystring from 'querystring'
import member from './axios/member.js'
import back from './axios/back.js'

Vue.prototype.$member = member // 追加member配置
Vue.prototype.$back = back // 追加member配置
Vue.prototype.$axios = axios /* 追加一个全局配置，避免重复的导入定义  */
Vue.prototype.$oauth2Config = oauth2Config // 追加oAuth2配置
Vue.prototype.$querystring = querystring // 追加地址参数获取组件
Vue.prototype.$oauthlogin = oauth2
Vue.component('SIdentify', SIdentify)
library.add(fas, far, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.use(ElementUI)
Vue.use(yootk)
Vue.prototype.$yootk = yootk
Vue.prototype.$frontApi = frontApi
// if (process.env.MOCK) { // 判断是否为mock模式
// require('./mock/index.js')
// }

Vue.config.productionTip = false
router.beforeEach((to, from, next) => { // 添加页面标题
  if (to.meta.title) { /* 路由发生变化修改页面title */
    document.title = to.meta.title
    document.keyword = to.meta.keyword
    document.description = to.meta.description
  }
  if (to.path.startsWith('/back')) {
    try {
      if (store.state.token === '') {
        document.title = '非法用户状态，无法访问！'
        next('/front/login') // 跳转到登录页
      }
    } catch (e) {
      next('/front/login') // 跳转到登录页
    }
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, /* 使用store */
  components: { App },
  template: '<App/>'
})
