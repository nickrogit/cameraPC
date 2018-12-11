// 路由配置
export default[
  {path: '/login', name: 'Login', component: () => import('@/views/Login')},
  {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: () => import('@/views/common/layouts/Layout'),
    children: [
      { path: '/', name: 'Dashboard', component: () => import('@/views/Dashboard') },
      { path: '/user/userAdd', name: 'userAdd', component: () => import('@/views/user/userAdd') }
    ]
  },
  {path: '*', name: '404', component: () => import('@/views/common/pages/NotFound')}
]
