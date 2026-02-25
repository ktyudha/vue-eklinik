<template>
    <button v-bind="$attrs" @click="handleClick" class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium
           text-gray-500 hover:bg-gray-100 hover:text-gray-700
           dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { inject } from "vue"

defineOptions({
    inheritAttrs: false,
})

const close = inject<() => void>("tableActionClose")

function handleClick() {
    close?.()
}
</script>