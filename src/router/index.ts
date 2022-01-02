import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        redirect: '/login',
    },
    {
        path: '/container',
        name: 'container',
        component: () => import('@/view/Container.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
