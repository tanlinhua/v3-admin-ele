import axios from 'axios'
import router from '@/router'
import { ElLoading, ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

let loadingE

const service = axios.create()

// 请求拦截
service.interceptors.request.use(
  request => {
    /* 过滤空参数 */
    Object.keys(request.data).forEach(item => {
      if (request.data[item] === '') {
        delete request.data[item]
      }
    })
    /* download file */
    if (request.isDownLoadFile) {
      request.responseType = 'blob'
    }
    /* upload file */
    if (request.isUploadFile) {
      request.headers['Content-Type'] = 'multipart/form-data'
    }
    if (request.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: '数据载入中',
        // spinner: 'el-icon-ElLoading',
        background: 'rgba(0, 0, 0, 0.1)',
      })
    }
    /*
     *params会拼接到url上
     * */
    if (request.isParams) {
      request.params = request.data
      request.data = {}
    } else if (!request.isJSON) {
      request.data = Object.entries(request.data)
        .map(item => `${item[0]}=${item[1]}`)
        .join('&')
    }
    return request
  },
  err => {
    Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  res => {
    const reqConfig = res.config
    if (reqConfig.afHLoading && loadingE) {
      loadingE.close()
    }
    // 如果是下载文件直接返回
    if (reqConfig.isDownLoadFile) {
      return res
    }
    const { code, msg, count, data } = res.data
    const successCode = [0]
    if (successCode.includes(code)) {
      if (count !== undefined) {
        return {
          count,
          data,
        }
      }
      return data
    }
    if (reqConfig.isAlertErrorMsg) {
      ElMessage({
        message: msg,
        type: 'error',
        duration: 2 * 1000,
      })
    }
    // 返回错误信息
    // 如果未catch 走unhandledrejection进行收集
    // 注：如果没有return 则，会放回到请求方法中.then ,返回的res为 undefined
    return Promise.reject(res.data)
  },
  err => {
    if (loadingE) loadingE.close()

    if (String(err).endsWith('400')) {
      const userStore = useUserStore()
      userStore.resetState().then(() => {
        router.push({ path: '/login' })
      })
      ElMessage({
        message: '请重新登录',
        type: 'error',
        duration: 2 * 1000,
      })
    } else {
      ElMessage({
        message: err,
        type: 'error',
        duration: 2 * 1000,
      })
    }

    return Promise.reject({
      msg: err.toString(),
    })
  }
)

export function axiosReq({
  url,
  data,
  method,
  isParams,
  isJSON,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg,
}) {
  return service({
    url,
    method: method ?? 'get',
    data: data ?? {},
    isParams: isParams ?? false,
    isJSON: isJSON ?? false,
    bfLoading: bfLoading ?? false,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
    timeout: timeout ?? 30000,
  })
}

export default axiosReq
