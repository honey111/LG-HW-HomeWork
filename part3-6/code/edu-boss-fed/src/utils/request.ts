import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 通过在这里改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 注意：这里一定要返回 config, 否则请求就发不出去了
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) { // 状态码为2xx都会进入这里
  // console.log(response)
  // 如果是自定义错误状态码，错误处理写在这里
  return response
}, async function (error) { // 超出2xx 状态码都执行这里
  // console.log(error)
  // 如果使用的是HTTP状态码，错误处理写在这里
  // console.dir(error)
  if (error.response) { // 请求发出去收到响应了，但是状态码超出2xx范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token无效（没有提供token， token是无效的，token过期了）
      // 如果有refresh_token 则尝试使用refresh_token获取新的access_token
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 尝试刷新获取新的token
      try {
        const { data } = await axios.create()({
          method: 'POST',
          url: '/front/user/refresh_token',
          data: qs.stringify({
            refreshtoken: store.state.user.refresh_token
          })
        })
        // 成功了 =》把本次失败的请求重新发出去
        // 把刷新拿到的新的access_token 更新到容器和本地存储中
        store.commit('setUser', data.content)
        // 把本次失败的请求重新发出去
        // console.log(error.config) // 失败请求的配置信息
        return request(error.config)
      } catch (err) {
        // 把当前登录用户状态清除
        store.commit('setUser', null)
        // 失败了 =》 跳转登录页面重新登录获取新的token
        redirectLogin()
        return Promise.reject(error)
      }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  return Promise.reject(error)
})

export default request
