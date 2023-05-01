<template>
  <div>
    <h1>OAuth登录成功</h1>
  </div>
</template>
<script>
export default {
  name: 'OAuthLogin',
  data () {
    return {
      state: '',
      code: ''
    }
  },
  methods: {
    getToken: function () {
      this.$oauthlogin.token.getTokenFromService(this, this.code, (response) => {
        this.$oauthlogin.token.savetoken(response.data)
        this.$router.push('/front/oauth2/user')
      }, function (error) {
        alert(error)
      })
    }
  },
  mounted: function () {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    this.getToken()
  }
}
</script>
