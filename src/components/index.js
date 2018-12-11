// 自定义组件
import ComForm from './com-form'

const components = {
  ComForm
}

export default(Vue) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
