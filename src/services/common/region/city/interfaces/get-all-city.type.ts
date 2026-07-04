import type { ApiResponse } from "@/services/common/api/interfaces/response.type";

export interface IGetAllCityResponse extends ApiResponse {
    cities: City[];
}


export interface City {
    id: string;
    name: string;
    sub_districts: SubDistrict[];
}

export interface SubDistrict {
    id: string;
    name: string;
}