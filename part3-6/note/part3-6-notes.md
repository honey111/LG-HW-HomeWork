## Vue.js + Vuex + TypeScript 实战项目开发与项目优化
### 任务一: Vue 项目实战
#### 创建项目
`js
vue create edu-boss-fed
空格选择 Enter选择下一项
history模式好看简洁但是兼容性不好，不选择
选择dart-sass功能、性能比node-sass更好一点
创建项目后运行查看
`
#### 加入Git版本管理
（1）创建远程仓库
（2）将本地仓库推到线上
如果没有本地仓库
`js
<!-- 创建本地仓库 -->
git init 
<!-- 将文件添加到暂存区 -->
git add .
<!-- 提交历史记录 -->
git commit “提交日志”
<!-- 添加远端仓库地址 -->
git remote add origin 远程仓库地址
<!-- 推送提交 -->
git push -u origin master
`
如果已有本地仓库
`js
<!-- 添加远端仓库地址 -->
git remote add origin 远程仓库地址
`
