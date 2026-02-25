<!-- components/UI/Table/TableFoot.vue -->
<template>
    <tfoot :class="['divide-y divide-gray-100 dark:divide-white/[0.05]', className]">
        <slot />
    </tfoot>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>