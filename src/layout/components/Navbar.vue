<template>
  <div class="navbar rowBC reset-el-dropdown">
    <div class="rowSC">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb v-if="appStore.device === 'desktop'" class="breadcrumb-container" />
    </div>
    <!--nav title-->
    <div v-if="settings.showNavbarTitle" class="heardCenterTitle">
      {{ settings.showNavbarTitle }}
    </div>
    <div v-if="settings.ShowDropDown" class="right-menu rowSC">
      <ErrorLog />
      <Refresh />
      <Notice />
      <!-- <LangSelect /> -->
      <ScreenLock />
      <ScreenFull v-if="appStore.device === 'desktop'" />
      <Password ref="passwordRef" />
      <el-dropdown trigger="click" size="medium">
        <div class="avatar-wrapper rowCC">
          <img src="@/assets/avatar.png" class="user-avatar" />
          <div class="user-name">{{ userStore.username }}</div>
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="setPassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
// import LangSelect from '@/components/LangSelect/index.vue'
import ScreenLock from '@/components/ScreenLock/index.vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import ErrorLog from './ErrorLog'
import Refresh from './Refresh'
import Notice from './Notice'
import ScreenFull from './ScreenFull'
import Password from './Password'

import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const settings = computed(() => {
  return appStore.settings
})
const opened = computed(() => {
  return appStore.sidebar.opened
})
const appStore = useAppStore()
const toggleSideBar = () => {
  appStore.M_toggleSideBar()
}

// 修改密码
const passwordRef = ref(null)
const setPassword = () => {
  passwordRef.value.showDialog()
}

/*
 * 退出登录
 * */
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const loginOut = () => {
  userStore.logout().then(() => {
    ElMessage({ message: '退出登录成功', type: 'success' })
    router.push(`/login?redirect=/`)
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);
}

//logo
.avatar-wrapper {
  position: relative;
  cursor: pointer;
  color: #5a5e66;

  .user-avatar {
    margin-left: 10px;
    cursor: pointer;
    width: 34px;
    height: 34px;
    border-radius: 17px;
  }

  .user-name {
    display: inline-block;
    padding-left: 8px;
  }

  .el-icon-caret-bottom {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: 25px;
    font-size: 12px;
  }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  cursor: pointer;
  margin-right: 10px;
  background-color: var(--nav-bar-right-menu-background);
}
</style>

<style lang="scss">
.nav-icon-box {
  font-size: 0;
}

.nav-svg-icon {
  font-size: 18px;
  color: #5a5e66;
  outline: none;
}
</style>
