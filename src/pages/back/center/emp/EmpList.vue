<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="user-circle" />&nbsp;雇员列表
    </div>
    <div class="block-line">&nbsp;</div>
    <el-table :data="empData" border style="width: 100%">
      <el-table-column prop="empno" label="雇员编号" width="180"></el-table-column>
      <el-table-column prop="ename" label="姓名" width="180"></el-table-column>
      <el-table-column prop="rtid" label="等级" width="180"></el-table-column>
      <el-table-column prop="hiredate" label="雇佣日期" width="180"></el-table-column>
      <el-table-column prop="sal" label="工资" width="120"></el-table-column>
      <el-table-column prop="job" label="职位" width="180"></el-table-column>
      <el-table-column prop="deptno" label="部门编号" width="80"></el-table-column>
      <el-table-column label="操作" width="350px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.empno)">
           <font-awesome-icon icon="edit" />&nbsp;修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
           <i class="el-icon-delete"></i>&nbsp;删除</el-button>
           <el-button size="mini" type="warning" @click="handleMgr(scope.row)">
            <i class="el-icon-s-check"></i>&nbsp;设定部门领导</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block-line">&nbsp;</div>
    <div class="text-right"><el-pagination background layout="prev, pager, next" :total="totalPage"
      :current-page.sync="currentPage" @current-change="loadEmpData"></el-pagination></div>
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
      empData: []
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    showDetails (item) {
      console.log(item)
      this.detailsDialogVisible = true
    },
    handleEdit (id) { // 修改新闻信息
      this.$router.push('/back/center/emp/edit/' + id).catch(err => err)
    },
    handleDelete (item) { // 【开发】新闻数据删除
      this.$confirm('确定要删除该雇员吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loadingInstance = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          setTimeout(() => {
            this.$back.emp.remove(this, item.empno).then(res => { // 加载新闻数据信息
              if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
                this.refreshToken(res.token) // 刷新token
              }
              if (res.result.status === 1000) {
                this.$message({
                  type: 'success',
                  message: res.result.message
                })
                for (var ind in this.empData) { // JSON循环
                  if (this.empData[ind].empno === item.empno) {
                    this.empData.splice(ind, 1) // 删除指定索引数组
                  }
                }
              } else {
                this.$message({
                  type: 'error',
                  message: res.result.message
                })
              }
            })
            loadingInstance.close()
          }, 100)
        })
      }).catch(() => {})
    },
    handleMgr (item) { // 【开发】设置部门领导
      this.$confirm('确定要将该雇员设置为部门领导吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let loadingInstance = Loading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          setTimeout(() => {
            this.$back.dept.mgr(this, item.deptno, item.empno).then(res => { // 加载新闻数据信息
              if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
                this.refreshToken(res.token) // 刷新token
              }
              if (res.result.status === 1000) {
                this.$message({
                  type: 'success',
                  message: res.result.message
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.result.message
                })
              }
            })
            loadingInstance.close()
          }, 100)
        })
      }).catch(() => {})
    },
    loadEmpData () { // 【开发】分页数据加载操作
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.emp.list(this, this.currentPage).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              this.empData = res.result.data // 更新数据
              this.totalPage = res.result.totalPage // 获取总页数
            }
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadEmpData() // 加载用户数据信息
  }
}
</script>
