<template>
  <div class="pl-1 pr-1 nav-icon-box">
    <el-tooltip effect="dark" content="锁屏" placement="bottom">
      <svg-icon icon-class="lock" class="nav-svg-icon" @click="handleLock" />
    </el-tooltip>
  </div>
  <transition enter-active-class="screen-locker-lock" leave-active-class="screen-locker-unlock">
    <div v-if="lockInfo.open" class="screen-locker">
      <div class="screen-avatar">
        <img src="@/assets/avatar.png" />
        <div class="screen-nickname">屏幕已锁定</div>
      </div>
      <div class="screen-password">
        <input
          ref="passwordRef"
          v-model="password"
          type="password"
          placeholder="解锁密码"
          autofocus="autofocus"
          class="screen-password-input"
        />
      </div>
      <div class="tip-message">{{ tip }}</div>
      <div class="screen-btns">
        <el-button
          type="danger"
          :icon="SwitchButton"
          circle
          class="screen-password-button"
          @click="loginOut"
        />
        <el-button
          type="primary"
          :icon="Unlock"
          circle
          class="screen-password-button"
          @click="handleUnLock"
        />
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ElMessageBox } from 'element-plus'
import { SwitchButton, Unlock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { getStorage, setStorage, removeStorage } from '@/utils/storageUti'

const lockKey = '__lock__'
const lockData = getStorage(lockKey)
const lockInfo = reactive(
  lockData || {
    pwd: '',
    open: false,
  }
)
const passwordRef = ref()
const password = ref('')
const tip = ref('')

const handleLock = () => {
  password.value = ''
  tip.value = ''
  if (lockInfo.pwd) {
    lockInfo.open = true
    setStorage(lockKey, lockInfo)
    nextTick(() => {
      passwordRef.value.focus()
    })
  } else {
    ElMessageBox.prompt('', '设置锁屏密码')
      .then(({ value }) => {
        lockInfo.pwd = value
        lockInfo.open = true
        setStorage(lockKey, lockInfo)
        nextTick(() => {
          passwordRef.value.focus()
        })
      })
      .catch(() => {
        //
      })
  }
}

const handleUnLock = () => {
  tip.value = ''
  if (password.value === lockInfo.pwd) {
    lockInfo.open = false
    setStorage(lockKey, lockInfo)
  } else {
    password.value = ''
    tip.value = '解锁密码错误'
  }
}

const router = useRouter()
const loginOut = () => {
  const userStore = useUserStore()
  userStore.logout().then(() => {
    lockInfo.open = false
    removeStorage(lockKey)
    router.push(`/login?redirect=/`)
  })
}
</script>

<style scoped>
.screen-locker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
  /* backdrop-filter暂不兼容firefox */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.screen-locker-lock {
  animation: lock-down 1s ease-in-out;
}
.screen-locker-unlock {
  animation: lock-up 1s ease-in-out;
}
@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  60% {
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0px, 0, 0);
  }
  90% {
    transform: translate3d(0px, 0, 0);
  }
  100% {
    transform: none;
  }
}
@keyframes lock-up {
  0% {
    transform: translate3d(0, 0px, 0);
  }
  90% {
    transform: translate3d(0px, -100%, 0);
  }
  100% {
    transform: none;
    opacity: 0;
  }
}
.screen-avatar {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.screen-avatar img {
  width: 128px;
  height: 128px;
}
.screen-nickname {
  font-size: 30px;
  font-weight: 400;
  color: #333;
  margin-top: 20px;
}
.screen-password {
  width: 300px;
  height: 60px;
  border-radius: 100px;
  background-image: linear-gradient(
    to right,
    rgb(72 168 237 / 25%),
    rgba(255, 255, 255, 0.4),
    rgb(72 168 237 / 25%)
  );
  /* 背景渐变色大小 */
  background-size: 200%;
  animation: sun 7s infinite;
  position: relative;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
}
.screen-password:before {
  content: '';
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: -6px;
  right: -6px;
  border-radius: 60px;
  background-image: linear-gradient(
    to right,
    rgb(72 168 237 / 25%),
    rgba(255, 255, 255, 0.4),
    rgb(72 168 237 / 25%)
  );
  background-size: 200%;
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  opacity: 0.5;
  animation: sun 7s infinite;
}
.screen-password-input {
  width: 300px;
  height: 60px;
  color: #333;
  border: none;
  font-size: 18px;
  text-align: center;
  background-color: transparent;
}
.screen-btns {
  margin-top: 30px;
}
.screen-password-button {
  width: 60px !important;
  height: 60px !important;
  font-size: 18px;
}
.screen-password-button + .screen-password-button {
  margin-left: 50px;
}
@keyframes sun {
  100% {
    background-position: -400% 0;
  }
}
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: 12px;
  font-size: 16px;
}
</style>
