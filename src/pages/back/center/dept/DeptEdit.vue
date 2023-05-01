<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="th-large" />&nbsp;编辑部门信息
    </div>
    <div class="block-line">&nbsp;</div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules"
      label-position="right" size="small" :inline-message="true">
      <el-form-item label="部门编号：" :sm="5" prop="deptno">
        <el-col :sm="16">
          <el-input v-model="form.deptno" placeholder="请输入新部门编号" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="部门名称：" :sm="3" prop="dname">
        <el-col :sm="16">
          <el-input v-model="form.dname" placeholder="请输入新部门名称" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="雇员上限：" :sm="3" prop="bound">
        <el-col :sm="16">
          <el-input v-model="form.bound" placeholder="请输入部门员工上限" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :sm="16">
          <el-button type="primary" @click="submitForm">编辑</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        deptno: 0, // 部门编号
        dname: '', // 部门名称
        bound: 0 // 部门上限
      },
      rules: {
        deptno: [
          { required: true, message: '请输入部门编号', trigger: 'blur' }
        ],
        dname: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 50, message: '雇员姓名长度在2到50个字符', trigger: 'blur' }
        ],
        bound: [
          { required: true, message: '请输入部门雇员人数上限', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    submitForm () { // 【开发】进行远程数据增加
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            setTimeout(() => {
              this.$back.dept.edit(this, this.form).then(res => { // 加载新闻数据信息
                console.log(res)
                if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
                  this.refreshToken(res.token) // 刷新token
                }
                const h = this.$createElement
                if (res.result.status === 1000) {
                  this.$notify({
                    title: '部门更新成功',
                    message: h('i', {style: 'color: teal'}, '新部门已经成功更新')
                  })
                  this.$router.push('/back/center/dept/list').catch(err => err)
                } else {
                  this.$notify({
                    title: '部门更新失败',
                    message: h('i', {style: 'color: error'}, res.result.message)
                  })
                }
              })
              loadingInstance.close()
            }, 100)
          })
          console.log('表单提交成功，等待数据处理！')
        } else {
          console.log('错误，表单验证失败，无法提交！')
          return false
        }
      })
    },
    resetForm () {
      this.form = {
        empno: '', // 雇员编号
        ename: 0.0, // 雇员姓名
        deptno: '', // 部门编号
        rtid: '', // 雇员等级
        sal: '', // 基本工资
        job: '' // 雇员职位
      }
      this.$refs['form'].resetFields()
    },
    loadDeptData () { // 【开发】分页数据加载操作
      var deptno = this.$route.params.deptno
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.dept.editPre(this, deptno).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
            }
            this.form.deptno = res.result.deptno
            this.form.dname = res.result.dname
            this.form.bound = res.result.bound
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadDeptData() // 加载部门数据
  }
}
</script>
