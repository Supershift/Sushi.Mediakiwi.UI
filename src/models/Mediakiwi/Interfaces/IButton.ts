import { IFieldOption } from "./IFieldOption";
import { ILayerConfiguration } from "./ILayerConfiguration";

export interface IButton {
  contentType: number;
  propertyName: string;
  propertyType: string;
  title: string;
  vueType: boolean;
  expression: boolean;
  value: string;
  options: IFieldOption[];
  className: string;
  event: number;
  section: number;
  isHidden: boolean;
  groupName: string;
  suffix: string;
  prefix: string;
  formSection: string;
  canToggleSection: boolean;
  canDeleteSection: boolean;
  toggleDefaultClosed: boolean;
  isReadOnly: boolean;
  helpText: string;
  layerConfiguration: ILayerConfiguration;
  isMandatory: boolean;
  maxLength: number;
  isAutoPostback: boolean;
  askConfirmation: boolean;
  confirmationQuestion: string;
  confirmationTitle: string;
  confirmationRejectLabel: string;
  confirmationAcceptLabel: string;
  target: string;
  url: string;
  triggerSaveEvent: boolean;
  isPrimary: boolean;
}
