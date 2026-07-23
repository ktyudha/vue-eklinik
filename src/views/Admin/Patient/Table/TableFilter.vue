<template>
    <div class="flex lg:flex-row flex-col lg:justify-between gap-4">
        <div class="flex items-center gap-2">
            <Button size="sm" class="!w-auto shrink-0 whitespace-nowrap"
                @click="route.push({ name: 'admin.patients.create' })">
                <HiPlus /> Tambah pasien
            </Button>

            <TableAction v-if="selectedCount > 0" id="bulk-actions" :open-dropdown-id="openActionId"
                placement="bottom-start" @toggle="openActionId = $event">
                <template #trigger>
                    <Button size="sm" variant="outline" class="!w-auto shrink-0 whitespace-nowrap">
                        Aksi
                        <HiChevronDown />
                    </Button>
                </template>

                <TableAction.Button v-if="selectedCount === 1"
                    @click="route.push({ name: 'admin.patients.edit', params: { id: selectedIds[0] } })">
                    <HiOutlinePencil class="size-4 mr-2" /> Edit
                </TableAction.Button>

                <TableAction.Button class="!text-error-600 dark:!text-error-500" @click="$emit('bulk-delete')">
                    <HiOutlineTrash class="size-4 mr-2" /> Hapus
                </TableAction.Button>
            </TableAction>
        </div>
        <Input :with-prefix-icon="true" type="text" @update:modelValue="(val) => debouncedSetName(val as string)" />
    </div>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { Input } from '@/components/forms/Input';
    import Button from '@/components/ui/Button.vue';
    import { TableAction } from '@/components/ui/table';
    import { HiPlus, HiChevronDown, HiOutlinePencil, HiOutlineTrash } from 'vue3-icons/hi';
    import { useRouter } from 'vue-router';
    import { useDebounceFn } from '@vueuse/core'

    interface Props {
        setName: (e: string) => void;
        selectedIds: string[];
    }

    const props = defineProps<Props>()
    defineEmits<{
        (e: 'bulk-delete'): void
    }>()
    const route = useRouter()
    const debounceDuration = 500
    const selectedCount = computed(() => props.selectedIds.length)
    const openActionId = ref<string | null>(null)

    const debouncedSetName = useDebounceFn((val: string) => {
        props.setName(val)
    }, debounceDuration)

</script>
