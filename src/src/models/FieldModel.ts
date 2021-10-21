import MessageModel from "./MessageModel";
import OptionModel from "./OptionModel";

export default interface FieldModel {
  // Core
  propertyName: string;
  title: string;
  vueType: string;
  // MK
  propertyType: number | undefined;
  expression: number;
  value: string | null;
  options: OptionModel | undefined;
  className: string |undefined;
  event: string;
  inputPost: string | undefined;
  section: number;
  hidden: boolean;
  groupName: string;
  suffix: string;
  prefix: string;
  formSection: string;
  canToggleSection: boolean;
  canDeleteSection: boolean;
  toggleDefaultClosed: boolean;
  readOnly: boolean;
  mandatory: boolean;
  componentKey: number | undefined;
  error: MessageModel | undefined;
}
