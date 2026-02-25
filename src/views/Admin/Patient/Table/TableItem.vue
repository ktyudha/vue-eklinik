<template>
    <TableRow>
        <TableCell class="whitespace-nowrap !text-brand-600 dark:!text-white">{{ item.medical_record_number }}
        </TableCell>
        <TableCell class="whitespace-nowrap uppercase !text-brand-600 dark:!text-white font-semibold">{{ item.name }}
        </TableCell>
        <TableCell class="whitespace-nowrap">{{ item.nik }}</TableCell>
        <TableCell class="whitespace-nowrap">
            <Badge :color="item.gender.toLowerCase() == 'laki-laki' ? 'primary' : 'success'" size="sm">{{ item.gender }}
            </Badge>
        </TableCell>
        <TableCell class="whitespace-nowrap">
            <b>{{ formatAge(item.birth_date) }}</b>
            <br>
            <span class="text-gray-400 dark:text-gray-500">{{ formatDateShort(item.birth_date)
                }}</span>
        </TableCell>
        <TableCell>
            <TableItemMenu :id="item.id" :name="item.name" :open-dropdown-id="openDropdownId"
                @toggle="$emit('toggle', $event)" />
        </TableCell>
    </TableRow>
</template>
<script setup lang="ts">
import Badge from '@/components/ui/badge/Badge.vue';
import { TableRow, TableCell } from '@/components/ui/table';
import { formatAge, formatDateShort } from '@/helpers';
import type { Patient } from '@/services/admin/patient/interfaces/response.type';
import TableItemMenu from './TableItemMenu.vue';

interface Props {
    item: Patient;
    openDropdownId: string | null;
}

defineProps<Props>()
</script>