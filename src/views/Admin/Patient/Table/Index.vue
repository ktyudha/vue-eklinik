<template>


    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ComponentCard>

        <TableFilter :set-name="setName" />

        <TableWrapper>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableCell :is-header="true" class="text-start">ERM</TableCell>
                        <TableCell :is-header="true" class="text-start">Nama</TableCell>
                        <TableCell :is-header="true" class="text-start">NIK</TableCell>
                        <TableCell :is-header="true" class="text-start">Jenis Kelamin</TableCell>
                        <TableCell :is-header="true" class="text-start">Umur</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableLoading v-if="loading" :col-span="5" />
                    <TableNotFound v-else-if="isEmpty(data) || !data" :col-span="5" />
                    <template v-for="(item, index) in data" :key="index">
                        <TableItem :item="item" :open-dropdown-id="openDropdownId" @toggle="openDropdownId = $event" />
                    </template>
                </TableBody>
            </Table>
        </TableWrapper>
    </ComponentCard>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import isEmpty from 'lodash/isEmpty'

import ComponentCard from '@/components/common/ComponentCard.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import { Table, TableBody, TableCell, TableHeader, TableLoading, TableNotFound, TableRow, TableWrapper } from '@/components/ui/table';
import TableFilter from './TableFilter.vue';

import { useGetAllPatient } from '@/services/admin/patient/hooks/useGetAllPatient';
import TableItem from './TableItem.vue';

const currentPageTitle = ref("Pasien");
const { data, loading, setName } = useGetAllPatient()
const openDropdownId = ref<string | null>(null)

</script>
<style lang="">

</style>