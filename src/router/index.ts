import { useAuthStore } from '@/store/useStore'
import { storeToRefs } from 'pinia'
// import { getMe } from '@/services/auth/hooks/useGetMe'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/Landing/LandingIndex.vue'),
    meta: {
      title: 'Bidan Susenowati, S.ST',
      reload: true,
    },
  },
  {
    path: '/admin',
    redirect: { name: 'admin.dashboard' },
    children: [
      {
        path: 'login',
        name: 'admin.login',
        component: () => import('@/views/Auth/AuthLogin.vue'),
        meta: {
          title: 'Login',
          reload: true,
          guestOnly: true,
          authPage: true,
        },
      },

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

    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach(async (to,) => {
  document.title = `${to.meta.title ? to.meta.title + ' - ' : ''} Settle Klinik`

  const auth = useAuthStore()
  const { role, token, isLoggedIn } = storeToRefs(auth)

  if (!isLoggedIn.value && token.value) {
    await auth.initAuth()
  }

  const requiresAuth = to.meta.requiresAuth
  const guestOnly = to.meta.guestOnly

  if (requiresAuth && !isLoggedIn.value) {
    return { name: 'admin.login' }
  }

  if (guestOnly && isLoggedIn.value) {
    if (role.value == 'admin') return { name: 'admin.dashboard' }
    return { name: 'landing' }
  }

  return true
})

export default router


