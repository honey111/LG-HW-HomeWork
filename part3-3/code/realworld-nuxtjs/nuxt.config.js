// Nuxt.js 配置文件

module.exports = {
    router: {
        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // console.log(routes)
            // 清除 Nuxt.js基于pages目录默认生成的路由表规则
            routes.splice(0)

            routes.push(...[
                {
                    path: '/',
                    component :resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '', // 默认子路由
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        }
                    ]
                }
            ])
        }
    }
}