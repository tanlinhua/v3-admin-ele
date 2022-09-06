<template>
  <div class="pl-1 pr-1 nav-icon-box" :class="{ animation }">
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <svg-icon icon-class="refresh" class="nav-svg-icon" @click="click" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'

const $route = useRoute()
const $router = useRouter()
const appStore = useAppStore()

const animation = ref(false)

const click = () => {
  if (!animation.value) {
    appStore.M_DEL_CACHED_VIEW($router.currentRoute.value.name)
    animation.value = true
    $router.replace({
      path: `/redirect${$route.path}`,
      query: $route.query,
    })
    setTimeout(() => {
      animation.value = false
    }, 1000)
  }
}
</script>

<style scoped>
.animation {
  transition: transform 1s linear;
  transform: rotate(360deg);
}
</style>
