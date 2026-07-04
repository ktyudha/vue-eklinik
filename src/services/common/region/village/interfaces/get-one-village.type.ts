import type { ApiResponse } from "@/services/common/api/interfaces/response.type";


export interface IGetOneVillageResponse extends ApiResponse {
    villages: Village;
}

export interface Village {
    id: string;
    name: string;
    postal_code: string;
}
