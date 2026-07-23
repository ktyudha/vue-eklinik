<template>


    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ComponentCard>

        <TableFilter :set-name="setName" :selected-ids="selectedIds"
            @bulk-delete="bulkDeleteModal.openModal" />

        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell :is-header="true">
                            <TableCheckbox :model-value="allSelected" @update:model-value="toggleSelectAll" />
                        </TableCell>
                        <TableCell :is-header="true" class="text-start">ERM</TableCell>
                        <TableCell :is-header="true" class="text-start">Nama</TableCell>
                        <TableCell :is-header="true" class="text-start">NIK</TableCell>
                        <TableCell :is-header="true" class="text-start">Jenis Kelamin</TableCell>
                        <TableCell :is-header="true" class="text-start">Umur</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableLoading v-if="loading" :col-span="6" />
                    <TableNotFound v-else-if="isEmpty(data) || !data" :col-span="6" />
                    <template v-for="(item) in data" :key="item.id">
                        <TableItem :item="item" :selected="selectedIds.includes(item.id)"
                            @toggle-select="toggleSelect" />
                    </template>
                </TableBody>
            </Table>
        </TableWrapper>

        <Pagination :pagination="pagination" :page-limit="pageLimit" @change="setPageNum"
            @change-limit="setPageLimit" />
    </ComponentCard>

    <PatientBulkDelete :on-open="bulkDeleteModal.isOpen.value" :on-close="bulkDeleteModal.closeModal" :ids="selectedIds"
        @deleted="selectedIds = []" />

</template>
<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import isEmpty from 'lodash/isEmpty'

    import ComponentCard from '@/components/common/ComponentCard.vue';
    import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
    import Pagination from '@/components/ui/Pagination.vue';
    import { Table, TableBody, TableCell, TableCheckbox, TableHeader, TableLoading, TableNotFound, TableRow, TableWrapper } from '@/components/ui/table';
    import TableFilter from './TableFilter.vue';

    import { useGetAllPatient } from '@/services/admin/patient/hooks/useGetAllPatient';
    import { useModal } from '@/composables/useModal';
    import TableItem from './TableItem.vue';
    import PatientBulkDelete from '../Action/PatientBulkDelete.vue';

    const currentPageTitle = ref("Pasien");
    const { data, loading, setName, pagination, setPageNum, pageLimit, setPageLimit } = useGetAllPatient()

    const selectedIds = ref<string[]>([])
    const bulkDeleteModal = useModal()

    const allSelected = computed(() =>
        !isEmpty(data.value) && (data.value ?? []).every((item) => selectedIds.value.includes(item.id))
    )

    function toggleSelect(id: string) {
        selectedIds.value = selectedIds.value.includes(id)
            ? selectedIds.value.filter((selectedId) => selectedId !== id)
            : [...selectedIds.value, id]
    }

    function toggleSelectAll() {
        selectedIds.value = allSelected.value ? [] : (data.value ?? []).map((item) => item.id)
    }

    watch(data, () => {
        selectedIds.value = []
    })

</script>
<style lang="">

</style>