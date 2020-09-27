## 
### 任务一

### Vue.js源码 剖析-虚拟 DOM
#### 虚拟DOM

##### 什么是 虚拟DOM
- 虚拟DOM（virtual DOM）是使用JavaScript对象描述真实DOM
- Vue.js中的虚拟DOM借鉴Snabbdom,并添加了vue.js的特性。
 - eg: 指令和组件机制

#####  为什么要使用虚拟DOM
- 避免直接操作DOM，提高开发效率
- 作为一个中间层可以跨平台
- 虚拟DOM不一定可以提高性能
 - 首次渲染的时候会增加开销
 - 复杂视图情况下提升渲染性能
##### h函数
- vm.$createElement(tag, data, children, normalizeChildren)
 - tag: 标签名称或者组件对象
 - data: 描述tag，可以设置DOM的属性或者标签的属性
 - children: tag中的文本内容或者子节点
 h函数返回一个VNode对象，VNode的核心属性
 - tag
 - data
 - children
 - text
 - elm(记录真实DOM)
 - key(复用当前元素)