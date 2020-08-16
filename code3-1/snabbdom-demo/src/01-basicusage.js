// var snabbdom = require('snabbdom')
// 导入
// import snabbdom from 'snabbdom'
// console.log(snabbdom)
// import { h, thunk, init } from 'snabbdom'
// console.log(h, thunk, init)

import { h, init } from 'snabbdom'

// 1. hello world
// 参数：数组，模块
// 返回值：patch函数，作用：对比两个vnode的差异更新到真实DOM
let patch = init([])
// 第一个参数：标签+选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', 'Hello World')

let app = document.querySelector('#app')
// 第一个参数：可以是DOM元素，内部会把DOM元素转换成VNode
// 第二个参数：Vnode
// 返回值： Vnode
let oldVnode = patch(app, vnode)

// 假设的时刻
vnode = h('div', 'Hello snabbdom')

patch(oldVnode, vnode)