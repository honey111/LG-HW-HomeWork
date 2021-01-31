import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

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
    children: [ // 嵌套路由
      {
        path: '', // 不加/ ,默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */  '@/views/home/index.vue')
        // 路由懒加载
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

export default router
