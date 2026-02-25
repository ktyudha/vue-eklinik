import { useRevalidate } from "@/composables/useRevalidate";
import { api } from "@/lib/api";

import type { ApiErrorResponse } from "@/services/common/error/interfaces/response.type";
import type { AxiosError } from "axios";

export default function useDeletePatient() {
    const revalidate = useRevalidate();

    const deleteData = async (patientId: string) => {
        try {
            const res = await api.delete(`/admin/patients/${patientId}`, { withToken: true })

            if (res.status === 200) {
                revalidate('/admin/patients');
            }

            return { response: res, error: null };
        } catch (error: unknown) {
            const err = error as AxiosError<ApiErrorResponse>
            const status = err.response?.status ?? 0

            if (status >= 500) {
                return { response: null, error: 'Server error' }
            }

            return { response: null, error: err.response?.data?.message ?? 'Unknown error' }
        }
    };

    return { deleteData };
}