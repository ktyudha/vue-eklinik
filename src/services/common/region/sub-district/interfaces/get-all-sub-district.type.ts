import type { ApiResponse } from "@/services/common/api/interfaces/response.type";

export interface IGetAllSubDistrictResponse extends ApiResponse {
    sub_districts: SubDistrict[];
}

export interface SubDistrict {
    id: string;
    name: string;
}
