<template>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ComponentCard>
        <form class="space-y-5" @submit="onSubmit">
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="name" label="Nama" />
                <FormInput name="nik" label="NIK" />
                <FormInput name="username" label="Username" />
                <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <FormInput label="Tempat lahir" name="birth_place" />
                    <FormDateInput name="birth_date" label="Tanggal Lahir" mode="date" />
                </div>
                <!-- <FormInput label="Tanggal lahir" type="date" name="birth_date"  /> -->
                <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                    <SelectInput name="religion" label="Agama" placeholder="Pilih agama" :options="religionOptions" />
                    <FormRadioGroup name="gender" label="Jenis Kelamin" :options="genderOptions" />
                </div>
            </div>

            <hr>
            <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="email" label="Email" />
                <FormInput name="phone_number" label="No. Hp" />
                <FormVueSelect name="marital_status" label="Status Pernikahan" placeholder="Pilih status pernikahan"
                    :options="maritalStatusOptions" />
            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormVueSelect name="education" label="Pendidikan" placeholder="Pilih pendidikan"
                    :options="educationOptions" />
                <FormVueSelect name="job" label="Pekerjaan" placeholder="Pilih pekerjaan" :options="jobOptions" />
            </div>

            <hr>
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormVueSelect name="village_id" label="Desa/Kelurahan" placeholder="Cari desa/kelurahan"
                    :options="villageOptions" :loading="villageLoading" @search="onVillageSearch" />
            </div>

            <div class="grid grid-cols-1 gap-2">
                <FormTextarea name="additional_address" label="Alamat Tambahan"
                    placeholder="Detail alamat (RT/RW, patokan, dll)" />
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
    import { ref, watch } from 'vue';
    import FormInput from '@/components/forms/Input/FormInput.vue';
    import FormDateInput from '@/components/forms/FormElements/FormDateInput.vue';
    import FormRadioGroup from '@/components/forms/FormElements/FormRadioGroup.vue';
    import SelectInput from '@/components/forms/FormElements/SelectInput.vue';
    import FormVueSelect from '@/components/forms/FormElements/FormVueSelect.vue';
    import FormTextarea from '@/components/forms/FormElements/FormTextarea.vue';
    import { useRouter } from 'vue-router';
    import { patientSchema } from '@/services/admin/patient/schemas/request.schema';
    import { useForm } from 'vee-validate';
    import type { ICreatePatientPayload } from '@/services/admin/patient/interfaces/request.type';
    import useCreatePatient from '@/services/admin/patient/hooks/useCreatePatient';
    import { useVillageOptions } from '@/services/common/region/village/composables/useVillageOptions';
    import { religionOptions, genderOptions, maritalStatusOptions, educationOptions, jobOptions } from '@/services/admin/patient/constants/options';
    import { toast } from 'vue3-toastify';
    import Button from '@/components/ui/Button.vue';
    import Spinner from '@/components/ui/Spinner.vue';


    const currentPageTitle = ref("Tambah Pasien");

    const router = useRouter()

    const { handleSubmit, isSubmitting, values, setFieldValue } = useForm<ICreatePatientPayload>({
        validationSchema: patientSchema,
    })

    const { createData } = useCreatePatient();

    const { villageOptions, findRegionByVillageId, onSearch: onVillageSearch, loading: villageLoading } = useVillageOptions(() => values.village_id);

    watch(() => values.village_id, (villageId) => {
        const region = findRegionByVillageId(villageId);

        setFieldValue('sub_district_id', region?.subDistrict.value ?? '');
        setFieldValue('city_id', region?.city.value ?? '');
        setFieldValue('province_id', region?.province.value ?? '');
    })

    const onSubmit = handleSubmit(async (state) => {
        const { error } = await createData(state);

        if (error) {
            toast.error(error);
            return;
        }

        toast.success("Berhasil menambahkan pasien!");
        router.push({ name: 'admin.patients.index' });
    })
</script>
<style lang="">

</style>