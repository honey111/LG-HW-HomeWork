#### 函数式编程的好处
    1、函数式编程可以抛弃this
    2、打包过程中可以更好的利用tree shaking过滤无用代码
    3、方便测试，方便并行处理
    5、有很多库可以帮助我们进行函数式开发：loadash, underscore, ramda
    
#### 概念
    函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程
编程、面向对象编程。
    - 面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和
    多态来演示事物事件的联系
    - 函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽
    象）
      - 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和
    输出的函数
      - x -> f(联系、映射) -> y，y=f(x)
      - 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如：y = sin(x)，x和y的关系
    相同的输入始终要得到相同的输出(纯函数)
      - 函数式编程用来描述数据(函数)之间的映射

#### 函数是一等公民

#### 高阶函数
    1、函数作为参数
        
    2、函数作为返回值
    
    3、使用高阶函数的意义
        · 抽象可以帮助我们屏蔽细节，只需要关注我们的目标
        · 高阶函数用来抽象通用的问题
    
    4、常用的高阶函数
        some\every\map  

#### 闭包
    1、概念
        ~函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包
        ~可以再另一个作用域中调用一个函数的内部函数并访问到该函数的作用域的成员
        ~好处：延长了外部函数中内部函数的作用域范围
    2、本质：函数在执行的时候会放到一个执行栈上当函数执行完毕后会从执行栈上移除，但是**堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员。

#### 纯函数（☆）
    1、纯函数：相同的输入永远会得到相同的输出，而且没有任何可观察的副作用（类似数学中的函数）
    2、lodash是一个纯函数的功能库，提供操作数组、数字、对象、字符串、函数的一些方法
    3、数组的slice和splice分别是纯函数和不纯的函数（区别在于是否修改原数据）
        ~ slice 返回数组中的指定部分，不会改变原数组
        ~splice 对数组进行操作返回该数组，会改变原数组
    4、函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）
    5、可以将一个函数的执行结果交给另一个函数处理
    * 纯函数的优势
        1、可缓存
        2、可测试
        3、并行处理
            在多线程环境下并行操作共享的内存数据很可能会出现意外，纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（web worker可以开启多线程）
    * 副作用
        如果函数依赖于外部的状态无法保证输出相同，让一个函数变得不纯。
        所有的外部交互都可能有副作用，副作用使方法不适合扩展和可重用性，会给程序带来安全隐患，副作用不可能完全禁止，尽可能的控制他们在可控范围内
        来源：配置文件、数据库、用户输入等 

#### 柯里化
    当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变），然后返回一个新的函数接收剩余的参数，返回结果
    * 柯里化可以把任意多参数的函数转化为一个一元函数
    
    ☆  总结
        1、柯里化可以给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
        2、这是一种对函数参数的缓存（使用闭包）
        3、让函数变得更加灵活，让函数的粒度更小
        4、可以把多元函数转化为一元函数，可以组合使用函数产生强大的功能
    
#### 函数组合
    函数组合可以让我们把细粒度的函数重新组合成一个新的函数
    函数组合：如果一个函数要进过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
    ***  函数组合默认是从右到左执行
    
    lodash中的组合函数
        flow()从左到右执行
        flowRight()从右到左执行（使用更多）
    *** 函数组合满足结合律
    
    lodash/fp
        1、lodash的fp：函数式编程
        2、提供了不可变auto-curried iteratee-first data-last的方法
    
    Point Free
        一种编码风格
        1、不需要指明处理的数据
        2、只需要合成运算过程
        3、需要定义一些辅助的基本运算函数
```js
const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))
```

