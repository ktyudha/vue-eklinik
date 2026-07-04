import type { ApiResponse } from "@/services/common/api/interfaces/response.type";
import type { Pagination } from "@/services/common/pagination/interfaces/response.type";

export interface IGetAllVillageResponse extends ApiResponse {
    villages: Village[];
    pagination: Pagination;
}

export interface Village {
    id: string;
    name: string;
    postal_code: string;
    sub_district: Region;
    city: Region;
    province: Region;
}

interface Region {
    id: string;
    name: string;
}