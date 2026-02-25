import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useClickOutside(
    targets: Ref<HTMLElement | null>[],
    callback: () => void
) {
    function handleClick(e: MouseEvent) {
        const isOutside = targets.every(
            (target) => target.value && !target.value.contains(e.target as Node)
        )
        if (isOutside) callback()
    }

    function handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape') callback()
    }

    onMounted(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleEscape)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClick)
        document.removeEventListener('keydown', handleEscape)
    })
}