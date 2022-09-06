<template>
  <div v-if="errorLogStore.logs.length" class="pl-1 pr-1 nav-icon-box">
    <el-tooltip effect="dark" content="错误日志" placement="bottom">
      <svg-icon icon-class="bug" class="nav-svg-icon" @click="click" />
    </el-tooltip>
  </div>

  <el-dialog v-model="dialogVisible" title="错误日志" width="1000px">
    <el-table :data="errorLogStore.logs" border style="width: 100%">
      <el-table-column prop="pageUrl" label="URL" width="400" />
      <el-table-column prop="errorLog" label="错误信息" />
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" :icon="Delete" @click="clearAll">暂不显示</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Delete } from '@element-plus/icons-vue'
import { useErrorLogStore } from '@/store/errorLog'

const errorLogStore = useErrorLogStore()

const dialogVisible = ref(false)

const click = () => {
  dialogVisible.value = true
}

const clearAll = () => {
  dialogVisible.value = false
  errorLogStore.CLEAR_ERROR_LOG()
}
</script>

<style scoped>
.nav-svg-icon {
  color: #f56c6c;
}
</style>
