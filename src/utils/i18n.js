// translate router.meta.title, be used in breadcrumb sidebar tagsview
// 相关文档: http://kazupon.github.io/vue-i18n/installation.html#compatibility-note
// 源码分析: https://segmentfault.com/a/1190000011347927
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)
  const translatedTitle = this.$t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js
  if (hasKey) {
    return translatedTitle
  }
  return title
}
