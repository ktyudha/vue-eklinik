<template>
    <div :class="[
        'flex items-center justify-center rounded-full',
        'border border-gray-200 dark:border-gray-800',
        'bg-brand-600 text-white',
        sizeClasses[size]
    ]">
        <span class="flex items-center justify-center w-full h-full font-bold text-white">
            {{ getInitial(text) }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { getInitial } from '@/helpers/index'

interface Props {
    text: string
    size?: '8' | '10' | '11' | '12' | '16' | '20'
}

const sizeClasses: Record<string, string> = {
    '8': 'w-8 h-8',
    '10': 'w-10 h-10',
    '11': 'w-11 h-11',
    '12': 'w-12 h-12',
    '16': 'w-16 h-16',
    '20': 'w-20 h-20',
}

withDefaults(defineProps<Props>(), {
    size: '20',
})
</script>