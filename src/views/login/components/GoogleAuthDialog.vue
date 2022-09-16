<template>
  <el-dialog
    v-model="dialogData.visible"
    title="谷歌安全码信息"
    :close-on-click-modal="false"
    width="360px"
  >
    <template v-if="!props.ready">
      <el-result v-if="!dialogData.qr_url" icon="info" title="提示">
        <template #sub-title>
          <p>谷歌安全码信息只能获取一次</p>
          <p>请及时添加到验证器</p>
          <p>iOS: AppStore搜索 Google Authenticator</p>
          <p>Android: GooglePlay搜索Google身份验证器</p>
          <p>或者其他安卓市场下载</p>
        </template>
        <template #extra>
          <el-button type="primary" :loading="dialogData.loading" @click="submitForm"
            >我知道了，现在获取</el-button
          >
        </template>
      </el-result>

      <el-result v-else title="获取成功">
        <template #icon>
          <el-image :src="dialogData.qr_url" />
        </template>
        <template #sub-title>
          <p>请及时添加到验证器</p>
          <p>无法扫码复制下面secret去验证器设置</p>
          <p>{{ dialogData.secret }}</p>
        </template>
      </el-result>
    </template>

    <el-result v-else icon="warning" title="已被获取" sub-title="请联系获取人或管理人员" />
  </el-dialog>
</template>

<script setup>
import { genGoogleInfo } from '@/api/user'
import { getUrlObj } from '@/utils/commonUtil'

const props = defineProps({
  ready: {
    type: Boolean,
    required: true,
    default: true,
  },
})

const dialogData = reactive({
  visible: false,
  loading: false,
  qr_url: '',
  secret: '',
})

const showDialog = () => {
  dialogData.visible = true
  dialogData.loading = false
}

const submitForm = () => {
  dialogData.loading = true
  genGoogleInfo()
    .then(data => {
      dialogData.qr_url = data.data.qr_url
      dialogData.secret = getUrlObj(data.data.qr_url).secret
      dialogData.loading = false
    })
    .catch(() => {
      dialogData.loading = false
    })
}

defineExpose({
  showDialog,
})
</script>

<style lang="scss" scoped>
.el-result {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

p {
  margin-top: 10px;
}
</style>
