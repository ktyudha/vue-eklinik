import type { Role } from "@/def/role.def";
import { api } from "@/lib/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios"

export default function useLogout() {
    const handleLogout = async (role: Role) => {
        const tokenKeys = {
            admin: "token",
            user: "token-user",
        } as const;

        const logoutUrls = {
            admin: "/auth/admin/logout",
            user: "/auth/logout",
        } as const;

        const token = Cookies.get(tokenKeys[role]) ?? "";

        if (!token) {
            return { data: null, status: 401 };
        }

        try {
            const { data } = await api.post(logoutUrls[role], undefined, { withToken: true })

            // Hapus token di cookie
            Cookies.remove(tokenKeys[role], { path: "/" });
            return { data: data.message, error: null };

        } catch (err) {
            const error = err as AxiosError<{ message: string }>

            return {
                data: null,
                error: error.response?.data?.message ?? error.message,
                status: error.response?.status ?? 500
            }
        }
    }

    return { handleLogout };
}