// 基于axios 封装的请求模块

import axios from 'axios'

const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

// // 请求拦截器
// // Add a request interceptor
// // 任何请求都要经过请求拦截器
// // 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
// request.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     // 请求就会经过这里
//     config.headers.Authorization = `Token`

//     // 返回config请求配置对象
//     return config;
// }, function (error) {
//     // 如果请求失败（此时请求还没有发出去）就会进入这里
//     // Do something with request error
//     return Promise.reject(error);
// });

// // 响应拦截器
// // Add a response interceptor
// request.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

export default request