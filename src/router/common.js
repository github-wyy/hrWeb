export default [ // export指的是导出操作
  {
    path: '/', // 定义路由的映射路径，“/”描述的就是根路径
    name: 'FrontIndex', // 路由名称，名称一般不要重复，路由可以通过路径和名称两种方式访问
    redirect: '/front/index', // 重定向到指定路由
    // component: () => import('@/pages/front/IndexContent'), // 定义组件的所在路径
    meta: { title: 'HR-后台管理系统' } // 相应的页面属性内容
  }
]
