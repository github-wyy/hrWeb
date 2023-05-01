<template>
  <div>
    <el-row :gutter="30">
      <el-col :sm="24">
        <el-row>
          <el-col :sm="24" class="text-left title ">
            <i class="el-icon-message"></i>&nbsp;信息交互
            <div class="block-line">&nbsp;</div>
          </el-col>
        </el-row>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules"
          label-position="right" size="small" :inline-message="true">
          <el-form-item label="消息标题" :sm="4" prop="title">
            <el-col :sm="20" style="text-align:left;">
              <el-input v-model="form.title" placeholder="请输入消息标题" suffix-icon="el-icon-info"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="发布日期" :sm="4" prop="pubdate">
            <el-col :sm="20" style="text-align:left;">
              <el-date-picker v-model="form.pubdate" placeholder="请选择发布日期" style="width:100%;" format="yyyy-MM-dd" type="date"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="消息内容" :sm="4" prop="content">
          <el-col :sm="20" style="text-align:left;">
            <editor v-model="form.content" :api-key="apikey" :init="init"/>
          </el-col>
        </el-form-item>
          <el-form-item>
            <el-col :sm="16">
              <el-button type="primary" @click="submitForm">发布</el-button>
              <el-button type="warning" @click="resetForm">重置</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="消息回应" :visible.sync="dialogVisible" width="70%">
      <template slot="title">
        <div class="dialog-title message-title">
          <font-awesome-icon icon="server" />&nbsp;接收到服务器响应信息
        </div>
      </template>
      <div>
        <el-row>
          <el-col :sm="18">
            <el-row>
              <el-col :sm="6" class="message-name"><font-awesome-icon icon="tag" />&nbsp;回应消息标题：</el-col>
              <el-col :sm="18" class="message-value">{{result.title}}</el-col>
            </el-row>
            <div class="block-line"/>
            <el-row>
              <el-col :sm="6" class="message-name"><font-awesome-icon icon="calculator" />&nbsp;回应消息日期：</el-col>
              <el-col :sm="18" class="message-value">{{result.pubdate}}</el-col>
            </el-row>
            <div class="block-line"/>
            <el-row>
              <el-col :sm="6" class="message-name"><font-awesome-icon icon="code" />&nbsp;回应消息内容：</el-col>
              <el-col :sm="18" class="message-value">{{result.content}}</el-col>
            </el-row>
          </el-col>
          <el-col :sm="6">
            <a href="http://www.yootk.com" target="_blank">
              <img src="/static/images/yootk.png" style="width:100px;">
            </a>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    'editor': Editor
  },
  data () {
    return {
      result: {
        title: '',
        content: '',
        pubdate: ''
      },
      dialogVisible: false,
      init: {
        language: 'zh_CN',
        height: 200,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
      },
      form: {
        title: '',
        content: '',
        pubdate: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入消息标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入消息内容', trigger: 'blur' }
        ],
        pubdate: [
          { type: 'date', required: true, message: '请选择发布日期', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () { // 【开发】进行远程数据增加
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$frontApi.echoHandler({
            title: this.form.title,
            pubdate: this.$yootk.dateConvert(this.form.pubdate),
            content: this.form.content
          }).then(res => {
            this.result = res
            this.dialogVisible = true // 显示对话框
          })
          const h = this.$createElement
          this.$notify({
            title: '消息处理',
            message: h('i', {style: 'color: teal'}, '消息处理完成')
          })
          this.resetForm() // 重置表单
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.form = {
        title: '',
        content: '',
        pubdate: ''
      }
      this.$refs['form'].resetFields()
    }
  },
  mounted () { // 页面挂载的时候通过远程服务器获取要展示的数据内容
  },
  computed: {
    ...mapGetters(['apikey'])
  }
}
</script>
<style scoped>
</style>
