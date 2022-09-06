<template>
  <div :class="classObj">
    <!--left side-->
    <Sidebar class="sidebar-container" />
    <!--right container-->
    <div class="main-container">
      <Navbar v-if="settings.showTopNavbar" />
      <TagsView v-if="settings.showTagsView" />
      <AppMain />
    </div>
  </div>
</template>

<script setup name="Layout">
import { Sidebar, Navbar, AppMain, TagsView } from './components'

import ResizeHook from './hook/ResizeHandler'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const opened = computed(() => {
  return appStore.sidebar.opened
})

const settings = computed(() => {
  return appStore.settings
})
const classObj = computed(() => {
  return {
    closeSidebar: !opened.value,
    hideSidebar: appStore.device === 'mobile',
  }
})

ResizeHook()
</script>

<style lang="scss" scoped>
.main-container {
  min-width: 320px;
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: var(--side-bar-width);
  position: relative;
  background-color: #f2f2f2;
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--side-bar-width) !important;
  background-color: var(--el-menu-bg-color);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.closeSidebar.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0 !important;
  }
}
</style>
