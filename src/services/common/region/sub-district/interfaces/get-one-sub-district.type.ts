import type { ApiResponse } from "@/services/common/api/interfaces/response.type";

export interface IGetAllSubDistrictResponse extends ApiResponse {
    sub_district: SubDistrict[];
}

export interface SubDistrict {
    id: string;
    name: string;
    villages: Village[];
}

export interface Village {
    id: string;
    name: string;
    postal_code: string;
}