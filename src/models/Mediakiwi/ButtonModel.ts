import FieldModel from "../FieldModel";
import { ButtonTargetType } from "./ButtonTargetType";
import LayerConfigurationModel from "./LayerConfigurationModel";

export interface ButtonModel extends FieldModel {
  noPostBack: boolean;
  buttonClassName: string;
  interactiveHelp: string;
  confirmationQuestion: string;
  confirmationTitle: string;
  confirmationRejectLabel: string;
  confirmationAcceptLabel: string;
  iconClassName: string
  target: string;
  triggerValidation: boolean
  triggerState: boolean
  triggerSaveEvent: boolean;
  openInPopupLayer: boolean
  customUrl: string;
  listInPopupLayer: string;
  askConfirmation: boolean;
  isPrimary: boolean;
  iconTarget: ButtonTargetType;
  layerConfiguration: LayerConfigurationModel;
}
