import MessageModel from "./MessageModel";
import OptionModel from "./OptionModel";

export default interface FieldModel {
  // Core
  propertyName: string;
  title: string;
  vueType: string;
  // MK
  propertyType: string | undefined |null;
  expression: number;
  value: string | null;
  options: OptionModel | undefined | null;
  className: string | undefined | null;
  event: string;
  inputPost: string | undefined | null;
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
  componentKey: number | undefined | null;
  error: MessageModel | undefined | null;
  helpText: string;
}
