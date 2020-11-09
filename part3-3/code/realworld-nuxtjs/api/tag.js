import { request } from '@/plugins/request'

// 获取w文章标签
export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}