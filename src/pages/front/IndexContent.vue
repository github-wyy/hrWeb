<template>
  <div>
    <el-row>
      <!-- <el-carousel height="650px" width="100%" style="margin-top:-20px;">
        <el-carousel-item v-for="img in images" :key="img.src">
          <a :href="img.link" target="_blank"><img :src="img.src" style="width:100%"></a>
        </el-carousel-item>
      </el-carousel> -->
    </el-row>
    <el-row>
      <el-col :sm="24">
        <el-card body-style="{ padding: '0px', marginBottom: '1px' }">
          <el-alert title="欢迎来到 HR-管理系统" type="info" effect="dark" center></el-alert>
          <div>&nbsp;</div>
          <img src="/static/images/main.png" class="image multi-content"/>
          <div style="padding: 10px;">
            <div class="bottom card-header">
              <span class="time"></span>
              <el-link href="" type="text" class="button"></el-link>
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
    return {
      images: []
    }
  },
  methods: {
  },
  mounted () { // 页面挂载的时候通过远程服务器获取要展示的数据内容
    this.images = [
      {src: '/static/images/carousel/a.png', link: 'http://edu.baidu.com'},
      {src: '/static/images/carousel/b.png', link: 'http://edu.baidu.com'},
      {src: '/static/images/carousel/c.png', link: 'http://edu.baidu.com'},
      {src: '/static/images/carousel/d.png', link: 'http://edu.baidu.com'},
      {src: '/static/images/carousel/e.png', link: 'http://edu.baidu.com'}
    ]
  }
}
</script>
<style scoped>
</style>
