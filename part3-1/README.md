### 一、简答题
#### 1、当我们点击按钮的时候动态给data增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么？
```js
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```
- 添加的不是响应式数据，因为vue会在实例初始化的时候通过Observer给data的所有属性添加getter/setter转化为响应式数据，后添加的成员不是；
- 如果想把新增成员设置成响应式数据，应在新增成员时调用Observer中的defineReactive方法，给新增成员添加getter/setter转化为响应式数据。

#### 2、请简述Diff算法的执行过程
* 同级比较，再比较子节点
* 先判断一方有子节点一方没有字节点的情况，如果新的children没有子节点，将旧节子点移除
* 如果都有子节点，则开始递归比较子节点
* 在比较时，先比较key和sel是否相同
* 如果不相同删除之前内容，重新渲染
* 如果是同一个节点，再判断新的节点是否有text，如果有并且和旧的text不同，直接更新文本内容
* 如果新的节点有children，则开始使用diff进行同层级比较节点变化


### 二、编程题
#### 1、模拟VueRouter的hash模式的实现。实现思路和 History模式类似，把URL中的#后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
* [代码链接](https://github.com/honey111/LG-HW-HomeWork/blob/master/part3-1/code/hash.js)

#### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
* [代码链接](https://github.com/honey111/LG-HW-HomeWork/blob/master/part3-1/code/minivue/js/compiler.js)

#### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果
* [代码链接](https://github.com/honey111/LG-HW-HomeWork/tree/master/part3-1/code/snabbdom)