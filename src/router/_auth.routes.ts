export default {
    /** AUTH */
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/Auth/AuthLogin.vue'),
    meta: {
        title: 'Login',
        reload: true,
        guestOnly: true,
        authPage: true,
    },
}