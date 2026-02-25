<template>
    <div class="flex lg:flex-row flex-col lg:justify-between gap-4">
        <div>
            <Button size="sm" @click="route.push({ name: 'admin.patients.create' })">
                <HiPlus /> Tambah pasien
            </Button>
        </div>
        <Input :with-prefix-icon="true" type="text" @update:modelValue="(val) => debouncedSetName(val as string)" />
    </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/forms/Input';
import Button from '@/components/ui/Button.vue';
import { HiPlus } from 'vue3-icons/hi';
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core'

interface Props {
    setName: (e: string) => void;
}

const props = defineProps<Props>()
const route = useRouter()
const debounceDuration = 500

const debouncedSetName = useDebounceFn((val: string) => {
    props.setName(val)
}, debounceDuration)

</script>