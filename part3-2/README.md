### part3-2 作业
#### 一、简答题

##### 1、请简述 Vue 首次渲染的过程。
  - 首先进行初始化，初始化实例成员、静态成员
  - 初始化结束后调用vue的构造函数new Vue()
  - 在构造函数中调用this._init()方法,相当于整个vue的入口
  - 在_init()方法中调用了入口文件src\platforms\web\entry-runtime-with-compiler.js中的vm.$mount()方法
    - 这里的$mount()通过compileToFunctions()把模板编译成render函数,render函数编译后存在options.render中
    - 接下来调用src\platforms\web\runtime\index.js中的vm.$mount()函数，通过mountComponent()重新获取el

##### 2、请简述 Vue 响应式原理。

##### 3、请简述虚拟 DOM 中 Key 的作用和好处。

##### 4、请简述 Vue 中模板编译的过程。

