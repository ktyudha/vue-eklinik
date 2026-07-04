import type { ApiResponse } from "@/services/common/api/interfaces/response.type";

export interface IGetOneProvinceResponse extends ApiResponse {
    province: Province;
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