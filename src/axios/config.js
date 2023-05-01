import axios from 'axios'
import store from '../store/index.js'
axios.defaults.baseURL = '/' /* 定义一个全局路径  */
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' /* 全局mime  */
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common['token'] = store.state.token /* 定义全局token */
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log('【Axios-Interceptor】' + axios.defaults.headers.common['token'])
    axios.defaults.headers.common['token'] = store.state.token /* 定义全局token */
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default axios
