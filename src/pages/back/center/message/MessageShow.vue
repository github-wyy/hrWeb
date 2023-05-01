<template>
  <div>
    <el-row>
      <el-col :sm="5">
        <el-button type="primary" @click="loadData">
          <font-awesome-icon icon="rocket"/>&nbsp;加载数据</el-button>
      </el-col>
    </el-row>
    <el-dialog title="信息提示" :visible.sync="dialogVisible" width="30%">
      <template slot="title">
        <div class="dialog-title message-title">
          <font-awesome-icon icon="server" />&nbsp;接收到服务器响应信息
        </div>
      </template>
      <span>{{result}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      result: '',
      dialogVisible: false
    }
  },
  methods: {
    loadData () {
      this.$jwt.message.echo(this, 'HR管理系统')
        .then(res => {
          this.result = res
          this.dialogVisible = true // 显示对话框
        })
    }
  },
  mounted () { // 页面挂载的时候通过远程服务器获取要展示的数据内容
  }
}
</script>
<style scoped>
</style>
