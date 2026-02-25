<!-- components/UI/Table/TableWrapper.vue -->
<template>
    <div :class="['overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800', className]">
        <div class="custom-scrollbar overflow-x-auto">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>