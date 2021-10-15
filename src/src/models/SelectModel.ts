import OptionModel from "./OptionModel";

interface SelectInputModel {
    error: String;
    disabled: Boolean;
    mandatory: Boolean;
    value: String;
    tabindex: Number;
    fieldName: String;
    fieldIcon: string;
    customClass: String;
    hasValidation: Boolean;
    isValid: Boolean;
    showLabel: Boolean;
    showDefault: Boolean;
    defaultLabel: String;
    options: OptionModel[];
}

export default SelectInputModel;
