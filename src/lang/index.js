import { createI18n } from 'vue-i18n'

import en from './en'
import zh from './zh'
import settings from '@/settings'

const messages = {
  en,
  zh,
}

const localeData = {
  globalInjection: true, // true --> $t() inject to global
  legacy: false, // you must specify 'legacy: false' option
  // set locale
  // options: en | zh
  // locale: localStorage.getItem('language') || settings.defaultLanguage,
  locale: settings.defaultLanguage,
  // set locale messages
  messages,
}

// setup i18n instance with glob
export const setupI18n = {
  install(app) {
    const i18n = createI18n(localeData)
    app.use(i18n)
  },
}
