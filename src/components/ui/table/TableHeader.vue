<!-- components/UI/Table/TableHeader.vue -->
<template>
    <thead :class="['border-b border-gray-100 dark:border-white/[0.05]', className]">
        <slot />
    </thead>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>