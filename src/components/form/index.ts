/* eslint-disable @typescript-eslint/no-explicit-any */
import FieldModel from "@/models/Mediakiwi/FieldModel";
import { MediakiwiFormVueType } from "@/models/Mediakiwi/MediakiwiFormVueType";
import { getEvents, MediakiwiJSEventType } from "@/models/Mediakiwi/MediakiwiJSEventType";

export const fieldMixins = {
  methods: {
    undefinedCheck(param: string): string {
      return (typeof (param) !== "undefined" && param) ? param : "";
    },
    errorClass(field: FieldModel) {
      if (field.error) { return " error "; }
      return "";
    },
  },
};

export const emptyField = {
  contentTypeID: 10,
  propertyName: "TestProperty",
  propertyType: "string",
  fieldIcon: "plus",
  title: "Test Property",
  vueType: MediakiwiFormVueType.formText,
  expression: 1,
  value: "User input",
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
  readOnly: false,
  helpText: "This field can do stuff",
  componentKey: 0,
  error: { message: "", isError: false, propertyName: "" },
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
