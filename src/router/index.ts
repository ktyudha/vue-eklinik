import { useAuthStore } from '@/store/useStore'
import { storeToRefs } from 'pinia'
// import { getMe } from '@/services/auth/hooks/useGetMe'
import { createRouter, createWebHistory } from 'vue-router'

import _admin from './_admin.routes'

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

  // All
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/Landing/Other/FourZeroFour.vue') },

  // Extend
  _admin,
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


