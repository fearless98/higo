const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),//打包的最终目的，在dist下输出一个叫app.jsx的文件
        publicPath:'/dist/',
        filename: 'js/app.js'
  },
  resolve:{
        //处理别名
        alias: {
            page        : path.resolve(__dirname,'src/page'),
            util        : path.resolve(__dirname,'src/util'),
            service     : path.resolve(__dirname,'src/service'),
            component   : path.resolve(__dirname,'src/component')
        }
  },
  module:{
    rules: [
        //react语法的处理
        {
            test:/\.jsx$/,//正则 解析所有的jsx文件
            exclude:/(node_modules)/,//跳过node_modules文件夹
            use: {
                loader: 'babel-loader',//解析成ES5
                options: {
                    presets: ['env','react']
                }
            }
        },
        //css文件的处理
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        //sass文件的处理
       {
            test:/\.scss$/,
            use:ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:['css-loader','sass-loader']
            })
        },
        //图片的配置
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                      limit: 8192,
                      name:'resource/[name].[ext]'
                    }
                }
            ]
        },
        //字体图标的配置
        {
            test: /\.(woff|woff2|eot|svg|ttf|otf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name:'resource/[name].[ext]'
                    }
                }
            ]
        }
    ]
  },
  plugins: [
        //处理HTML文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon:'./favicon.icon'
        }),
        //独立css文件
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'js/base.js'
        })
  ],
  devServer: {
        port:8086,
        historyApiFallback:{
            index:'/dist/index.html'
        },
        proxy : {
            '/admin' :{
                target : "http://higo.party",
                changeOrigin : true
            },
            '/admin/admin/logout.do' :{
                target : "http://higo.party",
                changeOrigin : true
            },
            '/common' :{
                target : "http://higo.party",
                changeOrigin : true
            }
        }
   }
};