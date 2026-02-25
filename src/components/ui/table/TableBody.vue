<!-- components/UI/Table/TableBody.vue -->
<template>
    <tbody :class="['divide-y divide-gray-100 dark:divide-white/[0.05]', className]">
        <slot />
    </tbody>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>