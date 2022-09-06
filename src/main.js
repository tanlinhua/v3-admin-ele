import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // global css

// import element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// i18n
import { setupI18n } from '@/lang'

// svg-icon
// import svg-icon doc in  https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'
import svgIcon from '@/icons/SvgIcon.vue'

// import global directive
import directive from '@/directives'

// import router  intercept
import './permission'

// error log  collection
import errorLog from '@/hooks/useErrorLog'

// pinia
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(ElementPlus)
app.use(setupI18n)
app.component('SvgIcon', svgIcon)
directive(app)
errorLog(app)

// axios cancel req
window.__axiosPromiseArr = []

app.use(createPinia())

app.use(router).mount('#app')
