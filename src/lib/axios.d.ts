import 'axios'

declare module 'axios' {
    export interface AxiosRequestConfig {
        withToken?: boolean
        withRole?: 'admin' | 'user'
    }
}