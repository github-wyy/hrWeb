import * as Types from './mutation-types' /* 必须有“./” */
export default {
  [Types.USER_LOGIN] (state, data) {
    if (data.mid) { // 保存了mid
      state.mid = data.mid // 保存mid
      state.name = data.name // 保存用户姓名
      state.privilege = data.privilege // 保存用户权限
    }
  },
  [Types.USER_LOGOUT] (state) { // 用户注销
    state.token = '' // 删除已有的token
    state.mid = '' // 删除已有的mid
    state.name = '' // 删除姓名
    state.privilege = {} // 删除已有权限
  },
  [Types.CHECK_LOGIN] (state) {
    return state.mid !== '' || state.mid.length() > 0
  },
  [Types.JWT_TOKEN] (state, loginData) {
    if (loginData.code === 200) { // 根据服务端返回的状态码判断登录结果
      state.token = loginData.token // 保存token
      state.mid = loginData.result.mid // 保存用户id
      state.name = loginData.result.name // 保存用户姓名
      state.privilege = {'roles': loginData.result.roles, 'actions': loginData.result.actions} // 保存用户授权信息
    }
  },
  [Types.GET_TOKEN] (state) {
    return state.token // 返回当前的Token数据
  },
  [Types.REFRESH_TOKEN] (state, token) {
    state.token = token // 更新token
  }
}
