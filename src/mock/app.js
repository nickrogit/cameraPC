export default(Mock, qs) => {
  // 用户登录
  Mock.mock(/\/login/, config => {
    const para = qs.parse(config.body)
    if (para.username === 'admin' && para.password === '123456') {
      return {
        code: 200,
        msg: 'login success',
        data: {
          token: 'token',
          userId: 1,
          userName: 'Admin'
        }
      }
    }
    return {code: 500, msg: '用户名或密码不正确'}
  })

  // 用户登出
  Mock.mock(/\/loginOut/, config => {
    return {
      code: 200,
      msg: 'loginOut success'
    }
  })
}
