import axios from './config'
function echoHandler (messageData) {
  return new Promise((resolve, reject) => {
    var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
    params.append('title', messageData.title) /* 设置传递参数 */
    params.append('pubdate', messageData.pubdate) /* 设置传递参数 */
    params.append('content', messageData.content) /* 设置传递参数  */
    axios.post('/messageApi/message/echo', params) // /api/problem.action
      .then(response => {
        resolve(response.data) // 返回处理结果
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default { // 所有可以导出使用的方法都必须在此处定义
  echoHandler // 直接编写函数名称就表示导出当前函数
}
