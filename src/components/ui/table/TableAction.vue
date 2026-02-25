<template>
    <div class="relative inline-block">
        <button ref="reference" @click.stop="toggleDropdown">
            <slot name="trigger" />
        </button>

        <!-- <Teleport to="body"> -->
        <div v-if="isOpen" ref="floating" :style="floatingStyles" class="z-50">
            <div
                class="p-2 bg-white border border-gray-200 rounded-2xl shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <div class="flex space-x-1">
                    <slot />
                </div>
            </div>
        </div>
        <!-- </Teleport> -->
    </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount, computed } from "vue"
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/vue"

interface Props {
    id: string
    openDropdownId: string | null;
}

const props = defineProps<Props>()
const isOpen = computed(() => props.openDropdownId === props.id)
const emit = defineEmits<{
    (e: 'toggle', value: string | null): void
}>()

const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)

function toggleDropdown() {
    emit('toggle', isOpen.value ? null : props.id)
}

function closeDropdown() {
    emit('toggle', null)
}


provide("tableActionClose", closeDropdown)

const { floatingStyles } = useFloating(reference, floating, {
    placement: "left-start",
    strategy: "fixed",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
})

/* Close on outside click */
function handleClickOutside(e: MouseEvent) {
    if (
        isOpen.value &&
        floating.value &&
        reference.value &&
        !floating.value.contains(e.target as Node) &&
        !reference.value.contains(e.target as Node)
    ) {
        closeDropdown()
    }
}

/* Close on ESC */
function handleEscape(e: KeyboardEvent) {
    if (e.key === "Escape") closeDropdown()
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
})

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside)
    document.removeEventListener("keydown", handleEscape)
})


defineExpose({ closeDropdown })
</script>