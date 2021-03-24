## Vue.js 3.0 Composition APIs 及 3.0 原理剖析
### Vue,js 3.0 源码组织方式
Vue.js 3.0
- 源码组织方式的变化
    - 源码采用TypeScript重写
    - 使用Monorepo管理项目结构
- Composition API
    设计动机
    - Vue.js 3.0新增的一组API
    - 一组基于函数的API
    - 可以更灵活的组织组件的逻辑
- 性能提升
    响应式系统升级
    - Vue.js 2.x中响应式系统的核心defineProperty
    - Vue.js 3.0中使用Proxy对象重写响应式系统
        - 可以监听动态增加的属性
        - 可以监听删除的属性
        - 可以监听数组的索引和length属性
    编译优化
    - Vue.js 2.x中通过标记静态根节点，优化diff的过程
    - Vue.js 3.0中标记和提升所有的静态根节点，diff的时候只需要对比动态节点内容
        - Fragments（升级vetur插件）
        - 静态提升
        - Patch flag
        - 缓存事件处理函数
    优化打包体积
    - Vue.js 3.0 中移除了一些不常用的API
        - 例如：inline-template、filter等
    - 对Tree-shaking支持性更好
- Vite（构建工具）
    Vite as Vue-CLI对比
    - Vite在开发模式下不需要打包可以直接运行
        - 快速冷启动
        - 按需编译
        - 模块热更行
    - Vite在生产环境下使用Rollup打包（打包体积较小）
        - 基于ES Module的方式打包
    - Vue-CLI开发模式下必须对项目打包才可以运行
    - Vue-CLI使用Webpack打包
    Vite创建项目
    `js
    <!-- Vite 创建项目 -->
    npm init vite-app <project-name>
    cd <project-name>
    npm install
    npm run dev
    <!-- 基于模板创建项目 -->
    npm init vite-app --template react
    npm init vite-app --template preact
    `
## Composition API
### todolist-项目
#### 主要功能
- 添加待办事项
- 删除待办事项
- 编辑待办事项
- 切换待办事项
- 存储待办事项

#### 自定义指令
- Vue 2.x
```js
Vue.directive('editingFocus', {
    bind(el, binging, vnode, prevVnode) {},
    inserted() {},
    update() {}, // remove
    componentUpdated() {},
    unbind() {}
})
```
- Vue 3.0
```js
app.directive('editingFocus', {
    beforeMount(el, binding, vnode, prevVnode) {},
    mounted() {},
    beforeUpdate() {}, // new
    updated() {},
    beforeUnmount() {}, // new
    unmounted() {}
})
```
- 差别
自定义指令的钩子函数被重命名，vue 3.0把自定义指令钩子函数名称和组件中钩子函数的名称保持一致

### Vue  3.0介绍
#### 响应式系统原理介绍
- proxy 对象实现属性监听
- 多层属性嵌套，在访问属性过程中处理下一级属性
- 默认监听动态添加的属性
- 默认监听属性的删除操作
- 默认监听数组索引和length属性
- 可以作为单独的模块使用
#### Vue 3.0核心方法
- reactive/ref/toRefs/computed
- effect
- track
- trigger


### Vite 概念
- Vite 是一个面向现代浏览器的一个更轻、更快的Web应用开发工具
- 它基于ECMAScript标准原生模块系统（ES Modules）实现
他的出现是为了解决webpack开发阶段使用webpack-dev-server冷启动时间过长，另外webpack HMR热更新反应速度慢的问题。
使用Vite创建项目，就是一个普通的vue 3.0的应用，相比于vue-cli创建的项目，少了很多配置的文件和依赖

#### Vite原理
- vite通过对请求路径劫持获取 资源的内容返回给浏览器
- vite热更新实现在client端，webSocket监听了一些更新的类型
- vite热更新实现在server端，通过watcher监听页面改动
#### Vite 项目依赖
- Vite (模拟实现的命令行工具)
- @vue/compiler-sfc （用来编译项目中以.vue结尾的单文件组件）
- Vite 目前只支持vue 3.0的版本
- 在创建项目的时候也可以通过指定使用不同的模板，也可以支持其他的框架

#### Vite项目提供两个子命令
- vite serve (启动一个开发服务器，不需要编译所有的文件，启动速度快)
- vite build

#### HMR
- Vite HMR
    - 立即编译当前所修改的文件（相应速度快）
- Webpack HMR
    - 会自动以这个文件为入口重写build一次，所有涉及到的医疗也会被重新加载一遍

#### 打包 or 不打包
- 使用Webpack打包的两个原因：
    - 浏览器环境并不支持模块化
    - 零散的模块文件会产生大量的HTTP请求

#### Vite 开箱即用
- TypeScript-内置支持
- less/sass/stylus/postcss-内置支持（需要单独安装）
- JSX
- Web Assembly

#### Vite 的特点
- 快速冷启动
- 模块热更新
-  按需编译
- 开箱即用
优势：提升开发者在开发过程中的体验，web开发服务器不需要等待，可以立即启用，另外模块热更新几乎是实时的，所需的文件是按需编译，避免编译用不到的文件，还有开箱即用，避免各种loader以及plugin的配置

#### Vite 核心功能
- 开启一个静态Web服务器 （通过 koa）
- 编译单文件组件
    - 拦截浏览器不识别的模块，并处理
- 并且开启HMR的功能