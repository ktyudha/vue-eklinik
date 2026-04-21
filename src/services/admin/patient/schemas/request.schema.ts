import * as yup from 'yup'
import type { ICreatePatientPayload } from '../interfaces/request.type'

export const patientSchema: yup.ObjectSchema<ICreatePatientPayload> = yup.object({
    name: yup.string().required('Nama wajib diisi'),
    username: yup.string().required('Username wajib diisi'),
    birth_place: yup.string().required('Tempat lahir wajib diisi'),
    birth_date: yup.string().required('Tanggal lahir wajib diisi'),
    nik: yup
        .string()
        .length(16, 'NIK harus 16 digit')
        .matches(/^\d+$/, 'NIK hanya boleh berisi angka')
        .required('NIK wajib diisi'),
    email: yup
        .string()
        .email('Format email tidak valid')
        .required('Email wajib diisi'),
    phone_number: yup
        .string()
        .matches(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Format nomor telepon tidak valid')
        .required('Nomor telepon wajib diisi'),
    religion: yup.string().required('Agama wajib diisi'),
    gender: yup.string().required('Jenis kelamin wajib diisi'),
    marital_status: yup.string().required('Status pernikahan wajib diisi'),
    education: yup.string().required('Pendidikan wajib diisi'),
    job: yup.string().required('Pekerjaan wajib diisi'),
    province_id: yup.string().required('Provinsi wajib diisi'),
    sub_district_id: yup.string().required('Kecamatan wajib diisi'),
    city_id: yup.string().required('Kota/Kabupaten wajib diisi'),
    village_id: yup.string().required('Kelurahan/Desa wajib diisi'),
    additional_address: yup.string().required('Alamat tambahan wajib diisi'),
})