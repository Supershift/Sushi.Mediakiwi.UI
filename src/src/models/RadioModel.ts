import OptionModel from "./OptionModel";

interface RadioModel {
    customClass: String;
    fieldIcon: String;
    fieldGroupName: String;
    disabled: Boolean;
    suffix: String;
    prefix: String;
    fieldName: String;
    fieldValue: String;
    options: OptionModel[];
};

export default RadioModel;