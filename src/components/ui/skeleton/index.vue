<template>
    <div v-if="loading" :class="['animate-pulse bg-gray-200 dark:bg-gray-700 rounded', shapeClass, className]"></div>
    <template v-else>
        <slot />
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    loading: boolean;
    shape?: 'line' | 'circle' | 'rect'
    width?: string
    height?: string
    className?: string
}

const props = withDefaults(defineProps<Props>(), {
    shape: 'line',
    width: 'w-full',
    height: 'h-4',
})

const shapeClass = computed(() => {
    if (props.shape === 'circle') return `rounded-full ${props.width} ${props.height}`
    if (props.shape === 'rect') return `rounded-lg ${props.width} ${props.height}`
    return `rounded ${props.width} ${props.height}`
})
</script>