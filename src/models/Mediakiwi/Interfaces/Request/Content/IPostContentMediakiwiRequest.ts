import { IForm } from "../../index";
export interface IPostContentMediakiwiRequest { 
    currentSiteId: number;
    postedField: string;
    forms: IForm[];
}