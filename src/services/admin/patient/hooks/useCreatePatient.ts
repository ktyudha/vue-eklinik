
import type { AxiosError } from "axios";
import { api } from "@/lib/api";
import type { ICreatePatientPayload } from "../interfaces/request.type";
import type { ApiErrorResponse } from "@/services/common/error/interfaces/response.type";
import { useRevalidate } from "@/composables/useRevalidate";

export default function useCreatePatient() {
    const revalidate = useRevalidate();

    const createPatient = async (payload: ICreatePatientPayload) => {
        try {

            const res = await api.post('/admin/patients', payload, { withToken: true })

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

    return { createPatient };
}