var loginUtil = {
  login: function (vue) {
    vue.$oauth2Config.code = vue.$yootk.randomeNum(4)
    var authorUrl = vue.$oauth2Config.userAuthorizationUri
    authorUrl = authorUrl + ('?' + vue.$querystring.stringify({
      client_id: vue.$oauth2Config.clientId,
      response_type: vue.$oauth2Config.response_type,
      scope: vue.$oauth2Config.scope,
      state: vue.$oauth2Config.state,
      redirect_uri: vue.$oauth2Config.redirect_uri
    }))
    window.location.href = authorUrl
  },
  logout: function (vue, returnUrl) {
    vue.$router.push('/logout' + '?return_url=' + returnUrl)
  },
  checkLogin: function (vue) {
    var tokenInfo = vue.$oauthlogin.token.loadTokenData()
    if (tokenInfo.access_token === null || tokenInfo.access_token === 'null') {
      return false
    }
    return true
  }
}
var tokenUtil = {
  savetoken: function (token) {
    sessionStorage.setItem('access_token', token.access_token)
    sessionStorage.setItem('enabled', token.enabled)
    sessionStorage.setItem('expires_in', token.expires_in)
    sessionStorage.setItem('refresh_token', token.refresh_token)
    sessionStorage.setItem('token_type', token.token_type)
    sessionStorage.setItem('scope', token.token_type)
  },
  getTokenFromService: function (vue, code, callback, error) {
    var params = new URLSearchParams() /* 必须使用此方式进行数据传递  */
    params.append('client_id', vue.$oauth2Config.clientId) /* 设置传递参数 */
    params.append('client_secret', vue.$oauth2Config.client_secret) /* 设置传递参数 */
    params.append('code', code) /* 设置传递参数 */
    params.append('redirect_uri', vue.$oauth2Config.redirect_uri)
    params.append('grant_type', vue.$oauth2Config.grant_type)
    vue.$axios.post(vue.$oauth2Config.accessTokenUri, params)
      .then(callback)
      .catch(error)
  },
  loadTokenData: function () {
    let tokenInfo = {}
    tokenInfo.access_token = sessionStorage.getItem('access_token')
    tokenInfo.enabled = sessionStorage.getItem('enabled')
    tokenInfo.expires_in = sessionStorage.getItem('expires_in')
    tokenInfo.refresh_token = sessionStorage.getItem('refresh_token')
    tokenInfo.token_type = sessionStorage.getItem('token_type')
    return tokenInfo
  }
}
var infoUtil = {
  getUserInfo: function (vue, tokenInfo) {
    return new Promise((resolve, reject) => {
      vue.$axios({
        url: vue.$oauth2Config.userInfoUri + '?' + 'access_token=' + tokenInfo.access_token,
        headers: {'Accept': 'application/json'}
      })
        .then((response) => {
          resolve(response.data) // 返回处理结果
        })
        .catch((error) => {
          alert(error)
        })
    })
  }
}
export default {
  token: tokenUtil,
  login: loginUtil,
  userInfo: infoUtil
}
