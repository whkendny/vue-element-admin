'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 引入webpack-merge插件用来合并webpack配置对象，也就是说可以把webpack配置文件拆分成几个小的模块，然后合并
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf') // 导入webpack基本配置
const HtmlWebpackPlugin = require('html-webpack-plugin') //生成html文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 对webpack编译出错进行处理
const portfinder = require('portfinder') //获取port

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 合并webpack配置
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true }) // 样式的处理
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized(定制) in /config/index.js
  devServer: {
    clientLogLevel: 'warning', // 在DevTools展示信息的配置, 可选值: none, error, warning or info (default)
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 是否允许自动开启浏览器
    overlay: config.dev.errorOverlay // 在浏览器中全屏显示编译错误或者警告
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // 浏览器访问静态资源的路径
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin, 控制在控制台中输出的显示信息
    watchOptions: {
      poll: config.dev.poll, // 轮询文件的更改
    }
  },
  plugins: [
    // 在编译的时配置全局常量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),   // 启用热模块更新(HMR)
    new webpack.NamedModulesPlugin(), // HMR shows correct file names and path in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 跳过错误编译
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 生成html
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      title: 'vue-element-admin',
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
