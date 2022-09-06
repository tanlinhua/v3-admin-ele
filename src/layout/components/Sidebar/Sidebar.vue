<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <Logo v-if="settings.sidebarLogo" :collapse="!isCollapse" />
    <!--router nav-->
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical"
        :default-active="activeMenu"
        :collapse="!isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        @select="selectMenu"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'
// 导入配置文件
const appStore = useAppStore()
const settings = computed(() => {
  return appStore.settings
})

const route = useRoute()
const permissionStore = usePermissionStore()
const routes = computed(() => {
  return permissionStore.routes
})
const isCollapse = computed(() => {
  return appStore.sidebar.opened
})

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path.replace('/redirect', '')
})

const selectMenu = () => {
  if (appStore.device === 'mobile') {
    appStore.M_toggleSideBar()
  }
}
</script>

<style lang="scss">
//fix open the item style issue
.el-menu-vertical {
  margin-bottom: 50px !important;
  width: var(--side-bar-width);

  .el-menu {
    background-color: var(--el-menu-open-bg-color);
  }
}
</style>
