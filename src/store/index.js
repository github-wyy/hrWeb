import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'/*  必须有“./” */
import actions from './actions.js'/*  必须有“./” */
import mutations from './mutations.js'/*  必须有“./” */
import state from './state.js'
import persistedState from 'vuex-persistedstate' // 持久化组件
Vue.use(Vuex)
const store = new Vuex.Store({/*  设置对外导出配置 */
  state, /*  导出state状态 */
  getters,
  actions,
  mutations,
  plugins: [persistedState({
    storage: window.sessionStorage // 使用session存储方式进行本地化数据存储
  })] /* 配置插件 */
})
export default store /*  只允许导出一个对象 */
