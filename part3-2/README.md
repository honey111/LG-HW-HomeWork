### part3-2 作业
#### 一、简答题

##### 1、请简述 Vue 首次渲染的过程。
  - 首先进行初始化，初始化实例成员、静态成员
  - 初始化结束后调用vue的构造函数new Vue()
  - 在构造函数中调用_init()方法,相当于整个vue的入口
  - 在_init()方法中调用了入口文件src\platforms\web\entry-runtime-with-compiler.js中的vm.$mount()方法
  - 这里的$mount()通过compileToFunctions()把模板编译成render函数,render函数编译后存在options.render中
  - 接下来调用src\platforms\web\runtime\index.js中的vm.$mount()函数，通过mountComponent()重新获取el(运行时版本不会执行这个版本，所以需要重新获取)
  - 接下来调用mountComponent(),这个方法在src/core/instance/lifecycle.js中定义的，在mountComponent()中，首先会判断render选项，如果没有render选项，但是我们传入了模板，并且当前是开发环境的话会发送一个警告，目的是如果我们当前使用运行时版本的Vue,而且我们没有传入render,但是传入了模版,告诉我们运行时版本不支持编译器。接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂载之前。
  - 然后定义了updateComponent()，在这个函数中，调用vm._render和vm._update，vm._render的作用是生成虚拟DOM，vm._update的作用是将虚拟DOM转换成真实DOM，并且挂载到页面上
  - 创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终是在Watcher内部调用的。在Watcher内部会用了get方法，当Watcher创建完成之后,会触发生命周期中的mounted钩子函数,在get方法中，会调用updateComponent()
  - 挂载结束，最终返回Vue实例。

##### 2、请简述 Vue 响应式原理。
  - 响应式处理过程从vue实例的_init()方法开始的
  - 在_init()方法中调用initState()初始化vue实例的状态，调用initData()用于把data注入到vue实例上，并且调用observer(),把data变为响应式对象，observer()就是响应式处理的入口
  - 在observer(value)中判断value是否是对象，如果不是对象直接返回；判断value对象是否有_ob_,如果有直接返回（说明已经做过响应式处理），如果没有，创建observer对象，然后返回
  - 在Observer中给value对象定义了不可枚举的__ob__属性，并且记录当前的observer对象到__ob__属性中，然后进行数组的响应式处理和对象的响应式处理，对象的响应式处理调用walk方法，遍历对象的每一个属性，然后对每一个属性调用defineReactive
  - 在defineReactive中会为每一个属性创建dep对象，如果当前属性的值是对象，那么给这个对象也调用observe转化为响应式对象，最主要的功能getter和setter
    - getter 收集依赖，返回属性的值
    - setter 保存新值，如果新值是对象，调用observe，通过调用dep.notify()派发更新（发送通知），
    - 收集依赖可以为属性收集依赖，也会为属性的子对象收集依赖
    - Watcher监听发生变化属性

##### 3、请简述虚拟 DOM 中 Key 的作用和好处。
  给每个节点设置key，从而重用或重新排列现有元素。设置key可以减少dom操作

##### 4、请简述 Vue 中模板编译的过程。
  - 模板编译入口函数compileToFunctions函数（src/compiler/create-compiler.js）先从缓存中加载编译好的render函数，缓存中没有调用compile(template,option)开始编译
  - 在compile(template, option)中合并options选项，然后调用baseCompile(template.trim(), finalOptions)编译模板（核心是合并选项）
  - 真正处理在baseCompile(template.trim(), finalOptions)中完成的，合并的选项传递给baseCompile(), 完成了模板编译核心的事情: 
    - parse()把template转换成AST tree(抽象语法树)；然后用optimize()对抽象语法树进行优化
    - 标记AST tree中的静态sub trees（根节点），根节点不需要每次被重绘，patch阶段会跳过静态根节点
    - 最后调用generate()把优化过的AST对象转化为字符串形式
  - 当compile()完成后会回到入口函数compileToFunctions(),继续把上一步生成的字符串形式的js代码转化为函数，通过调用createFunction(),render和staticRenderFns初始化完毕，最终挂载到Vue实例的options对应的属性中