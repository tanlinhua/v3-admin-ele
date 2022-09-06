import setting from '@/settings'
import { jsErrorCollection } from 'js-error-collection'
import { useErrorLogStore } from '@/store/errorLog'

let errorLogStore = null

const errorLogReq = errLog => {
  if (!errorLogStore) {
    errorLogStore = useErrorLogStore()
  }

  if (errLog && errLog !== 'undefined') {
    errorLogStore.ADD_ERROR_LOG({
      pageUrl: window.location.href,
      errorLog: errLog,
    })
  }
}

export default () => {
  const checkNeed = () => {
    const env = import.meta.env.VITE_APP_ENV
    const { errorLog } = setting
    if (typeof errorLog === 'string') {
      return env === errorLog
    }
    if (errorLog instanceof Array) {
      return errorLog.includes(env)
    }
    return false
  }
  if (checkNeed()) {
    jsErrorCollection({ runtimeError: true, rejectError: true, consoleError: true }, errLog => {
      errorLogReq(errLog)
    })
  }
}
