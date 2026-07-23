import Cookies from "js-cookie";

import type { Role } from "@/def/role.def";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useStore";
import type { ILoginResponse } from "../interfaces/response.type";
import type { ILoginPayloadRequest } from "../interfaces/request.type";
import { getMe } from "./useGetMe";

export default function useLogin(role: Role) {
    const auth = useAuthStore()
    const { setRole, setMe, setIsLoggedIn } = auth

    const handleLogin = async (payload: ILoginPayloadRequest) => {

        const { data } = await api.post<ILoginResponse>(
            `/auth/${role === "admin" ? "admin" : role}/login`,
            payload,
            {
                withToken: false,
            }
        );

        const tokenName = `token${role === "admin" ? "" : `-${role}`}`;
        Cookies.set(tokenName, data.token as string, { expires: 365, path: "/" });

        setRole(role)

        const { data: meData } = await getMe(role)
        setMe(meData.user)
        setIsLoggedIn(true)

        return data;
    };

    return { handleLogin };
}