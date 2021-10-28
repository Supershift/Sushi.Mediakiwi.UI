
export enum ExpressionType {
  Full = 0,
  Left = 1,
  Right = 2,
  Alternating = 3,
}

export enum vueTypes {
  /* eslint no-undefined: 0*/
  "undefined" = 0,
  "formButton" = 8,
  "formChoiceDropdown" = 2,
  "formPlus" = 3,
  "formRichText" = 4,
  "formText" = 5,
  "formTextline" = 6,

  "formTag" = 7,
  "formChoiceCheckbox" = 1,

  "formTagVue" = 9,
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
  formTagVue = "formTagVue",
  formText = "formText",
  formTextline = "formTextline",
  formTextArea = "formTextArea",
  formTime = "formTime",
  formValueCollection = "formValueCollection",
  formValue = "formValue",
  formLink = "formLink",
}

export const fieldMixins = {
  methods: {
    undefinedCheck(field: string): string {
      return (typeof (field) !== "undefined" && field) ? field : "";
    },
  },
};

export const emptyField = {
  contentTypeID: 10,
  propertyName: "TestProperty",
  propertyType: "string",
  fieldIcon: "plus",
  title: "Test Property",
  vueType: "5",
  expression: 1,
  value: "User input",
  options: null,
  className: null,
  event: null,
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
};
