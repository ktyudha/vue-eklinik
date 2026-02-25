<!-- components/UI/Table/TableLoading.vue -->
<template>
    <tr>
        <td :colspan="colSpan" class="text-center py-16">
            <div class="flex justify-center">
                <VueSpinnerHourglass color="var(--color-brand-600)" size="28" />
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">
import { VueSpinnerHourglass } from 'vue3-spinners' // atau sesuai package yang dipakai

withDefaults(defineProps<{
    colSpan?: number
}>(), {
    colSpan: 1,
})
</script>