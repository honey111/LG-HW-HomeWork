##  模块化开发与规范化标准

###  模块化开发

#####  模块化概述

​	通过将复杂代码按功能不同，划分为不同模块，单独去维护，提高开发效率，降低维护成本

​	模块化只是一种思想

##### 模块化规范

​	CommonJS规范（同步模式加载）

​	1、一个文件就是一个模块

​	2、每个模块都有单独的作用域

​	3、通过module.exports导出成员

​	4、通过require函数载入模块

​	AMD(异步加载)

​	RequireJs库

​	☆规范：

  ​	在node中使用CommonJS规范在浏览器重使用ES Mdules规范

  ​	ES Modules是ECMAScript 2015(ES6)中定义的一个标准	
   CommonJS规范
   AMD规范
   CMD规范
   ES Module规范

#####  ES Module特性

​	可以在Html中通过script添加type = module的属性，就可以以ES Module的标准执行其中的JS代码	

​	使用到serve这个工具，可以使用npm install -g serve安装

​	基本特性：

​		1、ESM自动采用严格模式，忽略‘use strict’

​		2、每个ES Module 都是运行在单独的私有作用域中（不会污染全局作用域）

​		3、ESM 是通过 CORS 的方式请求外部JS模块的（必须支持CORS）

​		4、ESM 的script 标签会延迟执行脚本 相当于给script添加defer属性

##### ES Modules 导入和导出

export  import

```js

npm install browser-sync -g // 具有热更新的web serve

browser-sync . --files  **/*.js

```
可以使用as进行重命名
```js
export {
  name as fooName
}
```
export 导出的是引用关系，不是拷贝，暴露出的引用关系是只读的，无法在外部修改

##### ES Modules 导入用法
import 后面跟的是文件路径 (需要有完整的文件名称)
可以使用相对路径、绝对路径、完整的URL 

##### 导出

##### ES Module in node.js与 CommonJS交互
1、ES Module中可以导入CommonJS模块
2、CommonJS中不能导入ES Module模块
3、CommonJS始终只会导出一个默认成员
4、注意import不是解构导出对象

##### ES Module in Node.js-Babel兼容方案
```js
yarn add @babel/node @babel/core @babel/preset-env --dev // 安装插件
yarn babel-node index.js --presets=@babel/preset-env // 运行babel 也可以在配置文件进行配置，不需要添加参数

.babelrc文件
{
    "presets": ["@babel/preset-env"]
}
yarn babel-node index.js
```

### Webpack打包
##### 模块打包工具的由来
1、ES Module存在环境兼容问题
2、模块文件过多，网络请求频繁
3、所有的前端资源都需要模块化

##### 模块打包工具概要
Webpack
模块打包器（Module bundler）
模块加载器（Loader）进行编译转化
代码拆分（Code Splitting）
资源模块（Asset Module）

打包工具解决的是前端整体的模块化，并不单指JavaScript模块化

##### Webpack 快速上手
可以通过webpack.config.js配置webpack，指定打包入口和打包文件输出的路径
```js
const path = require('path')

module.exports = {
    entry: './src/main.js', // 指定webpack打包入口路径
    output: {
        filename: 'bundle.js', // 指定输出文件的名称
        path: path.join(__dirname, 'dist') // 绝对路径
    }
}
```
##### webpack 工作模式
直接使用webpack打包出的代码不可读
可以通过webpack工作模式进行查看
官网文档： https:webpack.js.org/configuration/mode/
```js
yarn webpack 
yarn webpack --mode development // 开发模式
yarn webpack --mode none // 原始模式，不进行任何加工
```
还可以在webpack配置文件中指定工作模式
```js
module.exports = {
    mode: 'development'
}
```

##### webpack资源模块加载
webpack内部加载默认打包js文件， 打包其他文件需要引入其他的资源模块
loader是webpack实现整个前端项目打包的核心特性
通过loader可以加载任何类型的资源
```js
yarn add css-loader --dev // css文件打包
yarn add style-loader --dev // 将css文件通过配置到页面上
yarn add html-loader --dev // html文件
```

##### webpack 导入资源模块
根据代码的需要动态导入资源

