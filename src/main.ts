import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './common.less'
import router from './router'
import { createApp } from 'vue'


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
