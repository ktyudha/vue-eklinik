import * as yup from 'yup'
import type { ILoginPayloadRequest } from '../interfaces/request.type'

export const loginSchema: yup.ObjectSchema<ILoginPayloadRequest> = yup.object({
    username: yup.string().required(),
    password: yup.string().min(6).required(),
})