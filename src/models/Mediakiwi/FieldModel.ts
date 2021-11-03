import { ButtonSectionType } from "./ButtonSectionType";
import { ContentType } from "./ContentType";
import { MediakiwiFormVueType } from "./MediakiwiFormVueType";
import { MediakiwiJSEventType } from "./MediakiwiJSEventType";
import OptionModel from "./OptionModel";
import { OutputExpressionType } from "./OutputExpressionType";


export default interface FieldModel {
  contentTypeID: ContentType;
  propertyName: string;
  propertyType: string;
  title: string
  vueType: MediakiwiFormVueType;
  expression: OutputExpressionType;
  value: unknown;
  options: OptionModel;
  className: string;
  event: MediakiwiJSEventType;
  inputPost: string;
  section: ButtonSectionType;
  hidden?: boolean;
  groupName: string;
  suffix: string;
  prefix: string;
  formSection: string;
  canToggleSection: boolean;
  canDeleteSection: boolean;
  toggleDefaultClosed: boolean;
  readOnly: boolean;
}
