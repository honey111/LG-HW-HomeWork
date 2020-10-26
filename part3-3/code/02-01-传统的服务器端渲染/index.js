const express = require('express')
const fs = require('fs') // node 读取文件
const template = require('art-template') // 第三方的模板引擎
// 后端的服务文件

const app = express()

app.get('/', (req, res) => {
    // 1、获取页面模板
    const templateStr = fs.readFileSync('./index.html', 'utf-8')
    // console.log(templateStr)
    // 2、获取数据
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
    // 3、渲染：数据 + 模板 = 最终结果
    // const html = template.render('hello {{message}}', {
    //     message: '世界'
    // })
    const html = template.render(templateStr, data)
    console.log(html)

    // 4、把渲染结果发送给客户端
    res.send(html)
})

app.listen(3000, () => console.log('running……'))
