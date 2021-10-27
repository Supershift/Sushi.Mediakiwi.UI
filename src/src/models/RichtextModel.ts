import FieldModel from "./FieldModel";

interface RichtextModel {
    customClass: string;
    fieldValue: string;
    event?: string | undefined | null;
    disabled: boolean;
    readonly: boolean;
    fields: FieldModel[];
    fieldName: string;
}

export default RichtextModel;