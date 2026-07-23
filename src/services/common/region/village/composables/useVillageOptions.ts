import { computed, ref, watch } from 'vue'
import useGetAllVillage from '@/services/common/region/village/hooks/useGetAllVillage'

export interface VillageOption {
    value: string
    label: string
    subDistrict: { value: string; label: string }
    city: { value: string; label: string }
    province: { value: string; label: string }
}

const SEARCH_DEBOUNCE_MS = 300
const SEARCH_PAGE_LIMIT = 50

export function useVillageOptions(
    getSelectedVillageId?: () => string | number | null | undefined,
    extraOptions?: () => VillageOption[]
) {
    const { villages, loading, setName } = useGetAllVillage(SEARCH_PAGE_LIMIT)

    let searchTimeout: ReturnType<typeof setTimeout>
    function onSearch(value: string) {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => setName(value), SEARCH_DEBOUNCE_MS)
    }

    const searched = computed<VillageOption[]>(() =>
        (villages.value ?? []).map((village) => ({
            value: village.id,
            label: `${village.name}, ${village.sub_district.name}, ${village.city.name}`,
            subDistrict: { value: village.sub_district.id, label: village.sub_district.name },
            city: { value: village.city.id, label: village.city.name },
            province: { value: village.province.id, label: village.province.name },
        }))
    )

    // The select clears its search text on select (resetSearchOnSelect), which
    // re-triggers onSearch('') and refetches an unfiltered list that may no
    // longer contain the just-picked village. Pin it so it stays displayable
    // regardless of what the latest search results contain.
    const pinnedOption = ref<VillageOption | null>(null)

    if (getSelectedVillageId) {
        watch(getSelectedVillageId, (id) => {
            if (!id) {
                pinnedOption.value = null
                return
            }

            if (pinnedOption.value?.value == id) return

            pinnedOption.value =
                searched.value.find((option) => option.value == id) ??
                (extraOptions?.() ?? []).find((option) => option.value == id) ??
                null
        }, { immediate: true })
    }

    const villageOptions = computed<VillageOption[]>(() => {
        const list = [...searched.value]

        if (pinnedOption.value && !list.some((option) => option.value === pinnedOption.value!.value)) {
            list.unshift(pinnedOption.value)
        }

        const extras = (extraOptions?.() ?? []).filter(
            (extra) => !list.some((option) => option.value === extra.value)
        )

        return [...extras, ...list]
    })

    function findRegionByVillageId(villageId: string | number | null | undefined) {
        return villageOptions.value.find((option) => option.value == villageId)
    }

    return { villageOptions, findRegionByVillageId, onSearch, loading }
}
