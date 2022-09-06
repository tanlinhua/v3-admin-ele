<template>
  <el-dialog v-model="dialogData.visible" title="修改密码" width="340px">
    <el-form ref="formRef" :model="dialogData.form" :rules="dialogData.rules" label-width="80px">
      <el-form-item label="原密码" prop="pwd1">
        <el-input
          v-model="dialogData.form.pwd1"
          type="password"
          placeholder="请输入原密码"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="pwd2">
        <el-input
          v-model="dialogData.form.pwd2"
          type="password"
          placeholder="请输入新密码"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="pwd3">
        <el-input
          v-model="dialogData.form.pwd3"
          type="password"
          placeholder="请输入确认密码"
          style="width: 200px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogData.visible = false">取消</el-button>
        <el-button type="primary" :loading="dialogData.loading" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { updatePassword } from '@/api/user'

const formRef = ref(null)
const dialogData = reactive({
  visible: false,
  loading: false,
  form: {
    pwd1: '',
    pwd2: '',
    pwd3: '',
  },
  rules: {
    pwd1: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('原密码为必填字段'))
          } else if (!/^.{6,}$/.test(value)) {
            callback(new Error('原密码长度必须至少为6个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blue',
      },
    ],
    pwd2: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('新密码为必填字段'))
          } else if (!/^.{6,}$/.test(value)) {
            callback(new Error('新密码长度必须至少为6个字符'))
          } else {
            callback()
          }
        },
        trigger: 'blue',
      },
    ],
    pwd3: [
      {
        required: true,
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('确认密码为必填字段'))
          } else if (!/^.{6,}$/.test(value)) {
            callback(new Error('确认密码长度必须至少为6个字符'))
          } else if (value !== dialogData.form.pwd2) {
            callback(new Error('新密码与确认密码不一致'))
          } else {
            callback()
          }
        },
        trigger: 'blue',
      },
    ],
  },
})

const showDialog = () => {
  dialogData.form = {
    pwd1: '',
    pwd2: '',
    pwd3: '',
  }
  dialogData.visible = true
  dialogData.loading = false
  nextTick(() => {
    formRef.value.clearValidate()
  })
}

const submitForm = () => {
  formRef.value.validate(valid => {
    if (valid) {
      dialogData.loading = true
      updatePassword({
        pwd1: dialogData.form.pwd1,
        pwd2: dialogData.form.pwd2,
        pwd3: dialogData.form.pwd3,
      })
        .then(() => {
          dialogData.visible = false
          ElMessage({ message: '修改成功', type: 'success' })
        })
        .catch(() => {
          dialogData.loading = false
        })
    } else {
      return false
    }
  })
}

defineExpose({
  showDialog,
})
</script>
