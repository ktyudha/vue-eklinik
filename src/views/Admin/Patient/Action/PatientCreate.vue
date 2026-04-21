<template>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <ComponentCard>
        <form class="space-y-5" @submit="onSubmit">
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="name" label="Nama" required />
                <FormInput name="nik" label="NIK" required />
                <!-- <FormInput name="username" label="Username" required /> -->
                <FormInput label="Tempat lahir" name="birth_place" required />
                <FormInput label="Tanggal lahir" type="date" name="birth_date" required />
                <FormInput name="religion" label="Agama" required />
                <FormInput name="gender" label="Jenis Kelamin" required />
            </div>


            <hr>
            <div class="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="email" label="Email" required />
                <FormInput name="phone_number" label="No. Hp" required />
                <FormInput name="marital_status" label="Status Pernikahan" required />
            </div>

            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="education" label="Pendidikan" required />
                <FormInput name="job" label="Pekerjaan" required />
            </div>

            <hr>
            <div class="grid lg:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
                <FormInput name="village_id" label="Desa/Kelurahan" required />
                <FormInput name="sub_district_id" label="Kecamatan" required />
                <FormInput name="city_id" label="Kabupaten/Kota" required />
                <FormInput name="province_id" label="Provinsi" required />
            </div>

            <div>
                <Button type="submit" :disabled="!meta.valid || isSubmitting" class="w-full">
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
import { ref } from 'vue';
import FormInput from '@/components/forms/Input/FormInput.vue';
import { useRouter } from 'vue-router';
import { patientSchema } from '@/services/admin/patient/schemas/request.schema';
import { useForm } from 'vee-validate';
import type { ICreatePatientPayload } from '@/services/admin/patient/interfaces/request.type';
import useCreatePatient from '@/services/admin/patient/hooks/useCreatePatient';
import { toast } from 'vue3-toastify';
import { isAxiosError } from 'axios';

const currentPageTitle = ref("Tambah Pasien");

const router = useRouter()

const { handleSubmit, isSubmitting, meta } = useForm<ICreatePatientPayload>({
    validationSchema: patientSchema,
})

const { createData } = useCreatePatient();


const onSubmit = handleSubmit(async (state) => {
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