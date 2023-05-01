<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
          @select="handleSelect" background-color="#545c64" text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-menu-item index="0"><img src="/static/images/muyan_yootk.png" style="width:160px;"/></el-menu-item> -->
          <el-menu-item index="1"><font-awesome-icon icon="home" />&nbsp;首页</el-menu-item>
          <el-menu-item index="2"><font-awesome-icon icon="users" />&nbsp;人事管理</el-menu-item>
          <el-menu-item index="3" v-if="mid == ''"><font-awesome-icon icon="deaf" />&nbsp;登录</el-menu-item>
          <el-menu-item index="8" v-if="mid != ''"><font-awesome-icon icon="user-secret" />&nbsp;注销</el-menu-item>
<!--          <el-menu-item index="9">
            <el-input v-model="keyword" placeholder="搜索关键字..." @keyup.enter.native="handleSearch" style="width:150px;"></el-input>
            <el-button type="danger" icon="el-icon-search" @click="handleSearch">检索</el-button>
          </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view :key="key" v-if="isRouterAlive"/>
        </transition>
      </el-main>
      <div class="block-line">&nbsp;</div>
      <el-footer class="footer">
        <el-row>
          <el-col :sm="6">
            <a href="" target="_blank">
              <img src="/static/images/logo.png" style="width:200px;">
            </a>
          </el-col>
          <el-col :sm="18">
            <el-divider content-position="right">
              <strong><i class="el-icon-s-flag"></i>&nbsp;HR-管理系统</strong>
            </el-divider>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '2',
      keyword: '',
      isRouterAlive: true // 防止父路由刷新操作
    }
  },
  methods: {
    ...mapActions(['logout', 'check']),
    handleSearch () {
      this.$router.push('/front/search/' + this.keyword).catch(err => err)
    },
    handleSelect (id) {
      switch (id) {
        case '0':
          window.open('http://www.baidu.com', '_blank')
          break
        case '1':
          this.activeIndex = '1'
          this.$router.push('/front/index').catch(err => err)
          // this.$router.push({name: 'IndexContent'}).catch(err => err)
          break
        case '2':
          this.activeIndex = '2'
          this.$router.push('/back/center/main').catch(err => err)
          // this.$router.push({name: 'IndexContent'}).catch(err => err)
          break
        case '3':
          this.activeIndex = '3'
          this.$router.push('/front/login').catch(err => err)
          break
        case '8':
          this.activeIndex = '8'
          this.logout() // 系统注销
          this.$router.push('/front/logout').catch(err => err)
          break
      }
    }
  },
  computed: {
    ...mapGetters(['mid', 'privilege', 'photo']),
    key: function () { // 每一次通过计算得到不同的一个标记内容
      return this.$route.path.replace(/\//, '_') + this.$route.activeMenuName
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.number-text {
  font-size: 50px;
  color: red;
}
</style>
