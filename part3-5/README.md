### part3-5 作业
#### 1、Vue 3.0 性能提升主要通过哪几方面体现的？
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

#### 2、Vue 3.0所采用的Composition Api与 Vue 2.x使用的Options Api 有什么区别？

#### 3、Proxy相对于Object。defineProperty有哪些优点？

#### 4、Vue 3.0 在编译方面有哪些优化
  - Vue.js 2.x中通过标记静态根节点，优化diff的过程
  - Vue.js 3.0中标记和提升所有的静态根节点，diff的时候只需

#### 5、Vue.js 3.0 响应式系统的实现原理？
