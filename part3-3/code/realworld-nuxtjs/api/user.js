import { request } from '@/plugins/request'

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data // 同名可省略
    })
}

// 用户注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data: data // 同名可省略
    })
}

// 获取用户资料
export const getUser = data => {
    return request({
        method: 'GET',
        url: '/api/user'
    })
}
// 更新用户资料
export const updataUser = data => {
    return request({
        method: 'PUT',
        url: '/api/user',
        data
    })
}