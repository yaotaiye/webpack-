const path = require('path');
const webpack = require('webpack');
//console.log(webpack.optimize)
const version = require('./package.json').version;
// 引入监听html改动更新
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入分离css、js插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Create multiple instances
//const extractCSS = new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true });
//const extractLESS = new ExtractTextPlugin({ filename: 'css/[name].less', disable: false, allChunks: true });

/*eval-source-map使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。
不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项*/
module.exports = {
    //devtool: 'dev-source-map', //输出调试报错信息，这样的模式下打包文件较大，打包时不建议采用此模式
    entry: {
        index:"./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].build.js",
       // library: 'tk',//将一个js组件里面的方法，暴露在全局下，对应js里的书写module.exports=tk
        //libraryTarget: 'umd',
    },
    devServer: {
        port:"3000",
        contentBase: "./src",//本地服务器所加载的页面所在的目录
       // colors: true,//终端中输出结果为彩色, 新版本已经移除该属性
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module:{
        loaders:[
            { test: /\.(htm|html)$/i, loader: 'html-withimg-loader' },//在webpack-dev-server 环境下加载图片插件
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015']}}, //注意得加 es2015
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.less/,loader: 'style-loader!css-loader!less-loader'},
            //{ test: /\.(png|jpg|git)$/,loader: 'url-loader?limit=10000'}//url-loader用于处理图片base64，file-loader是用于加载css里的背景图片
            { test: /\.(png|jpg|git)$/,loader: 'url-loader?limit=3000'}//url-loader用于处理图片base64，file-loader是用于加载css里的背景图片
        ]
    },
    // 插件引入,注意新版webpack.optimize无法按以下的方式使用，请安装 npm install webpack@1.13.2 --save-dev
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // html 模板路径
           // favicon: './src/img/favicon.ico',     //favicon路径, 通过webpack引入同时可以生成hash值
          //  filename: './index.html',         //生成的html存放路径, 相对于path
            inject: "body",                         //js插入的位置, true/'head'/'body'/false
          //  hash: true,                         //为静态资源生成hash值
         //   chunks: ['index', 'index2'],        //需要引入的入口文件, 不配置就会引入所有页面的资源
            minify: {                             //压缩HTML文件
                removeComments: true,             //移除HTML中的注释
                collapseWhitespace: false         //删除空白符与换行符
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ //压缩js
            compress: {
                warnings: false
            }
        })
        //new webpack.optimize.CommonsChunkPlugin({ name: "c", filename: "c.js" })

    ]

};