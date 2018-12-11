// 系统参数配置
// const version = 'v1'
let host
switch (process.env.NODE_ENV) {
  case 'production':
    host = ''
    break
  case 'release':
    host = 'http://0.0.0.0:8088'
    break
  case 'testing':
    host = 'http://0.0.0.0:8088'
    break
  default:
    host = 'http://0.0.0.0:8088'
}

export default {
  // headers: {
  //   Accept: `application/vnd.xx.${version}+json`
  // },
  baseURL: host, // 接口地址
  timeout: 60000, // 请求超时
  version: '1.0.0' // 应用版本
}
