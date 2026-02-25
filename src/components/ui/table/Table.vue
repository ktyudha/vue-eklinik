<!-- components/UI/Table/Table.vue -->
<template>
    <table :class="['min-w-full', className]">
        <slot />
    </table>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>