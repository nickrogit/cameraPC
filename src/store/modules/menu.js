import router from '@/router'
// import {getMenuList} from '@/services/app'

const state = {
  menu: JSON.parse(localStorage.getItem('menuCam')) || [], // 主菜单
  menuActive: localStorage.getItem('menuActiveCam') || '/', // 激活主菜单
  menuOpened: localStorage.getItem('menuOpenedCam') || '' // 展开子菜单
}

const getters = {
  getMenu: state => state.menu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened
}

const mutations = {
  // 获取菜单
  MENU: (state, data) => {
    state.menu = data
    localStorage.setItem('menuCam', JSON.stringify(data))
  },
  // 激活菜单
  MENU_SELECT: (state, data) => {
    const open = `/${data.split('/')[1]}`
    router.push(data) // 路由跳转
    state.menuActive = data // 激活菜单
    state.menuOpened = open // 展开菜单
    localStorage.setItem('menuActiveCam', data)
    localStorage.setItem('menuOpenedCam', open)
  },
  // 重置菜单
  MENU_RESET: (state) => {
    state.menu = []
    state.menuActive = '/'
    state.menuOpened = ''
    localStorage.removeItem('userCam')
    localStorage.removeItem('roleCam')
    localStorage.removeItem('menuCam')
    localStorage.removeItem('menuActiveCam')
    localStorage.removeItem('menuOpenedCam')
    // localStorage.clear()
  }
}

const actions = {
  // 获取菜单
  handleMenu: ({commit}) => {
    let menuData = [
      {
        limits: 1,
        name: '主页',
        path: '/'
      }
    ]
    commit('MENU', menuData)
    router.push('/') // 路由跳转首页
    /* getMenuList().then(res => {
      console.log(res.data)
      commit('MENU', res.data)
      router.push('/') // 路由跳转首页
    }) */
  }
  // 激活菜单
  // handleMenuSelect: ({
  //   commit
  // }, name) => {
  //   commit('MENU_SELECT', name)
  // }
}

export default {state, getters, mutations, actions}
