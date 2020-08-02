# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

#### 项目说明文档
1、安装webpack webpack-cli

2、在webpack.common.js中配置webpack相关配置

3、module.exports导出配置项

4、确定打包入口文件以及打包输出文件

5、配置相关loader处理资源文件

6、new CleanWebpackPlugin() 自动清除目录

7、new HtmlWebpackPlugin() // 生成一个HTML文件

8、new ExtractTextPlugin('css/style.css') 从一个或多个包中提取文本到单独的文件中

9、resolve 配置模块如何解析