<template>
  <div>
    <el-row>
      <el-col :span="4">
        <h3><font-awesome-icon :icon="icon" />&nbsp;{{sysName}}</h3>
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
          @open="handleOpen" @close="handleClose" @select="handleSelect"
          unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in menuItems">
            <el-submenu :index="item.index" v-if="!item.leaf && isShow(item.index)" :key="index">
              <template slot="title"><font-awesome-icon :icon="item.icon" />&nbsp;&nbsp;{{item.title}}</template>
              <el-menu-item v-for="(child, childIndex) in item.subItems" :index="child.index" :key="childIndex">
                <font-awesome-icon :icon="child.icon" />&nbsp;&nbsp;{{child.title}}
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <keep-alive><router-view/></keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      sysName: '人事管理',
      icon: 'users',
      collapsed: false,
      activeIndex: '2',
      menuItems: [
        {
          index: 'emp',
          title: '雇员管理',
          icon: 'user-circle',
          subItems: [
            {
              index: '/back/center/emp/list',
              title: '雇员列表',
              icon: 'list-ul'
            },
            {
              index: '/back/center/emp/add',
              title: '增加雇员',
              icon: 'user-plus'
            }
          ]
        },
        {
          index: 'dept',
          title: '部门管理',
          icon: 'th-large',
          subItems: [
            {
              index: '/back/center/dept/list',
              title: '部门列表',
              icon: 'list-alt'
            },
            {
              index: '/back/center/dept/add',
              title: '创立部门',
              icon: 'plus'
            }
          ]
        },
        {
          index: 'rating',
          title: '薪酬管理',
          icon: 'globe',
          subItems: [
            {
              index: '/back/center/rating/list',
              title: '薪酬列表',
              icon: 'tasks'
            }
          ]
        },
        {
          index: 'member',
          title: '用户管理',
          icon: 'user',
          subItems: [
            {
              index: '/back/center/member/list',
              title: '用户列表',
              icon: 'list'
            }
          ]
        },
        {
          index: 'record',
          title: '操作日志',
          icon: 'film',
          subItems: [
            {
              index: '/back/center/record/list',
              title: '更新日志',
              icon: 'list'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleOpen () {
    },
    handleClose () {
    },
    handleSelect: function (a, b) {
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    },
    isShow: function (role) {
      for (var r in this.privilege.roles) {
        if (role === this.privilege.roles[r]) { // 包含指定角色
          return true
        }
      }
      return false
    }
  },
  computed: {
    ...mapGetters(['mid', 'privilege']),
    key: function () { // 每一次通过计算得到不同的一个标记内容
      return this.$route.path.replace(/\//, '_') + this.$route.activeMenuName
    }
  }
}
</script>
