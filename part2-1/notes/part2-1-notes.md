### 工程化概述
    一切以提高效率、降低成本、质量保证为目的的手段都属于工程化。
    可以解决传统语言或语法的弊端；解决无法使用模块化、组件化；减少重复的机械式工作；统一代码风格、保证质量；减少对后端的依赖

### 脚手架工具
    脚手架的本质作用：创建项目基础结构，提供项目规范和约定
#### Yoman
```js
    yarn global add yo
    yarn global add generator-node
```

#### yeoman使用步骤总结
    官网： http://yeoman.io/generators
    
    1、明确需求；
    2、找到合适的Gennerator;
    3、全局范围安装找到的Generator；
    4、通过Yo运行对应的Generator；
    5、通过命令行交互填写选项；
    6、生成你所需要的项目结构；
    
##### 创建Generator模块
    Generator本质上就是一个NPM模块
    generator-<name>
    
    完成Generator后使用命令行yarn link链接到全局，使其成为全局模块包
    yo <name>创建generator模板
    
##### Vue Generator案例
```js
    mkdir hw-vue-generator
    cd hw-vue-generator
    yarn init
    yarn add yeoman-generator
```
    
#### plop
##### plop基本使用
    1、安装依赖plop
    2、在项目根目录下创建一个plopfile.js文件
    3、在plopfile.js文件中定义脚手架任务
    4、编写用于生成特定类型文件的模板
    5、通过plop提供的CLI运行脚手架任务

##### 脚手架原理
    脚手架其实就是node的cli应用，创建脚手架就是创建cli应用，没毛病
    
    yarn init
    在package.json中添加"bin": "cli.js" // 切记☆
    
    cli.js文件
    开头添加标识符：#!/usr/bin/env node
    Linux或者macOS系统修改文件的读写权限为755
    
    yarn add inquirer // 命令行询问插件
    

### 开发脚手架及封装自动化构建工作流
#### 常用的自动化构建工具
-    Grunt
-    Gulp
-    FIS

#### Grunt 基本使用
```js
    mkdir 空文件
    yarn init
    yarn add grunt
    code gruntfile.js // 入口文件， 配置API
    yarn grunt foo
    yarn grunt --help
    // grunt默认执行同步操作
```

##### grunt标记任务失败
    同步任务通过return false标记失败,然后使用yarn grunt --force方式运行

    异步任务通过this.async(false)来标记失败任务
##### grunt配置选项方法
    grunt.initConfit()
##### grunt多目标任务
```js
    //多目标模式，可以让任务根据配置形成多个子任务
    grunt.registerMultiTask()
    在grunt.initConfig({
        far:{
            options: {
                <!--作为任务配置选项出现-->
                bar: '33'
            }
            js: '11',
            css: '22'
        }
    })
```
##### Grunt插件的使用
    1、安装插件
    2、通过grunt.loadNpmTasks()加载插件模块
    3、在grunt.initConfig()中为这个任务添加配置选项

#### gulp的基本使用
    gulp默认异步操作

#### gulp的组合任务
    串行任务通过series组合
    并行任务通过parallel组合

#### gulp的异步任务

#### gulp构建过程核心工作原理
    基于文件流的构建

#### gulp文件操作API
```js
    yarn add gulp-clean-css --dev // 压缩
    yarn add gulp-rename --dev // 重命名
    yarn add del --dev // 自动删除dist
    yarn add gulp-load-plugins --dev // 自动加载全部API，插件名为对象属性
```
#### gulp 案例 - 开发服务器
```js
    yarn add browser-sync --dev // 不属于gulp插件，需单独引入插件
    需要配置
    const serve = () => {
        watch('路径'， 命令名)
        图片字体可以单独监听，减少develop阶段构建次数，降低时间损耗
        watch([
            'src/assets/images/**',
            'src/assets/fonts/**',
            'public/**'
        ], bs.reload)
        
        bs.init({
            notify: false, // 提示
            port: 8081, // 端口
            open: false, // 默认是否直接打开浏览器
            // files： 'dist/**', // 监听文件是否发生改变进行浏览器刷新
            // files可以通过bs.reload代替， 通过流的形式推向浏览器
            files： 'dist/**', // 监听文件是否发生改变进行浏览器刷新
            server: {
                baseDir: 'dist' // 运行路径
                routes： {
                    '/node_modules': 'node_modules'
                }
            }
        })
    }
```
#### gulp案例-监视变化以及构建优化
    gulp中的watch
    在上面serve方法服务器配置之前进行监视

#### gulp案例-useref文件引用处理
    yarn add gulp-useref --dev // 自动加载使用依赖（引用关系）
    在dist中寻找模板，不是在src下
    去掉构建注释合并到同一个文件之中

#### gulp案例-文件压缩
```js
    yarn add gulp-htmlmin --dev // 压缩HTML文件
    yarn add gulp-uglify --dev // 压缩js文件
    yarn  add gulp-clean-css --dev // 压缩css文件
    yarn add gulp-if --dev // 判断
```
    
    