export default {
  name: state => state.name, // lambda简化写法
  apikey: state => state.apikey, // lambda简化写法
  privilege: function (state) {
    return state.privilege
  },
  token: state => state.token, // 返回token信息
  mid: state => state.mid, // 返回token登录信息
  headerName: state => state.headerName
}
