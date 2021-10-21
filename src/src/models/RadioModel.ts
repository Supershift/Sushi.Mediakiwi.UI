import OptionModel from "./OptionModel";

export default interface RadioModel {
    customClass: string;
    fieldIcon: string;
    fieldGroupName: string;
    disabled: boolean;
    suffix: string;
    prefix: string;
    fieldName: string;
    fieldValue: string;
    options: OptionModel[];
};
