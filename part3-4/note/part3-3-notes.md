## 搭建自己的SSR、静态站点生成（SSG）及封装Vue.js组件库
### 任务一：搭建自己的SSR
#### 渲染一个Vue实例
```js
mkdir vue-ssr
cd vue-ssr
npm init -y
npm i vue vue-server-renderer
创建一个server.js文件

const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
// 渲染器
const app = new Vue({
  template: `
    <div class="app">
      <h1>{{ message }}</h1>
    </div>
  `,
  data: {
    message: '拉勾教育'
  }
})
renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
})
```

#### 结合到Web服务中
```js
npm i express

在上面的文件中添加
const express = require('express')
const server = express() // 创建一个server实例
// express路由中渲染vue实例，然后发送给客户端
server.get('/', (req, res) => {
  const app = new Vue({
    template: `
      <div class="app">
        <h1>{{ message }}</h1>
      </div>
    `,
    data: {
      message: '拉勾教育'
    }
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8') // 给请求头添加编码解决乱码问题
    // 或者返回一个完成的html模板解决乱码
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
  })
})
// 启动服务
server.listen(3000, () => {
  console.log('server running at port 3000.')
})
```

#### 使用HTML模板
在根目录添加一个index.template.html模板文件
前后不能有空格，渲染替换的位置
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!--vue-ssr-outlet-->
</body>
</html>
```
```js
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
}) // 渲染器
……
  renderer.renderToString(app, (err, html) => {
    if (err) {
      return res.status(500).end('Internal Server Error.')
    }
    res.setHeader('Content-Type', 'text/html; charset=utf8') // 给请求头添加编码解决乱码问题
    // 或者返回一个完成的html模板解决乱码
    res.end(html) // z这里直接用html就行，会用新建的模板自动替换
  })
……
```