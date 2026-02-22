<script setup lang="ts">
import { useField } from 'vee-validate'
import FormInput from './FormInput.vue'

interface Props {
    name: string
    label?: string
    type?: string
    placeholder?: string
    required?: boolean
    isPassword?: boolean
}

const props = defineProps<Props>()

const { value, errorMessage, handleBlur } = useField<string>(props.name)
</script>

<template>
    <div class="space-y-1">
        <FormInput v-model="value" :label="label" :type="type" :placeholder="placeholder" :required="required"
            :isPassword="isPassword" @blur="handleBlur" />

        <p v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
        </p>
    </div>
</template>