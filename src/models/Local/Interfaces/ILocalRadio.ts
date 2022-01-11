import {ILocalOption} from "./ILocalOption";

export interface ILocalRadio {
    customClass: string;
    fieldIcon: string;
    fieldGroupName: string;
    disabled: boolean;
    suffix: string;
    prefix: string;
    fieldName: string;
    fieldValue: string;
    options: ILocalOption[];
}
