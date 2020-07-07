#### 简答题

1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

答：一切以提高效率、降低成本、质量保证为目的的手段都属于工程化。 可以解决传统语言或语法的弊端；解决无法使用模块化、组件化；减少重复的机械式工作；统一代码风格、保证质量；减少对后端的依赖

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

答：更重要的是提供了项目规范和约定

#### 编程题

1、概述脚手架实现的过程，并使用Node.js完成一个自定义的小型脚手架工具

答： 1、通过命令行交互询问用户问题； 2、根据用户回答的结果生成文件 
```js
#!/usr/bin/env node

const inquirer = require('inquirer') const path = require('path') const fs = require('fs')

inquirer.prompt([ { type: 'input', name: 'name', message: 'Project name?' } ]) .then(anwsers => { // console.log(anwsers) // 根据用户回答的结果生成文件

// 模板目录
const tmplDir = path.join(__dirname, 'templates')
// 目标目录
const desrDir = process.cwd()
})
```

2、尝试使用gulp完成项目的自动化构建

3、使用Grunt完成项目的自动化构建