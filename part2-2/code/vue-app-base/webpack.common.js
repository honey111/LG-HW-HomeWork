const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[contenthash:6].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8 * 1024 //kb
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}