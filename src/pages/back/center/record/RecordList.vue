<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="film" />&nbsp;数据更新记录
    </div>
    <div class="block-line">&nbsp;</div>
    <div v-for="(record, index) in recordData" :key="index">
      <el-descriptions :title="titleHandler(record.recid)" border :column="3" >
        <el-descriptions-item label="操作者" labelStyle="word-break:keep-all;">
          <el-tag size="small" type="warning">{{record.name}}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="操作类型">{{record.operate}}</el-descriptions-item>
        <el-descriptions-item label="数据表">{{record.tab}}</el-descriptions-item>
        <el-descriptions-item label="操作日期">{{record.udate}}</el-descriptions-item>
        <el-descriptions-item label="操作数据">
          <el-tag size="small">{{record.data}}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div>&nbsp;</div>
    </div>
    <div class="block-line">&nbsp;</div>
    <div class="text-right"><el-pagination background layout="prev, pager, next" :total="totalPage"
      :current-page.sync="currentPage" @current-change="loadRecordData"></el-pagination></div>
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
      recordData: []
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    titleHandler (id) {
      return '数据表更新日志，记录ID：' + id
    },
    loadRecordData () { // 【开发】分页数据加载操作
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.record.list(this, this.currentPage).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              this.recordData = res.result.data // 更新数据
              this.totalPage = res.result.totalPage // 获取总页数
            }
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadRecordData() // 加载用户数据信息
  }
}
</script>
