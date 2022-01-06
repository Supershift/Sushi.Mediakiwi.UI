import { Form, GetContentMediakiwiResponseModel } from "./GetContentMediakiwiResponseModel";

export interface PostContentMediakiwiResponseModel extends GetContentMediakiwiResponseModel {
    currentSiteId: number,
    postedField: string,
    forms: Form[],
}