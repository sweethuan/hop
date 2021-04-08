import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/page/Login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:()=>import('@/pages/Login/index.vue')
    },{
      path: '/home',
      name: 'Home',
      component:()=>import('@/pages/Home/index.vue')
    }
  ]
})
