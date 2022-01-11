import { IField } from "../../Mediakiwi/Interfaces";
export interface ILocalRichtext {
    customClass: string;
    fieldValue: string;
    event?: string | undefined | null;
    disabled: boolean;
    readonly: boolean;
    fields: IField[];
    fieldName: string;
}
