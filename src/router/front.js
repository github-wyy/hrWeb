export default [
  {
    path: '/front/',
    name: 'FrontApp',
    component: () => import('@/pages/front/FrontIndex'),
    children: [
      {
        path: 'index',
        name: 'IndexContent',
        component: () => import('@/pages/front/IndexContent'),
        meta: { title: 'HR管理系统 - 前端首页' }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/front/Login'),
        meta: { title: 'HR管理系统 - 用户登录' }
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import('@/pages/front/Logout'),
        meta: { title: 'HR管理系统 - 系统注销' }
      },
      {
        path: 'oauth2/login',
        name: 'OAuthLogin',
        component: () => import('@/pages/front/oauth2/OAuthLogin'),
        meta: { title: 'HR管理系统 - OAuth登录' }
      },
      {
        path: 'oauth2/user',
        name: 'OAuthUser',
        component: () => import('@/pages/front/oauth2/OAuthUser'),
        meta: { title: 'HR管理系统 - 用户信息' }
      }
    ]
  }
]
