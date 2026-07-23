import { api } from "@/lib/api";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import type { IGetPatientResponse } from "../interfaces/response.type";

export default function useGetPatient(id: string) {
    const fetcher = () =>
        api
            .get<IGetPatientResponse>(`/admin/patients/${id}`, { withToken: true })
            .then((res) => res.data);

    const { data, isLoading, error } = useQuery({
        queryKey: ["/admin/patients", id],
        queryFn: fetcher,
    });

    return {
        loading: isLoading,
        patient: computed(() => data.value?.patient),
        error,
    };
}
