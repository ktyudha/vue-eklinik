import { api } from "@/lib/api";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import type { IGetOneCityResponse } from "../interfaces/get-one-city.type";

export default function useGetCity(cityId: string) {
  const fetcher = () =>
    api
      .get<IGetOneCityResponse>(`/region/cities/${cityId}`, {
        withToken: true,
      })
      .then((res) => res.data);

  const { data, isLoading, error } = useQuery({
    queryKey: ["/region/cities", cityId],
    queryFn: fetcher,
  });

  return {
    loading: isLoading,
    city: computed(() => data.value?.cities),
    error,
  };
}
