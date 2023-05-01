<template>
  <div>
    <el-row :gutter="30">
      <el-col :sm="6"><img src="/static/images/yootk.png" style="width:200px;"/></el-col>
      <el-col :sm="18">
        <el-row>
          <el-col :sm="24" class="text-left title ">
            <i class="el-icon-s-custom"></i>&nbsp;用户登录
            <div class="block-line">&nbsp;</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules"
          label-position="right" size="small" :inline-message="true">
          <el-form-item label="用户名：" :sm="3" prop="mid">
            <el-col :sm="15">
              <el-input v-model="form.mid" placeholder="请输入登录ID" suffix-icon="el-icon-s-custom"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码：" :sm="3" prop="password">
            <el-col :sm="15">
              <el-input v-model="form.password" placeholder="请输入登录密码" clearable show-password suffix-icon="el-icon-edit"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="验证码：" :sm="3" prop="code" :error="errors.code">
            <el-col :sm="12">
              <el-input v-model="form.code" placeholder="请输入验证码" clearable size="4" maxlength="4" suffix-icon="el-icon-picture"></el-input>
            </el-col>
            <el-col :sm="3">
              <div @click="refreshCode">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :sm="16">
              <el-button type="primary" @click="submitForm">登录</el-button>
              <el-button type="warning" @click="resetForm">重置</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    var checkCode = (rule, value, callback) => {
      // console.log('生成验证码：' + this.identifyCode + '、输入验证码：' + value)
      if (value.toUpperCase() !== this.identifyCode.toUpperCase()) { // 验证码匹配
        this.form.code = '' // 清空已输入验证码
        this.refreshCode() // 刷新验证码
        callback(new Error('验证码输入错误，请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      identifyCodes: 'abcdefghijkmnpqrstuvwxy123456789',
      identifyCode: '',
      form: {
        mid: '',
        password: '',
        code: ''
      },
      errors: {
        code: ''
      },
      rules: {
        mid: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在5到15个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['jwt', 'getToken']), // 导入了VueX中提供的数据处理函数
    randomNum (min, max) { // 随机生成验证码数据
      return Math.floor(Math.random() * (max - min) + min)
    },
    oauthLogin () {
      this.$oauthlogin.login.login(this)
    },
    refreshCode () { // 刷新验证码
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) { // 创建验证码
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) { // 表单通过验证
          // 【开发】登录完成后传递用户信息，但是每一次只能够传递一个参数，所以使用json结构保存
          this.$member.login.login(this, this.form.mid, this.form.password)
            .then(res => {
              this.jwt(res) // 保存登录成功后的用户名
              const h = this.$createElement
              if (this.token !== '') { // 判断当前是否存在有token，以确定最终登录状态
                this.$notify({
                  title: '登录成功',
                  message: h('i', {style: 'color: teal'}, '用户登录成功，欢迎' + this.form.mid + '访问！')
                })
                this.$router.push('/front/index').catch(err => err)
              } else {
                this.refreshCode() // 刷新验证码
                this.$notify({
                  title: '登录失败',
                  message: h('i', {style: 'color: error'}, '用户登录失败，错误的用户名或密码！')
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
      console.log(this.errors)
      this.form = {
        mid: '',
        password: ''
      }
      this.$refs['form'].resetFields()
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  computed: {
    ...mapGetters(['token'])
  }
}
</script>
<style scoped>
.code {
  margin: 400px auto;
  width: 114px;
  height: 40px;
  border: 1px solid red;
}
</style>
