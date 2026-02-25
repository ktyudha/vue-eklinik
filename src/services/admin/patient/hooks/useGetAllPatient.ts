
import { api } from '@/lib/api'

import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import type { IGetAllPatientResponse } from '../interfaces/response.type'

export function useGetAllPatient() {
    const name = ref('')
    const pageNum = ref(1)
    const pageLimit = ref(10)

    const fetcher = () =>
        api.get<IGetAllPatientResponse>('/admin/patients', {
            withToken: true,
            params: {
                name: name.value || undefined,
                page: pageNum.value,
                page_limit: pageLimit.value,
            },
        },).then((res) => res.data)

    const { data, isLoading, error } = useQuery({
        queryKey: computed(() => ['/admin/patients', name.value, pageNum.value, pageLimit.value]),
        queryFn: fetcher,
    })

    const setName = (newName: string) => {
        name.value = newName
        pageNum.value = 1
    }

    return {
        loading: isLoading,
        data: computed(() => data.value?.patients),
        error,
        pagination: computed(() => data.value?.pagination),
        pageNum,
        pageLimit,
        name,
        setName,
        setPageNum: (val: number) => (pageNum.value = val),
        setPageLimit: (val: number) => (pageLimit.value = val),
    }
}