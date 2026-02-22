import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/useStore'
import { getMe } from '@/services/auth/hooks/useGetMe'

export async function useAuthBootstrap() {
    const auth = useAuthStore()
    const setIsLoggedIn = auth.setIsLoggedIn
    const setRole = auth.setRole
    const setMe = auth.setMe

    const token = Cookies.get('token-user') || Cookies.get('token')

    if (!token) {
        setIsLoggedIn(false)
        return
    }

    setIsLoggedIn(true)

    const role = Cookies.get('token') ? 'admin' : 'user'
    setRole(role)

    try {
        const { data } = await getMe(role)
        setMe(data.user)
    } catch (error) {
        console.error(error)

        setIsLoggedIn(false)
    }
}