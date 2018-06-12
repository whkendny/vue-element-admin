// 生产环境中使用路由懒加载, import
module.exports = file => () => import('@/views/' + file + '.vue')
