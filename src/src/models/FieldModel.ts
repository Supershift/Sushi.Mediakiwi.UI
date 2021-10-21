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
  inputPost: string | undefined | null;
  section: number;
  hidden: boolean | null;
  groupName: string | null;
  suffix: string | null;
  prefix: string | null;
  formSection: string | null;
  canToggleSection: boolean;
  canDeleteSection: boolean;
  toggleDefaultClosed: boolean;
  readOnly: boolean;
  helpText: string;
  mandatory?: boolean | undefined | null;
  componentKey?: number | undefined | null;
  error?: MessageModel | undefined | null;
  event?: number | undefined | null;
  contentTypeID: number;
}
