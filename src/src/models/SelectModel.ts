import OptionModel from "./OptionModel";

export interface SelectModel {
    error: String;
    disabled: Boolean;
    mandatory: Boolean;
    value: String;
    tabindex: Number;
    fieldName: String;
    fieldIcon: string;
    multiple: Boolean;
    customClass: String;
    hasValidation: Boolean;
    isValid: Boolean;
    showLabel: Boolean;
    showDefault: Boolean;
    defaultLabel: String;
    options: OptionModel[];
}
