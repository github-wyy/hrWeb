export default [
  {
    path: '/back/',
    name: 'BackApp',
    component: () => import('@/pages/back/BackIndex'),
    children: [
      {
        path: 'center',
        name: 'ControlCenter',
        component: () => import('@/pages/back/center/ControlCenter'),
        meta: { title: 'HR管理系统 - 信息访问' },
        children: [{
          path: 'main',
          name: 'CenterMain',
          component: () => import('@/pages/back/center/CenterMain'),
          meta: { title: '后台人事管理' }
        },
        {
          path: 'emp/list',
          name: 'EmpList',
          component: () => import('@/pages/back/center/emp/EmpList'),
          meta: { title: '雇员列表' }
        },
        {
          path: 'emp/add',
          name: 'EmpAdd',
          component: () => import('@/pages/back/center/emp/EmpAdd'),
          meta: { title: '增加雇员' }
        },
        {
          path: 'emp/edit/:empno',
          name: 'EmpEdit',
          component: () => import('@/pages/back/center/emp/EmpEdit'),
          meta: { title: '编辑雇员' }
        },
        {
          path: 'dept/list',
          name: 'DeptList',
          component: () => import('@/pages/back/center/dept/DeptList'),
          meta: { title: '部门列表' }
        },
        {
          path: 'dept/add',
          name: 'DeptAdd',
          component: () => import('@/pages/back/center/dept/DeptAdd'),
          meta: { title: '部门列表' }
        },
        {
          path: 'dept/edit/:deptno',
          name: 'DeptEdit',
          component: () => import('@/pages/back/center/dept/DeptEdit'),
          meta: { title: '部门编辑' }
        },
        {
          path: 'rating/list',
          name: 'RatingList',
          component: () => import('@/pages/back/center/rating/RatingList'),
          meta: { title: '薪酬等级列表' }
        },
        {
          path: 'member/list',
          name: 'MemberList',
          component: () => import('@/pages/back/center/member/MemberList'),
          meta: { title: '用户管理' }
        },
        {
          path: 'record/list',
          name: 'RecordList',
          component: () => import('@/pages/back/center/record/RecordList'),
          meta: { title: '用户管理' }
        }]
      }
    ]
  }
]
