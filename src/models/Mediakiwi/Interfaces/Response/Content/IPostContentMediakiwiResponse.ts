import { IForm } from "../..";
import { IGetContentMediakiwiResponse } from "./IGetContentMediakiwiResponse";

export interface IPostContentMediakiwiResponse extends IGetContentMediakiwiResponse {
    currentSiteId: number,
    postedField: string,
    forms: IForm[],
}