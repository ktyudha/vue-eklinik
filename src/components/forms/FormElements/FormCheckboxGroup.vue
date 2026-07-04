<!-- FormCheckboxGroup.vue — multiple checkboxes bound to a single array field -->
<script setup lang="ts">
import FormCheckboxItem from './FormCheckboxItem.vue'
import { useField } from 'vee-validate'
import { useFormFieldLayout, type LabelPosition } from '@/components/forms/composables/useFormFieldLayout'

interface Option {
    label: string
    value: string
    disabled?: boolean
}

interface Props {
    name: string
    label?: string
    options: Option[]
    required?: boolean
    disabled?: boolean
    labelPosition?: LabelPosition
    width?: string
    direction?: 'row' | 'column'
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
    labelPosition: 'top',
    width: '',
    direction: 'row',
})

const { wrapperClass, fieldClass, labelClass } = useFormFieldLayout(props)

const { errorMessage } = useField<string[]>(props.name, undefined, { initialValue: [] })
</script>

<template>
    <div :class="[wrapperClass, width]">
        <!-- Label -->
        <label v-if="label" :class="labelClass">
            {{ label }}
            <small v-if="required" class="text-red-500">*</small>
        </label>

        <div :class="fieldClass">
            <!-- Checkbox options -->
            <div :class="direction === 'column' ? 'flex flex-col gap-3' : 'flex flex-wrap gap-4'">
                <FormCheckboxItem v-for="opt in options" :key="opt.value" :name="name" :value="opt.value"
                    :label="opt.label" :required="required" :disabled="disabled || !!opt.disabled" />
            </div>

            <!-- Error message -->
            <p v-if="errorMessage" class="text-sm text-red-500">
                {{ errorMessage }}
            </p>
        </div>
    </div>
</template>
