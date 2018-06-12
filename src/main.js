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

// 全局配置 `Element`, 通过install 安装的组件(插件), 需要通过Vue.use()引入Vue中使用
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法
})

// register global utility filters. (全局注册Vue的过滤器)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/**
*   Vue.config是一个对象, 包含Vue的全局配置. 包含以下属性:
*   silent: boolean, 是否取消所有日志与警告
*   optionMergeStrategies : 自定义选项合并策略 (https://cn.vuejs.org/v2/guide/mixins.html#自定义选项合并策略)
*   devtools : boolean; 配置是否允许 vue-devtools 检查代码。开发版默认: true, 生产版默认false
*   errorHandler: Function; 指定组件的渲染和观察期间未捕获错误的处理函数。
*   warnHandler : Function; 为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。
*   ignoredElements : Array<string | RegExp>; 须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)。
*   keyCodes: { [key: string]: number | Array<number> }; 给 v-on 自定义键位别名。
*   performance: boolean; 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。
只适用于开发模式和支持 performance.mark API 的浏览器上。
*   productionTip: boolean; 设置为 false 以阻止 vue 在启动时生成生产提示。
*/
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store, // 在根实例中注册 store选项, 该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
  i18n,
  template: '<App/>',
  components: { App }
})
