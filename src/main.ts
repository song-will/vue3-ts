import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './common.less'
import router from './router'
import { createApp } from 'vue'
import { store, key } from './store'


const app = createApp(App)
app.use(router)
app.use(store, key)
app.use(ElementPlus)

window.onload = function () {
    store.commit('initSocket', {
        token: JSON.parse(sessionStorage.getItem('userInfo'))?.uuid 
    })
    store.commit('setUserInfo')
}
console.log('state', store.state.socketManager)
app.mount('#app')
