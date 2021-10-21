import FieldModel from "./FieldModel";

export default interface GridRowModel {
    isButtonRow: boolean;
    fields: Array<FieldModel>;
}