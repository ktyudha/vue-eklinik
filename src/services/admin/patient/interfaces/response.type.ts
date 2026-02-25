import type { Pagination } from "@/services/common/pagination/interfaces/response.type";

export interface IGetAllPatientResponse {
    patients: Patient[];
    pagination: Pagination;
}

export interface IGetPatientResponse {
    status?: string;
    message?: string;
    data: Patient;
}

export interface Patient {
    id: string;
    medical_record_number: string;
    name: string;
    username: string;
    email: string;
    phone_number: string;
    birth_place: string;
    birth_date: Date;
    nik: string;
    religion: string;
    education: string;
    marital_status: string;
    job: string;
    gender: string;
    additional_address: string;
    province: Province;
    city: City;
    sub_district: SubDistrict;
    village: Village;
}

export interface Province {
    id: string;
    name: string;
}

export interface City {
    id: string;
    name: string;
}

export interface SubDistrict {
    id: string;
    name: string;
}

export interface Village {
    id: string;
    name: string;
    postal_code: string;
}