<script setup lang="ts">
import { computed } from "vue"

interface Props {
    label?: string
    type?: string
    id?: string
    name?: string
    placeholder?: string
    modelValue?: string | number
    defaultValue?: string | number
    className?: string
    min?: string
    max?: string
    step?: number
    disabled?: boolean
    success?: boolean
    error?: boolean
    hint?: string
    withPrefixIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    disabled: false,
    success: false,
    error: false,
    withPrefixIcon: false,
    className: ""
})

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void
}>()

const inputClasses = computed(() => {
    let classes = `h-11 w-full rounded-lg border appearance-none py-2.5 pr-4 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${props.withPrefixIcon ? "pl-11" : "pl-4"
        } ${props.className}`

    if (props.disabled) {
        classes += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
    } else if (props.error) {
        classes += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`
    } else if (props.success) {
        classes += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`
    } else {
        classes += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`
    }

    return classes
})

function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    emit("update:modelValue", target.value)
}
</script>

<template>
    <div>
        <label v-if="label" class="block mb-1 text-sm font-medium">
            {{ label }}
        </label>

        <div class="relative">
            <!-- Prefix Icon -->
            <span v-if="withPrefixIcon"
                class="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" />
                </svg>
            </span>

            <!-- Input -->
            <input :id="id" :type="type" :name="name" :placeholder="placeholder" :value="modelValue ?? defaultValue"
                :min="min" :max="max" :step="step" :disabled="disabled" :class="inputClasses" @input="handleInput" />

            <!-- Hint -->
            <p v-if="hint" class="mt-1.5 text-xs" :class="{
                'text-error-500': error,
                'text-success-500': success,
                'text-gray-500': !error && !success
            }">
                {{ hint }}
            </p>
        </div>
    </div>
</template>