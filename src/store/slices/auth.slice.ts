import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { computed, ref } from "vue"

import { getMe } from '@/services/auth/hooks/useGetMe'
import type { User } from '@/services/auth/interfaces/response.type'

const tokenKeys = {
    admin: "token",
    user: "token-user",
} as const;

export const useAuthStore = defineStore('auth', () => {
    const role = ref<'admin' | 'user'>('user')
    const me = ref<User | undefined>(undefined)
    const isLoggedIn = ref<boolean>(false)

    const token = computed(() => { return Cookies.get(tokenKeys[role.value]) ?? "" });

    // ACTIONS
    function setRole(param: 'admin' | 'user') {
        role.value = param
    }

    function setMe(user: User) {
        me.value = user
    }

    function setIsLoggedIn(param: boolean) {
        isLoggedIn.value = param
    }

    async function initAuth() {
        const tokenValue = token.value

        if (!tokenValue) {
            isLoggedIn.value = false
            return
        }

        try {
            const { data } = await getMe(role.value)
            setMe(data.user)
            setIsLoggedIn(true)
        } catch {
            setIsLoggedIn(false)
        }
    }

    return {
        role, me, token, isLoggedIn, setRole, setMe, setIsLoggedIn, initAuth
    }
})

