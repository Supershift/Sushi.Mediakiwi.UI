import FieldModel from "@/models/Mediakiwi/FieldModel";
import { MediakiwiFormVueType } from "@/models/Mediakiwi/MediakiwiFormVueType";
import { MediakiwiJSEventType } from "@/models/Mediakiwi/MediakiwiJSEventType";

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
