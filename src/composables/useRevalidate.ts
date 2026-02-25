import { useQueryClient } from '@tanstack/vue-query'

export function useRevalidate() {
    const queryClient = useQueryClient()

    return (key: string) => queryClient.invalidateQueries({ queryKey: [key] })
}