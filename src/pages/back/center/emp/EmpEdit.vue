<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="user-plus" />&nbsp;编辑雇员信息
    </div>
    <div class="block-line">&nbsp;</div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules"
      label-position="right" size="small" :inline-message="true">
      <el-form-item label="雇员编号：" :sm="5" prop="empno">
        <el-col :sm="16">
          <el-input v-model="form.empno" placeholder="请输入新入职雇员编号" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="雇员姓名：" :sm="3" prop="ename">
        <el-col :sm="16">
          <el-input v-model="form.ename" placeholder="请输入新入职雇员姓名" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="雇员等级：" :sm="3" prop="rtid">
        <el-col :sm="16" class="text-left">
          <el-select v-model="form.rtid" placeholder="请选择雇员等级" style="width:100%">
            <el-option v-for="rating in ratingData" :key="rating.rtid"
              :label="rating.name" :value="rating.rtid"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属部门：" :sm="3" prop="deptno">
        <el-col :sm="16" class="text-left">
          <el-select v-model="form.deptno" placeholder="请选择雇员所属部门" style="width:100%">
            <el-option v-for="dept in deptData" :key="dept.deptno"
              :label="dept.dname" :value="dept.deptno"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="雇员工资：" :sm="3" prop="sal">
        <el-col :sm="16">
          <el-input v-model="form.sal" placeholder="请输入雇员工资" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="雇员职位：" :sm="3" prop="job">
        <el-col :sm="16">
          <el-input v-model="form.job" placeholder="请输入雇员职位" suffix-icon="el-icon-s-custom"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :sm="16">
          <el-button type="primary" @click="submitForm">更新</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      deptData: [], // 商品分类信息
      ratingData: [], // 商品子分类信息
      form: {
        empno: 0, // 雇员编号
        ename: '', // 雇员姓名
        deptno: 0, // 部门编号
        rtid: '', // 雇员等级
        sal: 0.0, // 基本工资
        job: '' // 雇员职位
      },
      rules: {
        empno: [
          { required: true, message: '请输入雇员编号', trigger: 'blur' }
        ],
        ename: [
          { required: true, message: '请输入雇员姓名', trigger: 'blur' },
          { min: 2, max: 50, message: '雇员姓名长度在2到50个字符', trigger: 'blur' }
        ],
        deptno: [
          { required: true, message: '请选择雇员所属部门', trigger: 'blur' }
        ],
        rtid: [
          { required: true, message: '请选择雇员级别', trigger: 'blur' }
        ],
        sal: [
          { required: true, message: '请输入雇员工资', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入雇员职位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    submitForm () { // 【开发】进行远程数据增加
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$back.emp.edit(this, this.form).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
            }
            const h = this.$createElement
            if (res.result.status === 1000) {
              this.$notify({
                title: '雇员更新成功',
                message: h('i', {style: 'color: teal'}, '雇员信息已成功修改。')
              })
              this.$router.push('/back/center/emp/list').catch(err => err)
            } else {
              this.$notify({
                title: '雇员更新失败',
                message: h('i', {style: 'color: error'}, res.result.message)
              })
            }
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
        empno: 0, // 雇员编号
        ename: '', // 雇员姓名
        deptno: 0, // 部门编号
        rtid: '', // 雇员等级
        sal: 0.0, // 基本工资
        job: '' // 雇员职位
      }
      this.$refs['form'].resetFields()
    },
    loadEmpData () { // 【开发】分页数据加载操作
      var empno = this.$route.params.empno
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.emp.editPre(this, empno).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
            }
            this.deptData = res.result.depts // 更新数据
            this.ratingData = res.result.ratings // 更新数据
            this.form.empno = res.result.emp.empno
            this.form.ename = res.result.emp.ename
            this.form.deptno = res.result.emp.deptno
            this.form.rtid = res.result.emp.rtid
            this.form.deptno = res.result.emp.deptno
            this.form.sal = res.result.emp.sal
            this.form.job = res.result.emp.job
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  computed: {
    ...mapGetters(['apikey'])
  },
  mounted () {
    this.loadEmpData() // 加载用户数据信息
  }
}
</script>
