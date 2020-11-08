import request from '@/utils/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params // 同名可省略
    })
}
// 获取关注的用户文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        headers: {
            // 注意数据格式： Token空格数据Token
            Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIzMzM5LCJ1c2VybmFtZSI6ImhvbmV5MSIsImV4cCI6MTYxMDAyNTU3N30.aZrz2IEf_RLVS-uHn5rft0cI6u8iGJ-69ayAUuu8OYE`
        },
        params // 同名可省略
    })
}