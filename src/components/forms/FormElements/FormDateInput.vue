<script setup lang="ts">
import { useField } from 'vee-validate'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import flatpickr from 'flatpickr'
import { Indonesian } from 'flatpickr/dist/l10n/id.js'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect/index.js'
import 'flatpickr/dist/flatpickr.min.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import type { Instance } from 'flatpickr/dist/types/instance'
import type { Options } from 'flatpickr/dist/types/options'

type DateMode = 'date' | 'month-year' | 'year'

interface Props {
    name: string
    label?: string
    required?: boolean
    mode?: DateMode
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    mode: 'date',
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const picker = ref<Instance | null>(null)

const { value, errorMessage, handleBlur } = useField<string>(props.name)

function getConfig(): Options {
    const base: Options = {
        locale: Indonesian,
        disableMobile: true,
        onChange: ([date]) => {
            if (!date) return

            if (props.mode === 'year') {
                value.value = String(date.getFullYear())
            } else if (props.mode === 'month-year') {
                const m = String(date.getMonth() + 1).padStart(2, '0')
                value.value = `${date.getFullYear()}-${m}`
            } else {
                const d = String(date.getDate()).padStart(2, '0')
                const m = String(date.getMonth() + 1).padStart(2, '0')
                value.value = `${date.getFullYear()}-${m}-${d}`
            }

            emit('update:modelValue', value.value)
        },
        onClose: () => handleBlur(),
    }

    if (props.mode === 'date') {
        return { ...base, dateFormat: 'Y-m-d', altInput: true, altFormat: 'd F Y' }
    }
    if (props.mode === 'month-year') {
        return {
            ...base,
            plugins: [monthSelectPlugin({ shorthand: false, dateFormat: 'Y-m', altFormat: 'F Y' })],
            onReady: (_: unknown, __: unknown, fp: Instance) => {
                fp.calendarContainer.style.setProperty('width', '320px', 'important')
            },
        }
    }
    // year — pakai parseDate trick karena flatpickr tidak punya year-only mode
    return {
        ...base,
        dateFormat: 'Y',
        altInput: true,
        altFormat: 'Y',
        minDate: '1900',
        maxDate: String(new Date().getFullYear()),
    }
}

onMounted(() => {
    if (!inputRef.value) return
    picker.value = flatpickr(inputRef.value, getConfig())
})

watch(value, (val) => {
    if (picker.value && val !== picker.value.input.value) {
        picker.value.setDate(val, false)
    }
})

onUnmounted(() => picker.value?.destroy())
</script>

<template>
    <div class="space-y-1">
        <!-- Label -->
        <label v-if="label" class="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
            {{ label }}
            <small v-if="required" class="text-red-500">*</small>
        </label>

        <!-- Input -->
        <input ref="inputRef" type="text"
            :placeholder="mode === 'date' ? 'Pilih tanggal' : mode === 'month-year' ? 'Pilih bulan & tahun' : 'Pilih tahun'"
            :required="required"
            class="h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />

        <!-- Error message -->
        <p v-if="errorMessage" class="text-sm text-red-500">
            {{ errorMessage }}
        </p>
    </div>
</template>