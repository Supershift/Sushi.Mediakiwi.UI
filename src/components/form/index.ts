/* eslint-disable @typescript-eslint/no-explicit-any */
import {IField} from "@/models/Mediakiwi/Interfaces";
import { getEvents, JSEventTypeEnum } from "@/models/Mediakiwi/Enums";
import { IMessage } from "@/models/Local/Interfaces";

export enum ExpressionType {
  Full = 0,
  Left = 1,
  Right = 2,
  Alternating = 3,
}

export enum vueTypes {
  /* eslint no-undefined: 0*/
  "undefined" = 0,
  "formButton" = 1,
  "formChoiceDropdown" = 2,
  "formPlus" = 3,
  "formRichText" = 4,
  "formText" = 5,
  "formTextline" = 6,
  "formTag" = 7,
  "formChoiceCheckbox" = 8,
  "formTextArea" = 10,
  "formChoiceRadio" = 11,        
  "formDateTime" = 12,
  "formDate" = 13,
  "formSection" = 14,
}

export enum FieldType {
  formButton = "formButton",
  formChoiceCheckbox = "formChoiceCheckbox",
  formChoiceDropdown = "formChoiceDropdown",
  formChoiceRadio = "formChoiceRadio",
  formDateTime = "formDateTime",
  formDate = "formDate",
  formNameValueCollection = "formNameValueCollection",
  formNameValue = "formNameValue",
  formPlus = "formPlus",
  formRichText = "formRichText",
  formSection = "formSection",
  formTag = "formTag",
  formText = "formText",
  formTextline = "formTextline",
  formTextArea = "formTextArea",
  formTime = "formTime",
  formValueCollection = "formValueCollection",
  formValue = "formValue",
  formLink = "formLink",
}

export enum FieldValidationType { 
  none = "none",
  required = "required",
  email = "email",
  url = "url",
  number = "number",
  min = "min",
  max = "max",
  minLength = "minLength",
  maxLength = "maxLength",
  pattern = "pattern",
  minDateTime = "minDateTime",
  maxDateTime = "maxDateTime",
  empty = "empty",
}

export enum FieldValidationTypeMessage { 
  none = "",
  required = "This field is required",
  email = "This field must be a valid email address",
  url = "This field must be a valid URL",
  number = "This field must be a valid number",
  min = "This field must be greater than or equal to {0}",
  max = "This field must be less than or equal to {0}",
  minLength = "This field must be at least {0} characters long",
  maxLength = "This field must be at most {0} characters long",
  pattern = "This field must match the pattern {0}",
  minDateTime = "This field must be on or after {0}",
  maxDateTime = "This field must be on or before {0}",
  empty = "Some fields may not be empty",
}

export const fieldMixins = {
  methods: {
    undefinedCheck(param: string): string {
      return (typeof (param) !== "undefined" && param) ? param : "";
    },
    errorClass(field: IField): string {
      if (field.className.includes("error")) { return " error "; }
      return "";
    },
    validateEmail(email: string): boolean {
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const re2 =/\S+@\S+\.\S+/;
      return re2.test(email);
    },
    emailValidator(value: string, fieldName:string, errorMessages: IMessage[]): Array<IMessage> {
      if (value.length > 0) {
        // validate email
        if (fieldName.toLowerCase().includes("email")) {
          if (!this.validateEmail(value)) {
            if (errorMessages.findIndex((x: IMessage) => x.code === FieldValidationType.email) === -1) {
              errorMessages.push({
                message: FieldValidationTypeMessage.email,
                isError: true,
                code: FieldValidationType.email,
                propertyName: fieldName,
              });
            }
          } else {
            errorMessages.splice(errorMessages.findIndex((x: IMessage) => x.code === FieldValidationType.email), 1);
          }
        }
      }
      return errorMessages;
    },
    emptyValidator(value: string, fieldName:string, errorMessages: IMessage[]): Array<IMessage> {
      if (value.length > 0) {
        errorMessages.splice(errorMessages.findIndex((x: IMessage) => x.code === FieldValidationType.empty), 1);
        return errorMessages; 
      } else {
        if (errorMessages.findIndex((x: IMessage) => x.code === FieldValidationType.empty) === -1) {
          errorMessages.push({ message: FieldValidationTypeMessage.empty, isError: true, code: FieldValidationType.empty, propertyName: fieldName });
          return errorMessages;
        }
      }
      return errorMessages;
    }
  },
};

export const emptyField = {
  contentType: 10,
  propertyName: "Empty",
  propertyType: "0",
  title: "Empty",
  vueType: 0,
  expression: 0,
  value: "",
  options: [],
  className: "",
  event: 0,
  section: 0,
  isHidden: false,
  groupName: "",
  suffix: "",
  prefix: "",
  formSection: "",
  canToggleSection: false,
  canDeleteSection: false,
  toggleDefaultClosed: false,
  isReadOnly: false,
  helpText: "",
  layerConfiguration: {
    width: 0,
    height: 0,
    widthUnitType: 0,
    heightUnitType: 0,
    title: "",
    hasScrollbar: false,
    iframe: false,
  },
  isMandatory: false,
  maxLength: 0,
  isAutoPostback: false,
} as IField;


/** Add events based on the @type {IField} event @type {JSEventTypeEnum} */
export function customEventHandler(field: IField, callback: any) {
  if (field?.event === JSEventTypeEnum.none) {
    return null;
  }
  const eventTypes = getEvents(field.event);
  const events: any = {};
  eventTypes?.forEach((eventType: string) => {
    events[eventType] = callback; // nameof the method
  });
  const e = Object.entries(events).reduce((acc: any, [eventName, callback]) => {
    acc[eventName] = callback;
    return acc;
  }, {});
  return e;
}

export function getSublistSelectValueLabel(value: any) {
  if (value && value.name) {
    if (value.href) {
      return `${value.name} <span>(${value.href})</span>`;
    }
    else if (value.width) {
      return `${value.name} <span>(${value.width}px / ${value.height}px)</span>`;
    }
  }
  return "";
}
