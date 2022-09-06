<template>
  <el-config-provider :locale="lang[appStore.language]" :size="appStore.size" namespace="el">
    <router-view />
  </el-config-provider>
</template>
<script setup>
// lang and size config
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

import { useAppStore } from '@/store/app'

const appStore = useAppStore()

const lang = { zh, en }
</script>
