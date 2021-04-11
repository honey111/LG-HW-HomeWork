import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

// 路由规则配置
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */  '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [ // 嵌套路由
      {
        path: '', // 不加/ ,默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */  '@/views/home/index.vue')
        // 路由懒加载
        // meta: { // 自定义数据
        //   requiresAuth: true  // 需要用户权限访问
        // } // meta默认就是一个 空对象
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */  '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */  '@/views/menu/index.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */  '@/views/resource/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */  '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */  '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */  '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-apace',
        component: () => import(/* webpackChunkName: 'advert-apace' */  '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫 ：任何页面的访问都要经过这里
// to: 要去哪里的的路由页面
// from：从哪里来的路由信息
// next: 通行的标志
router.beforeEach((to, from, next) => {
  // console.log('进入全局路由守卫')

  // to.matched 是一个数组（匹配到的是路由记录）
  if (to.matched.some(recode => recode.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      next({
        name: 'login',
        query: { // 通过url传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next() // 允许通过
    }
  } else {
    next() // 允许通过
  }
  // 路由守卫中一定要调用next,否则页面无法显示
  next()

  // 一刀切，直接所有的页面判断
  // if(to.path !== '/login'){
  //   // 校验登录状态
  // }
})

export default router
