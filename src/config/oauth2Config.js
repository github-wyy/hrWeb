var config = {
  baseOAuthUrl: 'http://oauth-server:8080/',
  userAuthorizationUri: 'http://oauth-server:8080/oauth2/authorize', // 请求授权地址
  accessTokenUri: '/oauth2Api/oauth2/accessToken', // accessToken请求地址
  userInfoUri: '/oauth2Api/oauth2/resource', // 用户信息请求地址
  logoutUri: 'http://oauth-server:8080/logout', // 登出请求地址
  localuri: 'http://localhost:9999', // 项目地址
  redirect_uri: 'http://localhost:9999/front/oauth2/login', // 案例资源服务器地址
  resUri: 'http://localhost:8080', // 客户端相关标识，请从认证服务器申请
  clientId: 'client000111',
  client_secret: '2EF93F5CB1D2E8DE4C2BCD419F3D5CF8',
  scope: 'webapp', // 申请的权限范围
  state: '', // 可选参数，客户端的当前状态，可以指定任意值，用于校验
  response_type: 'code', // 一些固定的请求参数
  grant_type: 'authorization_code',
  code: ''
}

export default config
