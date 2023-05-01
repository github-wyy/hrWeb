<template>
  <div>
    <el-row>
      <el-col :sm="6"><img src="/static/images/yootk.png" style="width:200px;"/></el-col>
      <el-col :sm="18">
        <el-row>
          <el-col :sm="24" class="text-left title ">
            <font-awesome-icon icon="american-sign-language-interpreting"/>&nbsp;OAuth登录成功
            <div class="block-line">&nbsp;</div>
            <el-row>
              <el-col :sm="6" class="message-name"><strong><font-awesome-icon icon="circle" />&nbsp;用户名：</strong></el-col>
              <el-col :sm="18" class="message-value">{{result.principal.mid}}</el-col>
            </el-row>
            <el-row>
              <el-col :sm="6" class="message-name"><strong><font-awesome-icon icon="circle" />&nbsp;域名：</strong></el-col>
              <el-col :sm="18" class="message-value">{{result.principal.name}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'OAuthUser',
  data () {
    return {
      result: {}
    }
  },
  methods: {
    checkLogin: function () {
      return this.$oauthlogin.login.checkLogin(this)
    },
    getUserInfo: function () {
      var tokenInfo = this.$oauthlogin.token.loadTokenData()
      this.$oauthlogin.userInfo.getUserInfo(this, tokenInfo).then(res => {
        console.log(res)
        this.result = res
      })
    }
  },
  mounted: function () {
    if (this.checkLogin()) {
      this.getUserInfo()
    } else {
      this.login()
    }
  }
}
</script>
