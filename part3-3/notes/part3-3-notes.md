## 
### 任务一

### Vuex数据流管理及Vue.js服务器渲染（SSR）
#### 虚拟DOM

### 任务二
### 服务端渲染基础
#### 概述
                                                                       
#### 什么是渲染

#### 传统的服务端渲染
```js
npm i express // node创建好服务端
使用nodemon index.js // 启动服务器端代码
npm i art-template // 第三方的模板引擎
```
传统的服务端渲染在网页越来越负责的时候，会有很多不足
- 前后端代码完全耦合在一起，不利于开发和维护
- 前端没有足够发挥空间
- 服务端压力大
- 用户体验一般

#### 客户端渲染 
前端更加独立，不局限后端
缺点
- 首屏渲染慢
- 不利于SEO

#### 为什么客户端渲染首屏渲染慢
- csr： 客户端渲染

#### 为什么客户端渲染不利于SEO
- SEO 网站在搜索引擎的排名
客户端页面搜索到的只是一个html的空页面

#### 现代化的服务端渲染
也就是同构渲染 = 后端渲染 + 前端渲染
- 基于React、vue等框架，客户端渲染和服务器端渲染的结合
    - 在服务器端执行一次，用于实现服务器端渲染（首屏直出）
    - 在客户端再执行一次，用于接管页面交互
- 核心解决SEO和首屏渲染慢的问题
- 拥有传统服务端渲染的优点，也有客户端渲染的优点

#### 以Vue生态的Nuxt.js为例掩饰同构渲染应用
```js
npm init -y
npm i nuxt
npm run dev // 创建完项目后启动项目
// nuxt会默认为pages文件夹创建路由，默认路由为index.vue
// localhost:3000/about
```
#### 同构渲染的SPA应用

#### 同构渲染应用的问题
- 开发条件所限
    - 浏览器特定的代码只能在某些生命周期钩子函数中使用；
    - 一些外部扩展库需通过处理后才能在服务端渲染应用中运行；
    - 不能再服务端渲染期间操作dom
    - ……
    - 某些代码操作需要区分运行环境
- 设计构建设置和部署的更多要求
    - 客户端渲染
        - 只需构建客户端应用即可，可以部署在任意web服务器中
    - 同构渲染
        - 需要构建两个端，只能部署在Node.js Server中
- 更多的服务器端负载
    - 在node中渲染完整的应用程序，相比仅仅提供静态文件的服务器需要大量占用CPU资源
    - 如果应用在高流量环境下使用，需要准备相应的服务器负载
    - 需要更多的服务端渲染优化工作处理
- 服务端渲染使用建议
    - 首屏渲染速度是否真的重要？
    - 是否真的需求SEO？

### 任务三
### NuxtJS基础
#### NuxtJS介绍
- 一个基于Vue.js生态的第三方开源服务端渲染应用框架
- 它可以帮我们轻松地使用Vue.js技术栈构建同构应用
- Nuxt.js主要关注的是应用的UI渲染
- 它可以初始化新项目的基本结构代码
- 官网：[代码链接]（https://zh.nuxtjs.org/）
- GitHub仓库[代码链接]（https://github.com/nuxt/nuxt.js）

#### 异步数据-asyncData
- https://zh.nuxtjs.org/guide/async-data
- 基本用法
    - 他会将asyncData返回的数据融合组件data方法返回数据一并给组件
    - 调用时机：服务端渲染期间和客户端路由更新之前
- 注意事项
    - 只能在页面组件中使用
    - 没有this，因为它是在组件初始化之前被调用的

如果想要动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中发送请求拿数据
```js
    async asyncData () {
        console.log('asyncData')
        console.log(this)
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:3000/data.json'
        })
        return res.data
    }
```
如果是非异步数据或者普通数据，则正常初始化到data中即可

#### 异步数据-上下文对象
```js
    async asyncData (context) {
        console.log(context, '上下文对象，可自行命名')
        console.log(this)
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:3000/data.json'
        })
        const id = Number.parseInt(context.params.id)
        // 获取异步数据的元素使用上下文对象，不能用this
        return {
            article：data.posts.find(item => item.id === id)
        }
    }
```

### 任务四 NuxtJS综合案例
#### 案例介绍
- 案例名称： RealWorld
- 一个开源的学习项目，帮助开发者快速学习新技能
- GitHub仓库：https://github.com/gothinkster/realworld
- api接口地址
- 在线示例： https:demo.realworld.io/#/
##### 学习收获
- 掌握使用Nuxt.js开发同构渲染应用
- 增强Vue.js实践能力
- 掌握同构渲染应用中常见的功能处理
    - 用户状态管理
    - 页面访问权限处理
    - SEO优化
    - …
- 掌握同构渲染应用的发布与部署

#### 项目实战
```js
    mkdir nameFile 
    npm i nuxt
    npm init -y
    // 修改package.json中scripts中的脚本配置
    // "dev": "nuxt"
    根目录下新建一个pages文件, 初始化路由
    Ctrl + C Ctrl + V
    ……
    npm i axios
    npm i js-cookie
    npm i cookieparser
    
    // 一个轻量级的格式化时间的第三方库
    npm install dayjs --save
    // markdown格式转化为HTML的第三方包
    npm install markdown-it --save
```

#### Nuxt.js发布部署 打包
- https://zh.nuxtjs.org/guide/commands
在package.json中配置
```js
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start"
  },
```

#### 发布部署-最简单的部署方式
- 配置Host + Port
    ```js
    <!-- nuxt.config.js中配置 -->
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    ```
- 压缩发布包
- 把发布包传到服务端
- 解压
- 安装依赖
- 启动服务

#### 购买服务器
阿里云买了一个服务器，真贵

#### 连接服务器
```js
ssh ubuntu@42.192.***.*** // 账户名@公网ip
输入密码登录
pwd // 查看所在文件夹当前目录
cd ../ // 到达根目录
exit // 退出服务器
 ```

#### 服务器安装nodejs
```js
先登录服务器
echo $PATH  // 查看环境变量
// 第一种方式下载
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash // 下载一个脚本，会自动添加环境变量，但是这一步我没有自动添加
nvm --version  // # 退出后重新连接 ssh
echo $PATH // # 查看环境变量
nvm install --lts // # 安装 Node.js lts
// 上面这几步没有成功，环境变量添加不了

// 然后换了一种下载方式，直接下载压缩包解压，手动添加环境变量
// 第二种方式
wget https://npm.taobao.org/mirrors/node/v10.6.0/node-v10.6.0-linux-x64.tar.xz

tar -xvf node-v10.6.0-linux-x64.tar.xz  // tar -xvf + 刚才安装的node版本名称
mv node-v10.6.0-linux-x64 node  // 更改node安装目录名称(文件夹名)
ln -s /root/+第三步更改的文件名+/bin/node /usr/sbin/node   // 可以通过pwd获取路径
ln -s /root/+第三步更改的文件名+/bin/npm /usr/sbin/npm  
node -v
npm -v

// 由于我的账户是普通账户，所以需要暂时开启root权限
// 登录普通账户后可直接输入
sudo passwd root // 更新root密码，在不知道root密码的时候执行此命令
重新设置root密码
// 普通用户获得root权限的方式
su
输入root密码

```
prohibit-password

