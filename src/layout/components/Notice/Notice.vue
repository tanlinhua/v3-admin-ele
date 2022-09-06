<template>
  <div class="pl-1 pr-1 nav-icon-box">
    <el-popover placement="bottom" title="通知" :width="300" trigger="hover">
      <template #reference>
        <el-badge :is-dot="!msg.isAdmin && msg.isNew">
          <svg-icon icon-class="notice" class="nav-svg-icon" />
        </el-badge>
      </template>
      <template #default>
        <template v-if="!msg.isAdmin">
          <p style="white-space: pre-line">{{ msg.value }}</p>
          <el-button v-if="msg.isNew" type="primary" class="btn" @click="handleReadMessage"
            >我知道了</el-button
          >
        </template>
        <template v-else>
          <el-input
            v-model="msg.value"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            placeholder="请输入通知内容"
          />
          <el-button type="primary" :loading="msg.loading" class="btn" @click="handleUpdateMessage"
            >提交</el-button
          >
        </template>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import CryptoJS from 'crypto-js'
import { ElMessage } from 'element-plus'
import { readMessage, updateMessage } from '@/api/user'

const msg = reactive({
  isAdmin: localStorage.getItem('role_id') === '0',
  isNew: false,
  loading: false,
  value: '获取中...',
})
let noticeHash = ''

readMessage()
  .then(data => {
    msg.value = data.data.msg
    noticeHash = CryptoJS.MD5(data.data.msg).toString()
    if (localStorage.getItem('noticeHash') !== noticeHash) {
      msg.isNew = true
    }
  })
  .catch(err => {
    if (err.msg === '权限不足') {
      msg.value = err.msg
    } else if (!err.msg.endsWith('400')) {
      ElMessage({ message: err.msg, type: 'error' })
    }
  })

const handleReadMessage = () => {
  msg.isNew = false
  localStorage.setItem('noticeHash', noticeHash)
}

const handleUpdateMessage = () => {
  msg.loading = true
  updateMessage({
    msg: msg.value,
  })
    .then(() => {
      msg.loading = false
      ElMessage({ message: '修改成功', type: 'success' })
    })
    .catch(() => {
      msg.loading = false
    })
}
</script>

<style scoped>
.btn {
  margin-top: 10px;
  display: block;
  width: 100%;
}
</style>
