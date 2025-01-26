// 导入router所需的方法
import { createRouter, createWebHistory } from 'vue-router'

// 导入路由页面的配置
import routes from './routes'

// 路由参数配置
const router = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHistory(),
    routes: routes,
})

// 全局前置守卫，这里可以加入用户登录判断
router.beforeEach((to, from, next) => {
    if (import.meta.env.VITE_SECURE === 'true') {
        // 检查是否有token
        const hasToken = window.localStorage.getItem('Authentication')
        if (hasToken) {
            // 如果有token，正常导航
            next()
        } else {
            // 如果没有token，导航到登录页面
            if (to.path !== '/absproxy/5173/login') {
                next('/absproxy/5173/login')
            } else {
                next()
            }
        }
    }
    // 继续前进 next()
    // 返回 false 以取消导航
    // next()
})

// 全局后置钩子，这里可以加入改变页面标题等操作
router.afterEach((to, from) => {
    const _title = to.title
    if (_title) {
        window.document.title = _title
    }
})

// 导出默认值
export default router