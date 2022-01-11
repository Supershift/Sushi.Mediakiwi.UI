import { ISite } from "../../index";
export interface IGetSitesResponse {
    statusCode: number,
    message: string,
    items: ISite[]
}
