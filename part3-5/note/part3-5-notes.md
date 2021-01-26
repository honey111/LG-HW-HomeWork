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
