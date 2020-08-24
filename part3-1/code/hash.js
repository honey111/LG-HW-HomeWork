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