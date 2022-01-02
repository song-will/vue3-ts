import { createApp } from '/node_modules/.vite/vue.js?v=03225135'
import App from '/src/App.vue'
import ElementPlus from '/node_modules/.vite/element-plus.js?v=03225135'
import '/node_modules/element-plus/dist/index.css'
import '/src/common.less'
import axios from '/src/utils/axios.ts'

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
