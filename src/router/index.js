import Vue from 'vue' // 所有VueRouter的配置都必须在Vue之中
import Router from 'vue-router' // 导入Vue-Router组件
import Common from './common' // 导入本目录下的“common.js”配置
import Front from './front' // 导入本目录下的“front.js”配置
import Back from './back' // 导入本目录下的“front.js”配置

Vue.use(Router) // 在当前的Vue程序里面使用路由
export default new Router({ // 配置路由的路径导出操作
  mode: 'history', // 解决路径中存在有“/#/”的问题
  routes: [ // 定义所有要使用的外部扩展路游
    ...Common, // es6数组扩展符
    ...Front, // es6数组扩展符
    ...Back // es6数组扩展符
  ]
})
