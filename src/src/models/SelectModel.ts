import OptionModel from './OptionModel';

export default interface SelectInputModel {
    propName: String;
    error: String;
    disabled: Boolean;
    mandatory: Boolean;
    value: String;
    id: String;
    tabindex: number;
    customClasses: String;
    hasValidation: Boolean;
    isValid: Boolean;
    showLabel: Boolean;
    showDefault: Boolean;
    defaultLabel: String;
    options: OptionModel[];
};