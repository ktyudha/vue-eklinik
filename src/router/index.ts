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
      title: 'Bidan Susenowati, S.ST.',
      reload: true,
      requiresAuth: true
    },
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import('@/views/Ecommerce.vue'),
    meta: {
      title: 'Bidan Susenowati, S.ST.',
      reload: true,
      requiresAuth: true,
    },
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/Auth/AuthLogin.vue'),
    meta: {
      title: 'Login',
      reload: true,
      guestOnly: true,
      authPage: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from)
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  console.log(from)
  document.title = `${to.meta.title ? to.meta.title + '-' : ''} Settle Klinik`

  const auth = useAuthStore()
  const { role, token, isLoggedIn } = storeToRefs(auth)

  if (!isLoggedIn.value && token.value) {
    await auth.initAuth()
  }

  const requiresAuth = to.meta.requiresAuth
  const guestOnly = to.meta.guestOnly

  if (requiresAuth && !isLoggedIn.value) {
    return next({ name: 'admin.login' })
  }

  if (guestOnly && isLoggedIn.value) {
    if (role.value == 'admin') return next({ name: 'admin.dashboard' })
    return next('/')
  }

  if (guestOnly && isLoggedIn.value === false) {
    return next()
  }

  next()
})

export default router


