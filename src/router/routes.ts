const routes = [
    {
        path: '/absproxy/5173',
        redirect: "/absproxy/5173/user"
    },
    {
        path: '/absproxy/5173/login',
        component: () =>import("../view/Login/index.vue")
    },
    {
        path: '/absproxy/5173/admin',
        name: 'AdminLayout',
        title: '管理员首页',
        children: [
            {
                path: '',
                component: () => import("../view/Home/index.vue"),
                title: '管理员首页',
                meta:{
                    layout:"admin"
                }
            },
        ],
    },
    {
        path: '/absproxy/5173/user',
        name: 'UserHome',
        title: '用户首页',
        children: [
            {
                path: '',
                title: '用户首页',
                component: () => import("../view/Home/index.vue"),
                meta:{
                    layout:"user"
                }
            },
            {
                path: 'selectDevice',
                component: () => import("../view/MeetingRoom/index.vue"),
                meta:{
                    layout:"user"
                }
            },
        ],
    }
]
export default routes