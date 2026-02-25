import * as yup from 'yup'
import type { ILoginPayloadRequest } from '../interfaces/request.type'

export const loginSchema: yup.ObjectSchema<ILoginPayloadRequest> = yup.object({
    username: yup.string()
        .required('Username wajib diisi'),
    password: yup.string()
        .min(6, 'Password minimal 6 karakter')
        // .matches(/[A-Z]/, 'Password harus mengandung minimal 1 huruf besar')
        // .matches(/[a-z]/, 'Password harus mengandung minimal 1 huruf kecil')
        // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password harus mengandung minimal 1 simbol')
        .required('Password wajib diisi'),
})