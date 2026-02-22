import axios from 'axios'
import Cookies from 'js-cookie'
import config from '../constants/config'
import { useAuthStore } from '@/store/useStore';

export const api = axios.create({
    baseURL: config.BASE_API_URL,
})

const mapToken = new Map([
    ["admin", "token"],
    ["user", "token-user"],
]);


api.interceptors.request.use((config) => {
    const auth = useAuthStore()
    const role = auth.role

    if (config.withToken) {
        const token = role ? Cookies.get(mapToken.get(role) as string) : null;

        console.log('role')
        console.log(role)
        console.log('token')
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('token')
            Cookies.remove('token-user')
        }

        return Promise.reject(error)
    }
)