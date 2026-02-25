export default {
    path: '/admin',
    redirect: { name: 'admin.dashboard' },
    component: () => import('@/components/layout/AdminLayout.vue'),
    children: [

        // /** AUTH */
        // {
        //     path: 'login',
        //     name: 'admin.login',
        //     component: () => import('@/views/Auth/AuthLogin.vue'),
        //     meta: {
        //         title: 'Login',
        //         reload: true,
        //         guestOnly: true,
        //         authPage: true,
        //     },
        // },

        /** DASHBOARD */
        {
            path: 'dashboard',
            name: 'admin.dashboard',
            component: () => import('@/views/Admin/Dashboard/Index.vue'),
            meta: {
                title: 'Beranda',
                reload: true,
                requiresAuth: true,
            },
        },

        /** PROFILE */
        {
            path: 'profile',
            name: 'admin.profile',
            component: () => import('@/views/Admin/Profile/UserProfile.vue'),
            meta: {
                title: 'Profil',
                reload: true,
                requiresAuth: true,
            },
        },

        /** PASIEN */
        {
            path: 'patients',
            name: 'admin.patients',
            redirect: { name: 'admin.patient.index' },
            children: [
                {
                    path: '',
                    name: 'admin.patients.index',
                    component: () => import('@/views/Admin/Patient/Table/Index.vue'),
                    meta: {
                        title: 'Pasien',
                        reload: true,
                        requiresAuth: true,
                    },
                },
                {
                    path: 'create',
                    name: 'admin.patients.create',
                    component: () => import('@/views/Admin/Patient/Action/PatientCreate.vue'),
                    meta: {
                        title: 'Tambah Pasien',
                        reload: true,
                        requiresAuth: true,
                    },
                }
            ]
        },
    ]
}