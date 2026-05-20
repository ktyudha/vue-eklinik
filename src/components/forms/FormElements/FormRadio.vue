<!-- FormRadio.vue -->
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

const { value: fieldValue, handleBlur } = useField<string>(props.name, undefined, {
    type: 'radio',
    checkedValue: props.value,
})

const checked = computed(() => fieldValue.value === props.value)
</script>

<template>
    <label :class="[
        'relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium',
        disabled
            ? 'cursor-not-allowed text-gray-400 dark:text-gray-600'
            : 'text-gray-700 dark:text-gray-400',
    ]">
        <!-- Hidden native radio -->
        <input type="radio" :name="name" :value="value" :disabled="disabled" :required="required" v-model="fieldValue"
            @blur="handleBlur" class="sr-only" />

        <!-- Custom radio circle -->
        <span :class="[
            'flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] transition-colors duration-150',
            checked
                ? 'border-brand-500 bg-brand-500'
                : 'border-gray-300 bg-transparent dark:border-gray-700',
        ]">
            <span :class="['h-2 w-2 rounded-full bg-white', checked ? 'block' : 'hidden']" />
        </span>

        {{ label }}
    </label>
</template>