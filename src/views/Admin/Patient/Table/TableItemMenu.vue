<template>
    <PatientDelete :on-open="isOpen" :on-close="closeModal" :id="props.id" :name="props.name" />

    <div class="relative inline-block">
        <button ref="reference" @click.stop="toggleDropdown" className="text-gray-500 dark:text-gray-400 ">
            <HiDotsHorizontal size="16" />
        </button>

        <div v-if="isOpenDropdown" ref="floating" :style="floatingStyles" class="z-50">
            <div
                class="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div class="flex space-x-1">
                    <button @click="router.push({ name: 'admin.patients.show' })"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlineEye size="14" />
                    </button>

                    <button @click="router.push({ name: 'admin.patients.edit' })"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlinePencil size="14" />
                    </button>

                    <button @click="openModal"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlineTrash size="14" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from 'vue-router';
import { HiDotsHorizontal, HiOutlinePencil, HiOutlineEye, HiOutlineTrash } from 'vue3-icons/hi';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/vue"

import { useModal } from '@/composables/useModal';
import { useClickOutside } from "@/composables/useClickOutside";

import PatientDelete from '../Action/PatientDelete.vue';

interface Props {
    id: string
    name: string
    openDropdownId: string | null;
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (e: 'toggle', value: string | null): void
}>()

const router = useRouter()
const { isOpen, closeModal, openModal } = useModal()

const isOpenDropdown = computed(() => props.openDropdownId === props.id)

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

function toggleDropdown() {
    emit('toggle', isOpenDropdown.value ? null : props.id)
}

function closeDropdown() {
    emit('toggle', null)
}

const { floatingStyles } = useFloating(reference, floating, {
    placement: "left-start",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
})

useClickOutside([reference, floating], closeDropdown)

</script>