#### 简答题：
##### 1、引用计数
  设置引用数，判断当前数是否为0，为0时立即回收
  优点：即时回收垃圾对象，减少程序卡顿时间
  缺点：无法回收循环引用对象；资源消耗大，耗时

##### 2、标记整理
  先遍历所有对象标记活动对象，将标记的对象和没有标记的对象分别整理到两边，然后清除没有标记的对象，回收对应内存空间

##### 3、V8新生代垃圾回收
  内存区分为两个相等空间，From为使用空间，To为空闲空间，标记整理后将活动对象拷贝至To空间，From和To交换空间后完成释放

##### 4、增量标记算法
  在老生代垃圾回收时使用
  将标记 过程分为很多小片段，进行效率优化

#### 代码题1
##### 练习1
```js
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars))
```

##### 练习2
```js
const firstCarName = fp.flowRight(fp.prop('name'), fp.first);
console.log(firstCarName(cars))
```

##### 练习3
```js
let _average = function(xs){
    return fp.reduce(fp.add, 0, xs) / xs.length
}
let dollar_values = fp.flowRight(fp.map(fp.prop('dollar_value')))
let averageDollarValue = fp.flowRight(_average, dollar_value)
```


##### 练习4
```js
let _underscore = fp.replace(/\W+/g, '_')
const sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.prop('name'))))
console.log(sanitizeNames(cars))
```

#### 代码题2
##### 练习1
```js
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map(fp.flowRight(fp.map(fp.flowRight(fp.add(1)))))
```


##### 练习2
```js
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map(fp.flowRight(fp.first))
```

##### 练习3
```js
let safeProp = fp.curry(function (x, o){
    return Maybe.of(o[x])
})
let user = {id: 2, name: "Tom"}
let ex3 = safeProp("name", user).map(fp.first)
```

##### 练习4
```js
let ex4 = Maybe.of(15.2).map(x => parseInt(x))
```


