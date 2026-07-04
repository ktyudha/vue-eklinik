import type { ApiResponse } from "@/services/common/api/interfaces/response.type";

export interface IGetAllProvinceResponse extends ApiResponse {
    provinces: Province[];
}


export interface Province {
    id: string;
    name: string;
    cities: City[];
}

export interface City {
    id: string;
    name: string;
}