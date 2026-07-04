<!-- FormCheckboxItem.vue — single option inside a FormCheckboxGroup, not meant to be used standalone (use FormCheckbox for that) -->
<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

interface Props {
    name: string
    value: string
    label: string
    required?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
})

const { value: fieldValue, handleBlur } = useField<string[]>(props.name, undefined, {
    type: 'checkbox',
    checkedValue: props.value,
})

const checked = computed(() => Array.isArray(fieldValue.value) && fieldValue.value.includes(props.value))
</script>

<template>
    <label :class="[
        'relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium',
        disabled
            ? 'cursor-not-allowed text-gray-400 dark:text-gray-600'
            : 'text-gray-700 dark:text-gray-400',
    ]">
        <!-- Hidden native checkbox -->
        <input type="checkbox" :name="name" :value="value" :disabled="disabled" :required="required"
            v-model="fieldValue" @blur="handleBlur" class="sr-only" />

        <!-- Custom checkbox box -->
        <span :class="[
            'flex h-5 w-5 items-center justify-center rounded-md border-[1.25px] transition-colors duration-150',
            checked
                ? 'border-brand-500 bg-brand-500'
                : 'border-gray-300 bg-transparent dark:border-gray-700',
        ]">
            <svg v-if="checked" width="14" height="14" viewBox="0 0 14 14" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" stroke-width="1.94437"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>

        {{ label }}
    </label>
</template>
