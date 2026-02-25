<template>
    <PatientDelete :on-open="isOpen" :on-close="closeModal" :id="props.id" :name="props.name" />

    <div class="relative inline-block" v-click-outside="closeDropdown">
        <button ref="reference" @click.stop="toggleDropdown" className="text-gray-500 dark:text-gray-400 ">
            <HiDotsHorizontal size="16" />
        </button>
        <!-- <Teleport to="body"> -->
        <div v-if="isOpenDropdown" ref="floating" :style="floatingStyles" class="z-50">
            <div
                class="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div class="flex space-x-1">
                    <button @click="router.push({ name: 'admin.patients.show' }); closeDropdown()"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlineEye size="14" />
                    </button>

                    <button @click="router.push({ name: 'admin.patients.edit' }); closeDropdown()"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlinePencil size="14" />
                    </button>

                    <button @click="openModal(); closeDropdown()"
                        class="text-xs flex w-full rounded-lg px-3 py-2 text-left font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                        <HiOutlineTrash size="14" />
                    </button>
                </div>
            </div>
        </div>
        <!-- </Teleport> -->
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { HiDotsHorizontal, HiOutlinePencil, HiOutlineEye, HiOutlineTrash } from 'vue3-icons/hi';
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/vue"
import { useRouter } from 'vue-router';
import PatientDelete from '../Action/PatientDelete.vue';
import { useModal } from '@/composables/useModal';

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

const isOpenDropdown = computed(() => props.openDropdownId === props.id)
const { isOpen, closeModal, openModal } = useModal()

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


</script>