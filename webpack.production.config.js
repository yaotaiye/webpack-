const path = require('path');
const webpack = require('webpack');
// 引入监听html改动更新
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //devtool: 'dev-source-map', //输出调试报错信息，这样的模式下打包文件较大，打包时不建议采用此模式
    entry: {
        index:"./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].build.js"

    },
    module:{
        loaders:[
            { test: /\.(htm|html)$/i, loader: 'html-withimg-loader' },//在webpack-dev-server 环境下加载图片插件
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}}, //记得加 es2015
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less/,loader: 'style-loader!css-loader!less-loader'},
            { test: /\.(png|jpg|git)$/,loader: 'url-loader?limit=3000'}//url-loader用于处理图片base64，file-loader是用于加载css里的背景图片
        ]
    },
    devServer: {
        port:"3000",
        contentBase: "./src",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    // 插件引入,注意新版webpack.optimize无法按以下的方式使用，请安装 npm install webpack@1.13.2 --save-dev
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // html 模板路径 ,可以是  jade: 'path/to/yourfile.jade' ,不过要安装loader
            inject: "body",                         //js插入的位置, true/'head'/'body'/false
            minify: {                             //压缩HTML文件
                removeComments: true,             //移除HTML中的注释
                collapseWhitespace: true         //删除空白符与换行符
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({  //压缩输出的代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']    //排除关键字
        })

    ]

};