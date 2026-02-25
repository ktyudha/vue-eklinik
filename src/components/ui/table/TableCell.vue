<!-- components/UI/Table/TableCell.vue -->
<template>
    <component :is="isHeader ? 'th' : 'td'" :colspan="colSpan" :rowspan="rowSpan" :class="[defaultClass]">
        <slot />
    </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
    isHeader?: boolean

    colSpan?: number
    rowSpan?: number
}>(), {
    isHeader: false,
})

const defaultClass = computed(() =>
    props.isHeader
        ? 'px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400'
        : 'px-5 py-1 text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap'
)
</script>