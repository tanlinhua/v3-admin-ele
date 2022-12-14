<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span
        v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
        class="no-redirect"
      >
        {{ generateTitle(item.meta?.title) }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import useI18n from '@/hooks/useI18n'

import { compile } from 'path-to-regexp'

const { generateTitle } = useI18n()

const levelList = ref(null)

const route = useRoute()
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    // it can replace the first page if not exits
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
  }
  levelList.value = matched.filter(
    item => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

const isDashboard = route => {
  const name = route?.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const pathCompile = path => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const router = useRouter()
const handleLink = item => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}
watch(
  () => route.path.replace('/redirect', ''),
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: var(--breadcrumb-no-redirect);
    cursor: text;
  }
}
</style>
