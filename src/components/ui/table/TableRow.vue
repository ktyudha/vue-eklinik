<!-- components/UI/Table/TableRow.vue -->
<template>
    <tr :class="className">
        <slot />
    </tr>
</template>

<script setup lang="ts">
defineProps<{ className?: string }>()
</script>