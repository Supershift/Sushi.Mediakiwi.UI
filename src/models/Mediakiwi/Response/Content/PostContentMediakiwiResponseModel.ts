import { Form } from "./GetContentMediakiwiResponseModel";

export interface PostContentMediakiwiResponseModel {
    currentSiteId: number,
    postedField: string,
    forms: Form[],
}