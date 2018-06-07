import Vue from 'vue'
import Element from 'element-ui'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization

import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法
})

// register global utility filters. (全局注册Vue的过滤器)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store, // 在根实例中注册 store选项, 该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  i18n,
  template: '<App/>',
  components: { App }
})
