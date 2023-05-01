<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="user-circle" />&nbsp;雇员列表
    </div>
    <div class="block-line">&nbsp;</div>
    <el-table :data="memberData" border style="width: 100%">
      <el-table-column prop="mid" label="雇员编号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="flag" label="管理等级" width="150"
        :filters="[{ text: '普通用户', value: 0 }, { text: '超级管理员', value: 1 }]" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag style="cursor:pointer;" :type="scope.row.flag === 0 ? 'success' : 'danger'"
            disable-transitions @click="loadMemberRole(scope.row.mid)">{{showFlagText(scope.row.flag)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roles" label="角色" width="800">
        <template slot-scope="scope">
          <el-tooltip placement="top" v-for="(role, index) in scope.row.roles" :key="index">
            <div slot="content">{{role.note}}</div>
            <el-button>{{role.name}}</el-button>&nbsp;
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="block-line">&nbsp;</div>
    <div class="text-right"><el-pagination background layout="prev, pager, next" :total="totalPage"
      :current-page.sync="currentPage" @current-change="loadMemberData"></el-pagination></div>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      detailsDialogVisible: false,
      currentPage: 1,
      totalPage: 200,
      memberData: []
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    showFlagText (val) {
      if (val === 0) {
        return '普通用户'
      } else {
        return '超级管理员'
      }
    },
    loadMemberRole (mid) { // 查看用户角色信息
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.member.listRole(this, mid).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              for (var ind in this.memberData) { // JSON循环
                if (this.memberData[ind].mid === mid) {
                  // this.memberData[ind].push({'roles': res.result}) // 保存用户角色
                  this.memberData[ind].roles = res.result
                  // console.log(this.memberData[ind])
                  console.log(res.result)
                }
              }
            }
          })
          loadingInstance.close()
        }, 100)
      })
    },
    loadMemberData () { // 【开发】分页数据加载操作
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.member.list(this, this.currentPage).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              this.memberData = res.result.data // 更新数据
              this.totalPage = res.result.totalPage // 获取总页数
            }
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadMemberData() // 加载用户数据信息
  },
  computed: {
    key: function () { // 每一次通过计算得到不同的一个标记内容
      return this.$route.path.replace(/\//, '_') + this.$route.activeMenuName
    }
  }
}
</script>