##### webpack 文件资源加载器
yarn add file-loader --dev // 会自动拷贝加载的文件到输出目录
yarn add url-loader --dev // 转化为dataurl,可转化任意文件，base64格式
超出10KB文件单独提取存放
小于10KB文件转化为 Data URLs嵌入代码中

##### Webpack 常用加载器分类
1、编译转化类加载器（把加载到的资源模块转化为JavaScript代码）
2、文件操作类型加载器（把加载到的资源模块拷贝到输出目录，同时将文件的访问路径向外导出）
3、代码检查类加载器（统一代码风格，校验代码，不修改代码）

##### Webpack 与 ES 2015
yarn add babel-loader @babel/core @babel/preset-env --dev
Webpack只是打包工具
加载器可以用来编译转化代码

##### Webpack 加载资源的方式
1、遵循ES Modules标准的import声明
2、遵循CommonJS标准的require函数
3、遵循AMD标准的define函数和require函数
4、loader加载的非JavaScript也会触发资源加载
5、样式代码中的@import指令和url函数
6、HTML代码中图片标签的src属性
统一使用一种方式

##### Webpack 核心工作原理
Loader机制是Webpack工作的核心

##### Webpack 开发一个Loader

##### Webpack 插件机制介绍

*********************************

##### Webpack 代码分割
- 多入口打包
    多页面应用，常规一个页面提供一个入口，针对公共部分单独提取
    在webpack.config.js中
```js
    module.exports = {
        entry: {
            index: './src/index.js',
            ablum: './src/ablum.js',
        },
        output: {
            filename: '[name].bundle.js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all' // 提取公共模块
            }
        }
        plugins: {
            new HtmlWebpackPlugin({
                title: 'Multi Entry',
                templete: './src/index.html',
                filename: 'index.html',
                chunks: ['ablum']
            }),
            new HtmlWebpackPlugin({
                title: 'Multi Entry',
                templete: './src/ablum.html',
                filename: 'ablum.html',
                chunks: ['ablum']
            })
        }
    }
```
- 动态导入
动态导入的模块会被自动分包（实现按需加载）
```js
if(hash === '#posts') {
    import(/* webpackChunkName:'posts' */'./posts/posts'.then(({ default: posts }) => {
        mainElememt.appendChild(posts())
    })
}else if(hash === '#ablum') {
    import(/* webpackChunkName:'ablum' */'./ablum/ablum'.then(({ default: ablum }) => {
        mainElememt.appendChild(ablum())
    })
}
```

##### Webpack 魔法注释
给分包起名
/* webpackChunkName:'posts' */
如果添加的注释名称相同，会被打包到一个js文件中

##### webpack MiniCssExtractPlugin OptimizeCssAssetsWebpackPlugin
MiniCssExtractPlugin 可以提取css到单个文件
OptimizeCssAssetsWebpackPlugin 可以压缩css文件
yarn add  mini-css-extract-plugin --dev
yarn add  optimize-css-assets-webpack-plugin --dev
yarn add  terser-webpack-plugin --dev // js压缩文件插件
在webpack.config.js中导入
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
    optimization: {
        minimizer: [ // 配置该属性后会自动关闭webpack内部压缩js插件，需手动添加
            new OptimizeCssAssetsWebpackPlugin(), // 方便统一控制压缩
            new TerserWebpackPlugin()
        ]
    }
    module: {
        rules: [
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, // 取代style-loader工作,css代码>150Kb时可以考虑使用MiniCssExtractPlugin
                'css-loader'
            ]
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        // new OptimizeCssAssetsWebpackPlugin(),
    ]
}
```

##### Webpack 输出文件名 Hash
生产模式下，文件名使用Hash
```js
    plugins: [
        new MiniCssExtractPlugin(
            // filename: '[name]-[hash].bundle.css' // 项目级别
            // filename: '[name]-[chunkhash].bundle.css' // 同级别chunk
            filename: '[name]-[contenthash:8].bundle.css' // 文件级别的hash （根据不同的文件内容， 最适合解决缓存问题) :8指定hash文件名长度
        )
    ]
```

