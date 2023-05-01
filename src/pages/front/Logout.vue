<template>
  <div>
    <el-row :gutter="30">
      <el-col :sm="24">
        <el-row>
          <el-col :sm="24" class="text-left title ">
            <i class="el-icon-s-custom"></i>&nbsp;注销成功，欢迎下次光临。
            <div class="block-line">&nbsp;</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="24">
        <el-card body-style="{ padding: '0px', marginBottom: '1px' }">
          <el-alert title="HR-后台管理系统" type="info" effect="dark" center></el-alert>
          <div>&nbsp;</div>
          <img src="/static/images/main.png" class="image multi-content"/>
          <div style="padding: 10px;">
            <div class="bottom card-header">
              <span class="time">www.baidu.com</span>
              <el-link href="http://www.baidu.com" type="text" class="button">百度</el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
</style>
