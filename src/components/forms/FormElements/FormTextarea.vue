<!-- FormTextarea.vue -->
<script setup lang="ts">
import { useField } from 'vee-validate'
import { useFormFieldLayout, type LabelPosition } from '@/components/forms/composables/useFormFieldLayout'

interface Props {
    name: string
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    rows?: number
    labelPosition?: LabelPosition
    width?: string
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    rows: 4,
    labelPosition: 'top',
    width: '',
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const { wrapperClass, fieldClass, labelClass } = useFormFieldLayout(props)

const { value, errorMessage, handleBlur } = useField<string>(props.name)
</script>

<template>
    <div :class="[wrapperClass, width]">
        <!-- Label -->
        <label v-if="label" :class="labelClass">
            {{ label }}
            <small v-if="required" class="text-red-500">*</small>
        </label>

        <div :class="fieldClass">
            <textarea v-model="value" :rows="rows" :placeholder="placeholder" :required="required"
                :disabled="disabled" @blur="handleBlur"
                @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:disabled:border-gray-800 dark:disabled:bg-white/[0.03]" />

            <!-- Error message -->
            <p v-if="errorMessage" class="text-sm text-red-500">
                {{ errorMessage }}
            </p>
        </div>
    </div>
</template>
