const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
}) // 渲染器

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
    res.end(html)
  })
})

// 启动服务
server.listen(3000, () => {
  console.log('server running at port 3000.')
})
