'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// eslint 配置规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',  // 标识应用这些规则，即使规则覆盖（高级选项）
  include: [resolve('src'), resolve('test')], //E:\wwwroot\vue-element-admin\src
  options: {
    formatter: require('eslint-friendly-formatter'), // 通过该模块可以友好的提示eslint报错并直接定位到报错的位置
    emitWarning: !config.dev.showEslintErrorsInOverlay // 触发的错误是否覆盖浏览器页面
  }
})
//__dirname: 全局变量，存储的是文件所在的文件目录( E:\wwwroot\vue-element-admin\build)
module.exports = {
  context: path.resolve(__dirname, '../'), // E:\wwwroot\vue-element-admin\
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot, // 编译后的目录 E:\wwwroot\vue-element-admin\dist
    filename: '[name].js', // 编译后的js文件
    publicPath: process.env.NODE_ENV === 'production' // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 配置在尝试过程中用到的后缀列表, 按先后顺序查找, 如果不存在就报错
    alias: { // 通过别名来把原导入路径映射成一个新的导入路径
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: { // module: 配置模块处理
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {  // *.vue 文件模块的处理
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      { // *.js 文件模块的处理
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      { // *.svg 文件模块的处理
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      { // 图片文件的处理
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      { // 音频文件的处理
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      { // 字体文件的处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: { //在其他环境(如 browser)允许node代码运行, 具体参见: https://webpack.js.org/configuration/node/
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
