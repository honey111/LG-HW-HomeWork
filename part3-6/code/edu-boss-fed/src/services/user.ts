/**
 * 用户相关模块
 */
import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string,
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    
    // 如果data是普通对象，则Content-type是application/json
    // 如果data是qs.stringify(data)转化之后的数据是：key=values&key1=value1,则Content-type会被设置为'application/x-www-form-urlencoded'
    // 如果data是 FormData对象，则Content-type是 multipart/form-data

    data: qs.stringify(data) // axios 默认发送的是application/json 格式的数据
  })
}