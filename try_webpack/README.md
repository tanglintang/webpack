# webpack

## 安装
- 全局 `npm install -g webpack webpack-cli`
- 本地 `npm install webpack webpack-cli -D`

- 配置
`npm init -y`
  "scripts": {
    "build": "webpack --mode production"
  },
- 
## 概念
webpack 是一个打包 (build) 工具，将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源

为什么要打包？
    常规的（落后的）开发方式 =》 jQuery、css、html =》将文件交付给后端

MVVM 时代 一切皆可打包

webpack 将现代 js 开发中的各种新型技术，集合打包，打包前无法运行，如（js es6 module、stylus 等不支持浏览器直接执行，.hbs 模板编译，.vue ）在目标容器上运行


![webpack](http://www.runoob.com/wp-content/uploads/2017/01/what-is-webpack.png)

>一切静态资源 打包 =》目标项目
>> Webpack 可以将多种静态资源 js、css、less 转换成一个静态文件，减少了页面的请求。

## webpack 配置
> 根目录 webpack.congif.js

### 入口文件
`entry: './src/index.js',`
### 出口
```js
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
```
- node api path 操作文件路径
- __dirname 系统级变量，当前文件绝对路径
```js
console.log(__dirname)
// d:\MXJS\webpack\try_webpack
```
- path.resolve 路径拼接
```js
console.log(path.resolve(__dirname, 'dist'))
// d:\MXJS\webpack\try_webpack\dist
```

### loader
> loader 让 webpack 能够去处理那些非 JavaScript 文件, loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块
```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: [
                'css-loader',
                'less-loader'
            ]
        }
    ]
}
```
对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use

安装css-loader less-loader style-loader less 后即可使用 less

### 文件依赖
在入口文件使用模块化方案引入文件，并按照引入顺序打包文件

### plugins
- ExtractTextPlugin css 文件抽离
安装 extract-text-webpack-plugin

```js
// 抽离打包好的 (css) 文件，解决打包时 css 混入 js 的问题
const ExtractTextPlugin = require('extract-text-webpack-plugin')
```
```js
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })

            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
```
`$ yarn add extract-text-webpack-plugin@last -D`
完成将生成 .css 文件

- html 打包
`const HtmlWebpackPlugin = require('html-webpak-plugin')`

```js
plugins: [
    new HtmlWebpackPlugin({
        file: 'index.html',
        template: './src/index.html'
    })
]
```

### 加入babel
$ yarn add babel-core babel-loader babel-preset-env -D
```js
rules: [
    {
        test: /\.js$/,
        // 范围 src 下
        include: [
            path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader'
    },
]
```

### 外部资源引用
`$ yarn add file-loader -D`
```js
{
    test: /\.(gif|png|)$/,
    use: [
        {
            loader: 'file-loader'
        }
    ]
}
```