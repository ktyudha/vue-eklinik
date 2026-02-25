<!-- components/UI/Table/TableNotFound.vue -->
<template>
    <tr>
        <td :colspan="colSpan" class="text-center py-16 text-gray-700 dark:text-gray-400">
            {{ message }}
        </td>
    </tr>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    colSpan?: number
    message?: string
}>(), {
    colSpan: 1,
    message: 'Data tidak tersedia',
})
</script>