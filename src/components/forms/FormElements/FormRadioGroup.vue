<script setup lang="ts">
import FormRadio from './FormRadio.vue'
import { useField } from 'vee-validate'

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
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    disabled: false,
})

const { errorMessage } = useField(props.name)
</script>

<template>
    <div class="space-y-1">
        <!-- Label -->
        <label v-if="label" class="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
            {{ label }}
            <small v-if="required" class="text-red-500">*</small>
        </label>

        <!-- Radio options -->
        <div class="flex flex-wrap gap-4">
            <FormRadio v-for="opt in options" :key="opt.value" :name="name" :value="opt.value" :label="opt.label"
                :required="required" :disabled="disabled || !!opt.disabled" />
        </div>

        <!-- Error message -->
        <p v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
        </p>
    </div>
</template>