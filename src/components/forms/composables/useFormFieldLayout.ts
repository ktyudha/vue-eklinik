import { computed } from 'vue'

export type LabelPosition = 'top' | 'left'

interface LayoutProps {
    labelPosition?: LabelPosition
}

export function useFormFieldLayout(props: LayoutProps) {
    const isLabelLeft = computed(() => props.labelPosition === 'left')

    const wrapperClass = computed(() =>
        isLabelLeft.value ? 'sm:flex sm:items-start sm:gap-3' : 'space-y-1'
    )

    const fieldClass = computed(() => (isLabelLeft.value ? 'flex-1 space-y-1' : ''))

    const labelClass = computed(() =>
        isLabelLeft.value
            ? 'text-theme-sm font-normal text-gray-500 dark:text-gray-400 sm:w-40 sm:shrink-0 sm:pt-2.5'
            : 'text-theme-sm font-normal text-gray-500 dark:text-gray-400'
    )

    return { isLabelLeft, wrapperClass, fieldClass, labelClass }
}
