<!-- FormVueSelect.vue -->
<script setup lang="ts">
import { useField } from 'vee-validate'
import { Select } from 'vue3-select-component'
import { useFormFieldLayout, type LabelPosition } from '@/components/forms/composables/useFormFieldLayout'

interface Option {
    label: string
    value: string | number
}

interface Props {
    name: string
    label?: string
    required?: boolean
    placeholder?: string
    options: Option[]
    searchable?: boolean
    clearable?: boolean
    loading?: boolean
    labelPosition?: LabelPosition
    width?: string
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    placeholder: 'Pilih opsi',
    searchable: true,
    clearable: true,
    loading: false,
    labelPosition: 'top',
    width: '',
})

const emit = defineEmits<{
    (e: 'search', value: string): void
}>()

const { wrapperClass, fieldClass, labelClass } = useFormFieldLayout(props)

const { value, errorMessage, handleBlur } = useField<string | number | null>(props.name, undefined, {
    initialValue: null,
})
</script>

<template>
    <div :class="[wrapperClass, width]">
        <!-- Label -->
        <label v-if="label" :class="labelClass">
            {{ label }}
            <small v-if="required" class="text-red-500">*</small>
        </label>

        <div :class="fieldClass">
            <Select v-model="value" :options="options" :placeholder="placeholder" :searchable="searchable"
                :clearable="clearable" :loading="loading" class="app-vue-select" @menu-closed="handleBlur"
                @search="emit('search', $event)" />

            <!-- Error message -->
            <p v-if="errorMessage" class="text-sm text-red-500">
                {{ errorMessage }}
            </p>
        </div>
    </div>
</template>

<style>
.app-vue-select[data-assembled-select] {
    --vs-min-height: 44px;
    --vs-border: 1px solid #d1d5db;
    --vs-border-radius: 0.5rem;
    --vs-font-size: 0.875rem;
    --vs-font-family: inherit;
    --vs-background-color: transparent;
    --vs-text-color: #1f2937;
    --vs-placeholder-color: #9ca3af;
    --vs-outline-color: #465fff;
    --vs-option-selected-background-color: #465fff;
    --vs-option-selected-text-color: #fff;
    --vs-option-focused-background-color: #eff2ff;
}

.dark .app-vue-select[data-assembled-select] {
    --vs-border: 1px solid #374151;
    --vs-background-color: #101828;
    --vs-text-color: rgba(255, 255, 255, 0.9);
    --vs-placeholder-color: rgba(255, 255, 255, 0.3);
    --vs-menu-background-color: #101828;
    --vs-menu-border: 1px solid #1f2937;
    --vs-option-hover-background-color: rgba(255, 255, 255, 0.03);
    --vs-option-focused-background-color: rgba(70, 95, 255, 0.15);
}
</style>
