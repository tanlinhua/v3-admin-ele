<template>
  <div class="login-container columnCS">
    <div class="login-bg">
      <img src="@/assets/login_images/bg.png" alt="" />
    </div>
    <div class="login-pane">
      <el-form ref="refloginForm" class="login-form" :model="formInline" :rules="formRules">
        <div class="title-container">
          <h3 class="title text-center">{{ settings.title }}</h3>
        </div>
        <el-form-item prop="user_name" :rules="formRules.isNotNull">
          <span class="svg-container">
            <ElSvgIcon name="User" :size="18" />
          </span>
          <el-input v-model="formInline.user_name" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password" :rules="formRules.isNotNull">
          <span class="svg-container">
            <ElSvgIcon name="Lock" :size="18" />
          </span>
          <el-input
            :key="passwordType"
            ref="refPassword"
            v-model="formInline.password"
            :type="passwordType"
            name="password"
            placeholder="密码"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code" :rules="formRules.isNotNull">
          <span class="svg-container">
            <ElSvgIcon name="Picture" :size="18" />
          </span>
          <el-input
            v-model="formInline.code"
            type="number"
            name="code"
            placeholder="图片验证码"
            @keyup.enter="handleLogin"
          />
          <img
            v-if="captchaImg"
            :src="captchaImg"
            alt=""
            class="captcha-img"
            @click="handleGetCaptcha"
          />
        </el-form-item>
        <el-form-item v-if="googleInfo.open" prop="g_code" :rules="formRules.isNotNull">
          <span class="svg-container">
            <ElSvgIcon name="Unlock" :size="18" />
          </span>
          <el-input
            v-model="formInline.g_code"
            type="number"
            name="code"
            placeholder="谷歌验证码"
            @keyup.enter="handleLogin"
          />
          <svg-icon icon-class="shield" class="shield" @click="heandleShield" />
        </el-form-item>
        <div class="tip-message">{{ tipMessage }}</div>
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          round
          @click.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>

    <GoogleAuthDialog ref="googleAuthDialogRef" :ready="googleInfo.ready" />
  </div>
</template>

<script setup name="Login">
import settings from '@/settings'

import { getCaptcha, getGoogleInfo } from '@/api/user'
import ElSvgIcon from '@/components/ElSvgIcon.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import GoogleAuthDialog from './components/GoogleAuthDialog.vue'

// element valid
const formRules = useElement().formRules
// form
const formInline = reactive({
  user_name: '',
  password: '',
  code: '',
  g_code: '',
  cid: '',
})
const state = reactive({
  otherQuery: {},
  redirect: undefined,
})

/* listen router change  */
const route = useRoute()
const getOtherQuery = query => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

const captchaImg = ref('')
const handleGetCaptcha = () => {
  getCaptcha().then(data => {
    captchaImg.value = data.data.base64
    formInline.cid = data.data.id
  })
}
handleGetCaptcha()

const googleInfo = reactive({
  open: false,
  ready: false,
})
getGoogleInfo().then(data => {
  if (data.data.g_open) {
    googleInfo.open = true
  }
  if (data.data.g_ready) {
    googleInfo.ready = true
  }
})

const googleAuthDialogRef = ref(null)
const heandleShield = () => {
  googleAuthDialogRef.value.showDialog()
}

watch(
  () => route.query,
  query => {
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true }
)

/*
 *  login relative
 * */
const loading = ref(false)
const tipMessage = ref('')

const refloginForm = ref(null)
const handleLogin = () => {
  refloginForm.value.validate(valid => {
    if (valid) {
      loginReq()
    } else {
      return false
    }
  })
}

// use the auto import from vite.config.js of AutoImport
const router = useRouter()
let loginReq = () => {
  loading.value = true
  const userStore = useUserStore()
  userStore
    .login(formInline)
    .then(() => {
      ElMessage({ message: '登录成功', type: 'success' })
      router.push({ path: state.redirect || '/', query: state.otherQuery })
    })
    .catch(res => {
      tipMessage.value = res.msg
      handleGetCaptcha()
      useCommon()
        .sleep(30)
        .then(() => {
          loading.value = false
        })
    })
}
/*
 *  password show or hidden
 * */
const passwordType = ref('password')
const refPassword = ref(null)
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    refPassword.value.focus()
  })
}
</script>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #333;
$gray: #999;
$light_gray: #eee;
.login-container {
  height: 100vh;
  position: relative;
  overflow-y: hidden;
  width: 100%;
  background-color: $bg;
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 50px;
  }
  :deep(.el-form-item) {
    border: 1px solid #e0e0e0;
    background: #fff;
    border-radius: 50px;
    color: #999;
    .el-form-item__content {
      position: relative;
    }
    .el-form-item__error {
      padding-left: 40px;
    }
  }
  :deep(.el-input input) {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 50px;
    padding: 10px 5px 10px 35px;
    color: #999;
    height: 42px; //此处调整item的高度
    caret-color: #999;
  }
  //hiden the input border
  :deep(.el-input__inner) {
    box-shadow: none !important;
  }
  .login-pane {
    margin-left: 10%;
    position: relative;
    .login-top,
    .login-front {
      position: absolute;
      top: 0;
      left: 50%;
    }
    .login-top {
      z-index: 0;
      transform: translateY(-85%) translateX(-50%);
    }
    .login-front {
      z-index: 11;
      transform: translateY(-35%) translateX(-50%);
    }
  }
  @media screen and (max-width: 768px) {
    .login-pane {
      margin: 0 auto !important;
      bottom: 120px;
    }
  }
  .login-form {
    width: 340px;
    padding: 40px 30px;
    background: #fff;
    box-shadow: 0px 4px 16px rgba(158, 105, 25, 0.15);
    border-radius: 8px;
    position: relative;
    z-index: 10;
  }
  .title-container {
    .title {
      font-size: 28px;
      color: $dark_gray;
      margin: 0px auto 25px auto;
      text-align: center;
      font-weight: bold;
      letter-spacing: 5px;
    }
  }
}
.login-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  color: $gray;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

//错误提示信息
.tip-message {
  color: #e4393c;
  height: 30px;
  margin-top: -12px;
  font-size: 12px;
}

//登录按钮
.login-btn {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  background-color: #6477ee;
}
.show-pwd {
  width: 50px;
  font-size: 16px;
  color: $gray;
  cursor: pointer;
  text-align: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.captcha-img {
  height: 32px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.shield {
  width: 50px;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
