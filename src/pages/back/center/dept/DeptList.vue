<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="th-large" />&nbsp;部门列表
    </div>
    <div class="block-line">&nbsp;</div>
    <el-table :data="deptData" border style="width: 100%">
      <el-table-column prop="deptno" label="部门编号" width="180"></el-table-column>
      <el-table-column prop="dname" label="名称" width="180"></el-table-column>
      <el-table-column prop="bound" label="人员上限" width="180"></el-table-column>
      <el-table-column prop="current" label="当前部门人数" width="180"></el-table-column>
      <el-table-column prop="mname" label="部门领导" width="180"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row.deptno)">
           <font-awesome-icon icon="edit" />&nbsp;修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
           <i class="el-icon-delete"></i>&nbsp;删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      detailsDialogVisible: false,
      deptData: []
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    showDetails (item) {
      console.log(item)
      this.detailsDialogVisible = true
    },
    handleEdit (id) { // 修改新闻信息
      this.$router.push('/back/center/dept/edit/' + id).catch(err => err)
    },
    handleDelete (item) { // 【开发】新闻数据删除
      this.$confirm('确定要删除该部门吗？', '提示', {
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
            this.$back.dept.remove(this, item.deptno).then(res => { // 加载新闻数据信息
              if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
                this.refreshToken(res.token) // 刷新token
              }
              if (res.result.status === 1000) {
                this.$message({
                  type: 'success',
                  message: res.result.message
                })
                for (var ind in this.deptData) { // JSON循环
                  if (this.deptData[ind].deptno === item.deptno) {
                    this.deptData.splice(ind, 1) // 删除指定索引数组
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
    loadDeptData () { // 【开发】分页数据加载操作
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.dept.list(this).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              this.deptData = res.result // 更新数据
            }
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadDeptData() // 加载用户数据信息
  }
}
</script>
