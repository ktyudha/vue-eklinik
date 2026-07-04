import { api } from "@/lib/api";
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import type { IGetAllVillageResponse } from "../interfaces/get-all-village.type";

export default function useGetAllVillage() {
  const name = ref("");
  const subDistrictId = ref("");
  const pageNum = ref(1);
  const pageLimit = ref(10);

  const fetcher = () =>
    api
      .get<IGetAllVillageResponse>("/region/search", {
        withToken: true,
        params: {
          name: name.value || undefined,
          sub_district_id: subDistrictId.value || undefined,
          page: pageNum.value,
          page_limit: pageLimit.value,
        },
      })
      .then((res) => res.data);

  const { data, isLoading, error } = useQuery({
    queryKey: computed(() => [
      "/region/search",
      name.value,
      subDistrictId.value,
      pageNum.value,
      pageLimit.value,
    ]),
    queryFn: fetcher,
  });

  const setName = (newName: string) => {
    name.value = newName;
    pageNum.value = 1;
  };

  const setSubDistrictId = (newSubDistrictId: string) => {
    subDistrictId.value = newSubDistrictId;
    pageNum.value = 1;
  };

  return {
    loading: isLoading,
    villages: computed(() => data.value?.villages),
    pagination: computed(() => data.value?.pagination),
    error,
    name,
    subDistrictId,
    pageNum,
    pageLimit,
    setName,
    setSubDistrictId,
    setPageNum: (val: number) => (pageNum.value = val),
    setPageLimit: (val: number) => (pageLimit.value = val),
  };
}
