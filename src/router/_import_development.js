// 开发环境中不使用路由懒加载, require
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