#### Fuctor(函子)
    函子：控制使用函数式编程中带来的一些副作用
    概念：
        容器：包含值和值的变形关系（函数）
        函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
    总结：
        1、函数式编程的运算不直接操作值，而是由函子完成
        2、函子就是一个实现了map契约的对象
        3、函子相对于一个盒子，在盒子中封装了一个值
        4、通过对盒子的map方法传递一个处理值得函数，来对盒子中的值做处理
        5、最终map方法返回一盒包含新的值的函子
        6、map能不断的进行链式调用
    
    MayBe函子
        对外部的空值情况做处理（控制副作用在允许的范围）
    
    Either函子
        Either两者中的任何一个，相当于if...else
        可以用来处理不纯函数的异常
    
    IO函子
        1、IO函子中的_value是一盒函数，把函数作为值处理
        2、IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作纯函数
        3、把不纯的操作交给调用者来处理
    
    Task异步执行
        folktale库，提供一些方便处理函数的方法
    
    Pointed函子
        实现了of静态方法的函子
        of方法是为了避免使用new来创建对象，更深层的含义是of方法用来吧值放到上下文Context（把值放到容器中，使用map来处理值）
    
    Monad函子
        是可以变扁的Pointed函子，IO(IO(x))
        一个函子具有join和of两个方法并遵守一些定律就是一个Monad
        
#### 函数式编程总结
    思维导图


# JavaScript性能优化
    主要指JavaScript语言的优化

#### 内存管理
    内存：由可读写单元组成，表示一片可操作空间
    内存管理：开发者主动申请空间、使用空间、释放空间
    管理流程：申请-使用-释放
    
    js中的垃圾
        js中内存管理是自动的；
        对象不再被引用时是垃圾
        对象不能从根上访问到时是垃圾
    
    js中的可达对象
        可以访问到对象（引用、作用域链）
        可达标准：从根出发是否能被找到
        根：全局变量对象
    
    GC算法
        GC:垃圾回收机制
        GC查找内存垃圾、释放空间、回收空间
        垃圾：
            1、程序中不再需要使用的对象
            2、程序中不能再访问到的对象
        
        常见GC算法
            1、引用计数
                设置引用数，判断当前数是否为0，为0时立即回收
                ~ 优点：即时回收垃圾对象；减少程序卡顿时间
                ~ 缺点：无法回收循环引用的对象；资源消耗大，耗时
            2、标记清除
                核心：标记、清除
                遍历所有对象找标记活动对象（可达对象）；遍历所有对象清除没有标记的对象；回收相应空间
                ~ 优点：可回收循环引用的对象
                ~ 缺点：空间碎片化，浪费空间；不会立即回收垃圾对象
            3、标记整理
                是标记清除的增强
                标记阶段同标记清除一致；清除阶段先执行整理，移动对象位置
                ~ 优点：通过整理避免空间碎片化
                ~ 缺点：不会立即回收垃圾对象
            4、分代回收 ？？？没了

#### V8
    主流js执行引擎
    采用即时编译
    内存设限（1.5G\800M）
    
    
    V8垃圾回收策略
        1、分代回收思想
        2、内存分为新生代、老生代（不同代采用不同的GC算法）
        3、针对不同对象采用不同算法
    
    V8中常用GC算法
        1、分代回收
        2、空间复制
        3、标记清除
        4、标记整理
        5、标记增量
        GC目的：为了实现内存空间的良性循环  
    新生代对象回收实现（新生代活动时间较短）
        回收过程采用复制算法+标记整理
        内存区分两个相等空间
        使用空间为Form，空闲~为To
        标记整理后将活动空间拷贝至To
        From和To交换空间完成释放
        ** 细节
            拷贝过程可能出现晋升（晋升：将新生代对象移动至老生代）
            一轮GC还存活的新生代需晋升
            To空间的使用率超过25%
    
    老年代对象
        右侧老生代
        1.4G\700M
        存活时间较长的对象
        回收
            标记清除、标记整理（空间优化）、增量标记（效率优化）
    
    Performance时刻监视内存空间
    
    内存问题的外在表现
        1、页面出现延迟加载或经常性暂停
        2、页面持续性出现糟糕的性能
        3、页面的性能随时间延长越来越差
    
    监控内存的方法
        界定：
            内存泄露：内存使用持续升高
            内存膨胀：多数设备存在性能问题
            频繁垃圾回收:通过内存变化图分析
        监控：
            浏览器任务管理器:浏览器任务管理器 ： shift + esc
                
            Timeline时序图
            堆快照查找分离DOM
                堆快照：找到当前的js堆，对它进行一个照片的留存
                分离DOM：页面上没有使用的DOM结点，在js中还在被引用的DOM结点
            判断是否存在频繁的垃圾回收
            
        
    
    
        
       
        
    
    
    

    
        
