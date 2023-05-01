var loginHandle = {
  login: function (vue, mid, password) {
    return new Promise((resolve, reject) => {
      var data = {'mid': mid, 'password': password} // 发送JSON数据
      vue.$axios.post('/hr-endpoint/hr/endpoint/member/login', data) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default {
  login: loginHandle
}
