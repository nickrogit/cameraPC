import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'

Vue.use(Router)

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routes
}

const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // localStorage.clear()
    localStorage.removeItem('userCam')
    localStorage.removeItem('roleCam')
    localStorage.removeItem('menuCam')
    localStorage.removeItem('menuActiveCam')
    localStorage.removeItem('menuOpenedCam')
  }

  const user = JSON.parse(localStorage.getItem('userCam'))
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
