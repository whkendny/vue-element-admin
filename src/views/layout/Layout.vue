<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<!-- 侧边导航栏 -->
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<!-- 顶部导航栏 -->
			<navbar></navbar>
			<tags-view></tags-view>
			<app-main></app-main>
		</div>
	</div>
</template>

<script>

//	说明： 1.侧边栏是基于 element-ui 的 el-menu 改造
//	2.侧边栏是通过读取路由并结合权限判断而动态生成的, 而且还需要支持路由无限嵌套, 所以这里还使用到了递归组件。
import { Navbar, Sidebar, AppMain, TagsView } from './components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
</style>
