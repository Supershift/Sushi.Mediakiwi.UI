import OptionModel from "./OptionModel";

interface SelectModel {
    error: string;
    disabled: boolean;
    mandatory: boolean;
    value: string;
    tabindex: number;
    fieldName: string;
    fieldIcon: string;
    multiple: boolean;
    customClass: string;
    hasValidation: boolean;
    isValid: boolean;
    showLabel: boolean;
    showDefault: boolean;
    defaultLabel: string;
    options: OptionModel[];
}

export default SelectModel;
