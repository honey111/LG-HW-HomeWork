// 2. div中放置子元素 h1,p
import { h, init } from 'snabbdom'

let patch = init([])

let vnode = h('div#container', [
    h('h1', 'Hello Snabbdom'),
    h('p', '这是一个p标签')
])

let app = document.querySelector('#app')
let oldVnode = patch(app, vnode)

setTimeout(() => {
    vnode = h('div#container', [
        h('h1', 'Hello World'),
        h('p', 'Hello p')
    ])
    patch(oldVnode, vnode)

    // 清空页面标签
    patch(oldVnode, h('!')) // 添加注释节点
}, 2000);