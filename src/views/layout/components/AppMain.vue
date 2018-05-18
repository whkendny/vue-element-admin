<template>
  <section class="app-main" style="min-height: 100%">
    <transition name="fade" mode="out-in">
      <!--
      包一层 keep-alive 主要是为了缓存 <router-view>的，配合页面的tabs-view 标签导航使用
      include - 字符串或正则表达式。只有匹配的组件会被缓存。
      exclude - 字符串或正则表达式。任何匹配的组件都不会被缓存。
      -->
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // 在router-view上加上 :key=key 保证路由切换时都会重新渲染触发钩子
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
