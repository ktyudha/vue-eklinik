<!-- FormSelect.vue -->
<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref } from 'vue'
import { HiChevronDown } from 'vue3-icons/hi'
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
  labelPosition?: LabelPosition
  width?: string
}

const isOpen = ref(false)

const props = withDefaults(defineProps<Props>(), {
  required: false,
  placeholder: 'Pilih opsi',
  labelPosition: 'top',
  width: '',
})

const { wrapperClass, fieldClass, labelClass } = useFormFieldLayout(props)

const { value, errorMessage, handleBlur } = useField<string>(props.name, undefined, {
  initialValue: '',
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
      <!-- Select wrapper -->
      <div class="relative">
        <select v-model="value" :required="required" @focus="isOpen = true" @blur="isOpen = false; handleBlur()"
          :placeholder="placeholder"
          class="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
          :class="value ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-white/30'">
          <option value="" disabled selected>{{ placeholder }}</option>
          <option v-for="opt in options" :key="opt.value" :value="opt.value"
            class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            {{ opt.label }}
          </option>
        </select>

        <!-- Chevron icon -->
        <span
          class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-200 dark:text-gray-400"
          :class="isOpen ? 'rotate-180' : 'rotate-0'">
          <HiChevronDown />
        </span>
      </div>

      <!-- Error message -->
      <p v-if="errorMessage" class="text-sm text-red-500">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>