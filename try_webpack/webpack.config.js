const path = require('path')

// 系统级变量，当前文件绝对路径
console.log(__dirname)
// path.resolve 路径拼接
console.log(path.resolve(__dirname, 'dist'))

// 抽离打包好的 (css) 文件，解决打包时 css 混入 js 的问题
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// html 打包
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // 范围 src 下
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(gif|png|)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            { from: './src/assets/favicon.ico', to: 'favicon.ico' }
        ])
    ]
}