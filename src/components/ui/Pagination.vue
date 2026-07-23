<template>
    <div v-if="pagination" class="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row">
        <div class="flex flex-col items-center gap-3 sm:flex-row">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ rangeText }}</p>

            <div class="flex items-center gap-2">
                <!-- <label :for="selectId" class="text-sm text-gray-500 dark:text-gray-400">Tampilkan</label> -->
                <select :id="selectId" :value="pageLimit" @change="onLimitChange"
                    class="h-8 rounded-lg border border-gray-300 bg-transparent px-2 text-sm text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
                    <option v-for="option in pageLimitOptions" :key="option" :value="option">{{ option }}</option>
                </select>
                <!-- <span class="text-sm text-gray-500 dark:text-gray-400">per halaman</span> -->
            </div>
        </div>

        <div v-if="lastPage > 1" class="flex items-center gap-1">
            <button type="button" :disabled="currentPage === 1" @click="goTo(currentPage - 1)"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                <HiChevronLeft size="16" />
            </button>

            <template v-for="(page, index) in pages" :key="index">
                <span v-if="page === 'ellipsis'" class="px-2 text-sm text-gray-400 dark:text-gray-600">...</span>
                <button v-else type="button" @click="goTo(page)" :class="[
                    'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition',
                    page === currentPage
                        ? 'bg-brand-500 text-white'
                        : 'text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]',
                ]">
                    {{ page }}
                </button>
            </template>

            <button type="button" :disabled="currentPage === lastPage" @click="goTo(currentPage + 1)"
                class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                <HiChevronRight size="16" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, useId } from 'vue'
    import { HiChevronLeft, HiChevronRight } from 'vue3-icons/hi'
    import type { Pagination } from '@/services/common/pagination/interfaces/response.type'

    interface Props {
        pagination?: Pagination
        pageLimit: number
        pageLimitOptions?: number[]
        siblingCount?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        pageLimitOptions: () => [10, 15, 25, 50, 100],
        siblingCount: 1,
    })

    const emit = defineEmits<{
        (e: 'change', page: number): void
        (e: 'change-limit', limit: number): void
    }>()

    const selectId = useId()

    const currentPage = computed(() => props.pagination?.current_page ?? 1)
    const lastPage = computed(() => props.pagination?.last_page ?? 1)

    const rangeText = computed(() => {
        if (!props.pagination) return ''
        const { from, to, total } = props.pagination
        return `Menampilkan ${from ?? 0}-${to ?? 0} dari ${total} data`
    })

    const pages = computed<(number | 'ellipsis')[]>(() => {
        const total = lastPage.value
        const current = currentPage.value
        const sibling = props.siblingCount
        const windowSize = sibling * 2 + 5

        if (total <= windowSize) {
            return Array.from({ length: total }, (_, i) => i + 1)
        }

        const left = Math.max(current - sibling, 2)
        const right = Math.min(current + sibling, total - 1)

        const result: (number | 'ellipsis')[] = [1]
        if (left > 2) result.push('ellipsis')
        for (let i = left; i <= right; i++) result.push(i)
        if (right < total - 1) result.push('ellipsis')
        result.push(total)

        return result
    })

    function goTo(page: number) {
        if (page < 1 || page > lastPage.value || page === currentPage.value) return
        emit('change', page)
    }

    function onLimitChange(event: Event) {
        const value = Number((event.target as HTMLSelectElement).value)
        emit('change-limit', value)
    }
</script>
