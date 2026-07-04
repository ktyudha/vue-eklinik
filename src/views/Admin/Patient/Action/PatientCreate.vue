<template>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ComponentCard>
        <form class="space-y-5" @submit="onSubmit">
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="name" label="Nama" />
                <FormInput name="nik" label="NIK" />
                <!-- <FormInput name="username" label="Username"  /> -->
                <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <FormInput label="Tempat lahir" name="birth_place" />
                    <FormDateInput name="birth_date" label="Tanggal Lahir" mode="date" />
                </div>
                <!-- <FormInput label="Tanggal lahir" type="date" name="birth_date"  /> -->
                <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <SelectInput name="religion" label="Agama" placeholder="Pilih agama" :options="[
                        { value: 'islam', label: 'Islam' },
                        { value: 'kristen', label: 'Kristen' },
                        { value: 'katolik', label: 'Katolik' },
                        { value: 'hindu', label: 'Hindu' },
                        { value: 'buddha', label: 'Buddha' },
                        { value: 'konghucu', label: 'Konghucu' },
                    ]" />
                    <FormRadioGroup name="gender" label="Jenis Kelamin" :options="[
                        { value: 'male', label: 'Laki-laki' },
                        { value: 'female', label: 'Perempuan' },
                    ]" />
                </div>
            </div>

            <hr>
            <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="email" label="Email" />
                <FormInput name="phone_number" label="No. Hp" />
                <FormInput name="marital_status" label="Status Pernikahan" />
            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="education" label="Pendidikan" />
                <FormInput name="job" label="Pekerjaan" />
            </div>

            <hr>
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <SelectInput name="village_id" label="Desa/Kelurahan" :options="villageOptions" />
            </div>

            <div>
                <Button type="submit" class="w-full">
                    <Spinner v-if="isSubmitting" />
                    <span v-else>Kirim</span>
                </Button>
            </div>
        </form>
    </ComponentCard>

</template>
<script setup lang="ts">
    import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
    import ComponentCard from '@/components/common/ComponentCard.vue';
    import { computed, ref } from 'vue';
    import FormInput from '@/components/forms/Input/FormInput.vue';
    import FormDateInput from '@/components/forms/FormElements/FormDateInput.vue';
    import FormRadioGroup from '@/components/forms/FormElements/FormRadioGroup.vue';
    import SelectInput from '@/components/forms/FormElements/SelectInput.vue';
    import { useRouter } from 'vue-router';
    import { patientSchema } from '@/services/admin/patient/schemas/request.schema';
    import { useForm } from 'vee-validate';
    import type { ICreatePatientPayload } from '@/services/admin/patient/interfaces/request.type';
    import useCreatePatient from '@/services/admin/patient/hooks/useCreatePatient';
    import useGetAllVillage from '@/services/common/region/village/hooks/useGetAllVillage';
    import { toast } from 'vue3-toastify';
    import { isAxiosError } from 'axios';
    import Button from '@/components/ui/Button.vue';


    const currentPageTitle = ref("Tambah Pasien");

    const router = useRouter()

    const { handleSubmit, isSubmitting, meta } = useForm<ICreatePatientPayload>({
        validationSchema: patientSchema,
    })

    const { createData } = useCreatePatient();

    const { villages } = useGetAllVillage();
    const villageOptions = computed(() =>
        (villages.value ?? []).map((village) => ({
            value: village.id,
            label: village.name,
            city: {
                value: village.city.id,
                label: village.city.name,
            },
            province: {
                value: village.province.id,
                label: village.province.name,
            }
        }))
    );

    const onSubmit = handleSubmit(async (state) => {
        const region = villageOptions.value.find((village) => village?.value == state.village_id);
        const payload = {
            city_id: region?.city.value,
            province_id: region?.province.value,
            ...state
        }

        console.log(payload);
        try {
            await createData(state);

            toast.success("Berhasil masuk akun!")
            router.push("/admin/dashboard");

        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error((error as Error).message);
            }
        }
    })
</script>
<style lang="">

</style>