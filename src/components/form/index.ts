/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldModel from "@/models/Mediakiwi/FieldModel";
import { MediakiwiFormVueType } from "@/models/Mediakiwi/MediakiwiFormVueType";
import { getEvents, MediakiwiJSEventType } from "@/models/Mediakiwi/MediakiwiJSEventType";
import MessageModel from "@/models/MessageModel";

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
    errorClass(field: FieldModel): string {
      if (field.error) { return " error "; }
      return "";
    },
    validateEmail(email: string): boolean {
      // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const re2 =/\S+@\S+\.\S+/;
      return re2.test(email);
    },
    emailValidator(value: string, fieldName:string, errorMessages: MessageModel[]): Array<MessageModel> {
      if (value.length > 0) {
        // validate email
        if (fieldName.toLowerCase().includes("email")) {
          if (!this.validateEmail(value)) {
            if (errorMessages.findIndex((x: MessageModel) => x.code === FieldValidationType.email) === -1) {
              errorMessages.push({
                message: FieldValidationTypeMessage.email,
                isError: true,
                code: FieldValidationType.email,
                propertyName: fieldName,
              });
            }
          } else {
            errorMessages.splice(errorMessages.findIndex((x: MessageModel) => x.code === FieldValidationType.email), 1);
          }
        }
      }
      return errorMessages;
    },
    emptyValidator(value: string, fieldName:string, errorMessages: MessageModel[]): Array<MessageModel> {
      if (value.length > 0) {
        errorMessages.splice(errorMessages.findIndex((x: MessageModel) => x.code === FieldValidationType.empty), 1);
        return errorMessages; 
      } else {
        if (errorMessages.findIndex((x: MessageModel) => x.code === FieldValidationType.empty) === -1) {
          errorMessages.push({ message: FieldValidationTypeMessage.empty, isError: true, code: FieldValidationType.empty, propertyName: fieldName });
          return errorMessages;
        }
      }
      return errorMessages;
    }
  },
};

export const emptyField = {
  contentTypeID: 10,
  propertyName: "EmptyProp",
  propertyType: "string",
  fieldIcon: "",
  title: "Test Property",
  vueType: MediakiwiFormVueType.formText,
  expression: 1,
  value: "",
  options: null,
  className: null,
  event: MediakiwiJSEventType.none,
  inputPost: null,
  section: 0,
  hidden: null,
  groupName: null,
  suffix: null,
  prefix: null,
  formSection: null,
  canToggleSection: false,
  canDeleteSection: false,
  toggleDefaultClosed: false,
  readOnly: true,
  helpText: "This field is an empty prop",
  componentKey: 0,
  error: { message: FieldValidationTypeMessage.none, isError: false, propertyName: "", code: FieldValidationType.none },
  locale: "en",
  weekStart: null,
  mandatory: false
} as FieldModel;


/** Add events based on the @type {FieldModel} event @type {MediakiwiJSEventType} */
export function customEventHandler(field: FieldModel, callback: any) {
  if (field?.event === MediakiwiJSEventType.none) {
    return null;
  }
  const eventTypes = getEvents(field.event);
  const events: any = {};
  eventTypes?.forEach((eventType) => {
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
