const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: ['url-loader']
            },
            {
                test: /\.(png|jpg?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: 8 * 1024 //kb
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpackVue',
            filename: 'index.html',
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new ExtractTextPlugin('css/style.css'),
    ],
    resolve: {
        extensions: ['*', '.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}