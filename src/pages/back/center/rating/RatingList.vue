<template>
  <div>
    <div class="title" style="text-align:left">
      <font-awesome-icon icon="globe" />&nbsp;薪酬列表
    </div>
    <div class="block-line">&nbsp;</div>
    <el-table :data="ratingData" border style="width: 100%">
      <el-table-column prop="rtid" label="薪酬等级" width="180"></el-table-column>
      <el-table-column prop="name" label="等级名称" width="180"></el-table-column>
      <el-table-column prop="low" label="等级最低工资" width="180"></el-table-column>
      <el-table-column prop="high" label="等级最高工资" width="180"></el-table-column>
      <el-table-column prop="note" label="等级说明" width="400"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      ratingData: []
    }
  },
  methods: {
    ...mapActions(['refreshToken']), // 导入了VueX中提供的数据处理函数
    loadRatingData () { // 【开发】分页数据加载操作
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        setTimeout(() => {
          this.$back.rating.list(this).then(res => { // 加载新闻数据信息
            if (res.code === 200 && res.token != null) { // 判断是否存在有新的token
              this.refreshToken(res.token) // 刷新token
              this.ratingData = res.result // 更新数据
            }
          })
          loadingInstance.close()
        }, 100)
      })
    }
  },
  mounted () {
    this.loadRatingData() // 加载用户数据信息
  }
}
</script>
