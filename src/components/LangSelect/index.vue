<template>
  <el-dropdown trigger="click" type="primary" @command="handleSetlang">
    <div class="pl-1 pr-4 nav-icon-box">
      <svg-icon icon-class="language" class="nav-svg-icon" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="appStore.language === item.value"
        >
          <h3 class="pt-1 pb-1 font-langPx14">{{ item.label }}</h3>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { useI18n } from 'vue-i18n'

const state = reactive({
  langOptions: [
    { label: '中文', value: 'zh' },
    { label: 'English', value: 'en' },
  ],
})
const appStore = useAppStore()

const { locale } = useI18n()
const handleSetlang = lang => {
  localStorage.setItem('language', lang)
  appStore.language = lang
  // auto refresh not reload the page
  locale.value = lang
  // location.reload()
}
// 导出属性到页面中使用
const { langOptions } = toRefs(state)
</script>

<style scoped lang="scss"></style>
