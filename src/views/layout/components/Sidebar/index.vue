<template>
  <!-- 侧边导航栏 -->
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar' // 侧边导航栏滑动

export default {
  components: { SidebarItem, ScrollBar },
  // 通过计算属性从sotre实例 中读取状态
  computed: {
    // 在计算属性中 通过 mapGetters 辅助函数获取对应的状态
    // `...`, 对象展开运算符, 将此对象混入到外部对象中
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
