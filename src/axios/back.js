// import store from '../store/index.js'
// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])
var empHandler = {
  list: function (vue, currentPage) {
    return new Promise((resolve, reject) => { // 雇员分页列表
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('currentPage', currentPage) /* 设置传递参数 */
      params.append('lineSize', 10) /* 设置传递参数 */
      params.append('column', 'ename') /* 设置传递参数 */
      params.append('keyword', '') /* 设置传递参数 */
      // params.append('token', store.state.token) // 传递token数据
      vue.$axios.get('/hr-endpoint/hr/endpoint/emp/list', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  remove: function (vue, empno) { // 根据雇员编号删除
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('empno', empno) /* 设置传递参数 */
      vue.$axios.delete('/hr-endpoint/hr/endpoint/emp/remove', { params: params }) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  add: function (vue, emp) { // 雇员增加
    return new Promise((resolve, reject) => {
      // var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('mid', mid) /* 设置传递参数 */
      // params.append('password', password) /* 设置传递参数 */
      vue.$axios.post('/hr-endpoint/hr/endpoint/emp/add', emp) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addPre: function (vue) { // 雇员添加前数据查询
    return new Promise((resolve, reject) => {
      vue.$axios.get('/hr-endpoint/hr/endpoint/emp/pre_add', {}) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  editPre: function (vue, empno) { // 雇员添加前数据查询
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('empno', empno) /* 设置传递参数 */
      vue.$axios.get('/hr-endpoint/hr/endpoint/emp/pre_edit', { params: params }) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  edit: function (vue, emp) { // 雇员增加
    return new Promise((resolve, reject) => {
      // var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('mid', mid) /* 设置传递参数 */
      // params.append('password', password) /* 设置传递参数 */
      vue.$axios.post('/hr-endpoint/hr/endpoint/emp/edit', emp) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
var deptHandler = {
  list: function (vue) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('token', store.state.token) // 传递token数据
      vue.$axios.get('/hr-endpoint/hr/endpoint/dept/list', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  mgr: function (vue, deptno, empno) {
    return new Promise((resolve, reject) => {
      var data = {'deptno': deptno, 'empno': empno} // 发送JSON数据
      vue.$axios.post('/hr-endpoint/hr/endpoint/dept/editMgr', data) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  remove: function (vue, deptno) { // 根据雇员编号删除
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('deptno', deptno) /* 设置传递参数 */
      vue.$axios.delete('/hr-endpoint/hr/endpoint/dept/remove', { params: params }) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  add: function (vue, dept) { // 雇员增加
    return new Promise((resolve, reject) => {
      // var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('mid', mid) /* 设置传递参数 */
      // params.append('password', password) /* 设置传递参数 */
      vue.$axios.post('/hr-endpoint/hr/endpoint/dept/add', dept) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  editPre: function (vue, deptno) { // 雇员添加前数据查询
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('deptno', deptno) /* 设置传递参数 */
      vue.$axios.get('/hr-endpoint/hr/endpoint/dept/get', { params: params }) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  edit: function (vue, dept) { // 雇员增加
    return new Promise((resolve, reject) => {
      // var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('mid', mid) /* 设置传递参数 */
      // params.append('password', password) /* 设置传递参数 */
      vue.$axios.post('/hr-endpoint/hr/endpoint/dept/edit', dept) // /api/problem.action
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
var ratingHandler = {
  list: function (vue) {
    return new Promise((resolve, reject) => {
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      // params.append('token', store.state.token) // 传递token数据
      vue.$axios.get('/hr-endpoint/hr/endpoint/rating/list', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
var memberHandler = {
  list: function (vue, currentPage) {
    return new Promise((resolve, reject) => { // 雇员分页列表
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('currentPage', currentPage) /* 设置传递参数 */
      params.append('lineSize', 10) /* 设置传递参数 */
      params.append('column', 'name') /* 设置传递参数 */
      params.append('keyword', '') /* 设置传递参数 */
      // params.append('token', store.state.token) // 传递token数据
      vue.$axios.get('/hr-endpoint/hr/endpoint/member/list', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  listRole: function (vue, mid) {
    return new Promise((resolve, reject) => { // 雇员分页列表
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('mid', mid) /* 设置传递参数 */
      vue.$axios.get('/hr-endpoint/hr/endpoint/role/list_member_role', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
var recordHandler = {
  list: function (vue, currentPage) {
    return new Promise((resolve, reject) => { // 雇员分页列表
      var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
      params.append('currentPage', currentPage) /* 设置传递参数 */
      params.append('lineSize', 5) /* 设置传递参数 */
      params.append('column', 'tab') /* 设置传递参数 */
      params.append('keyword', '') /* 设置传递参数 */
      // params.append('token', store.state.token) // 传递token数据
      vue.$axios.get('/hr-endpoint/hr/endpoint/record/list', {
        params: params
      })
        .then(response => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default { // 所有可以导出使用的方法都必须在此处定义
  emp: empHandler,
  dept: deptHandler,
  rating: ratingHandler,
  member: memberHandler,
  record: recordHandler
}
