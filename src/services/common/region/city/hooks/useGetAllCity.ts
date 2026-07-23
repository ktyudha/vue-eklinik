import { api } from "@/lib/api";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import type { IGetAllCityResponse } from "../interfaces/get-all-city.type";

export default function useGetAllCity() {

  const fetcher = () =>
    api
      .get<IGetAllCityResponse>("/region/cities", { withToken: true })
      .then((res) => res.data);

  const { data, isLoading, error } = useQuery({
    queryKey: ["/region/cities"],
    queryFn: fetcher,
  });

  return {
    loading: isLoading,
    cities: computed(() => data.value?.cities),
    error,
  };
}
