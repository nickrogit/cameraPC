export default {
  menuData: [
    {
      id: 'home',
      name: '主页',
      path: '/'
    }, {
      id: 'user',
      name: '用户管理',
      path: '/user',
      children: [
        {
          id: 'user:userAdd',
          name: '添加用户',
          path: '/user/userAdd'
        }
      ]
    }
  ]
}
