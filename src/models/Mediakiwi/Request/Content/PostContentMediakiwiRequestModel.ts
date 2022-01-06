import { Form } from "../../Response/Content/GetContentMediakiwiResponseModel";

export interface PostContentMediakiwiRequestModel { 
    currentSiteId: number;
    postedField: string;
    forms: Form[];
}