### 手写Vue Router、手写响应式实现、虚拟DOM和Diff算法
#### Vue.js基础回顾
##### 阶段内容

##### Vue 基础结构

##### Vue 的生命周期

##### Vue 语法和概念
- 差值表达式
- 指令 （14个内置指令）
- 计算属性和侦听器
- Class和Style绑定
- 条件渲染/列表渲染
- 表单输入绑定
- 组件
- 插槽（自定义组件使用）
- 插件
- 混入 mixin
- 深入响应式原理
- 不同构件版本的Vue

#### Vue-Router原理实现
##### 课程介绍
- Vue Router基础回顾
- Hash模式和History模式
- 模拟实现自己的 Vue Router

##### Vue Router 基础回顾-使用步骤
在vue实例中如果配置router选项，会给vue实例注入两个选项，route路由规则，router路由对象，通过路由对象可以调用一些通用的路由方法
1、创建路由相关的视图组件
2、注册路由插件，调用vue.use(router)注册
3、创建router对象，配置一些路由规则
4、通过router-view进行占位
5、通过router-link创建链接
##### 动态路由
##### 嵌套路由
##### 编程式导航
##### Hash模式和History模式的区别
表现形式的区别
- Hash 模式
  - https://baidu.com/#/play?id=12344
- History 模式
  - https://baidu.com/play/12344 (需要在服务器端配置)

原理的区别
- Hash 模式是基于锚点，以及onhashchange 事件
- History 模式是基于HTML5中的 History API
  - history.pushState() IE10以后才支持
  - history.replaceState()

##### History模式
- History需要服务器的支持
- 单页应用中，服务端不存在http://www.test.com/login这样的地址会返回找不到该页面
- 在服务端应该出了静态资源外都返回单页应用的index.html

##### History模式 - Node.js

##### History模式  - nginx
nginx服务器配置
- 从官网下载ngnix压缩包
- 解压到C盘根目录，C:\nginx-1.18.0文件夹， 目录不能有中文
- 在命令行中切换到目录C:\nginx-1.18.0

启动nginx
```js
  start nginx // 启动
  nginx -s reload // 重启 修改nginx配置文件需要重启服务器
  nginx -s stop // 停止
```
浏览器直接输入localhost回车访问，默认访问80端口
C:\nginx-1.18.0文件夹下
  html文件夹存放打包后的文件， 根目录
  conf文件夹下存放nginx配置文件，其中nginx.conf是服务器配置文件
```js
  server {
    listen        80;
    server_name   localhost;
    location / {
      root    html;
      index   index.html  index.html;
      // 添加下列代码配置nginx服务器支持History模式， 配置后需要重启
      try_files $uri $uri/ /index.html
      // try_files => 试着访问文件
      // $uri 当前请求的路径，相当于根路径
      // $uri/ 如果找到就返回
      // /index.html 如果没找到就返回单页应用首页 index.html
    }
  }
```

##### VueRouter实现原理
Hash 模式
- URL 中 # 后面的内容作为路径地址
- 监听hashchange 事件
- 根据当前路由地址找到对应组件重新渲染
History 模式
- 通过 history.pushState() 方法改变地址栏,不向服务器发送请求
- 监听 popstate事件
- 根据当前路由地址找到对应组件重新渲染

##### 模拟VueRouter的History模式
```js
let _Vue = null
export default class VueRouter {
  static install (Vue){
    // 1、判断当前插件是否已经被安装
    if (VueRouter.install.installed){
      return
    }
    VueRouter.install.installed = true
    // 2、把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3、把创建Vue实例时候传入的router对象注入到Vue实例中
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router 
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    // options.rules 存储了所有的路由规则
    this.options = options
    this.routeMap = {}
    this.data = _vue.observable({
      current: '/' // 当前路由地址
    })
  }

  init (){
    this.createRouteMap()
    this.initComponents(_vue)
    this.initEvent()
  }

  createRouteMap(){
    // 遍历构造函数传过来的所有的路由规则，解析成键值对的形式存储到routerMap对象中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 创建router-link组件
  initComponents (Vue) {
    Vue.component('router-link', {
      props:{
        to: String
      },
      // 通过Vue完整版直接将template转换为render函数
      // template: '<a :href="to"><slot></slot></a>'

      // 运行时版本的vue自己动手写一个render函数
      // h函数将路由组件转化为虚拟DOM最终返回
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler // 不加小括号是为了挂载这个方法，不是调用
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          if (this.$router.options.mode === 'history') { 
            // history路由
            window.history.pushState({}, '', this.to)
            this.$router.data.current = this.to
          } else { 
            // hash路由
            window.location.hash = this.to
          }
          e.preventDefault() // 阻止浏览器刷新
        }
      }
    }) 

    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 该方法解决浏览器前进后退路由改变组件不重新渲染问题
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
```

##### Vue响应式原理模拟
##### Compliler
- 功能
 - 负责编译模板，解析指令/差值表达式
 - 负责页面的首次渲染
 - 当数据变化后重新渲染视图
一句话就是：操作DOM

#### Virtual DOM 的实现原理
##### 什么是虚拟DOM、为什么使用
##### 虚拟DOM的作用和虚拟DOM库
##### 创建项目
Snabbdom基本使用
创建项目
```js
md snabbdom-dome
cd snabbdom-demo
yarn init -y
yarn add parcel-bundler
// 创建demo 结构
yarn add snabbdom
```
##### snabbdom源码解析
☆Snabbdom的核心
- 使用h()函数创建JavaScript对象（VNode）描述真实DOM
- init()设置模块，创建patch()
- patch()比较新旧两个VNode
- 把变化的内容更新到真实DOM 树上