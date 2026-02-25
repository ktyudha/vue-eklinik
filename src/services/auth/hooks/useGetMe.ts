import type { Role } from "@/def/role.def";
import { api } from "@/lib/api";
import type { IMeResponse } from "../interfaces/response.type";

export const getMe = async (role: Role) => {
    const url = {
        admin: "auth/admin/me",
        user: "auth/me",
    }[role]

    const { data } = await api.get<IMeResponse>(
        url,
        {
            withToken: true,
        }
    );

    return { data: data, error: null }
}