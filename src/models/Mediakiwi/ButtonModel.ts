// import { ButtonRequestMethodType } from "./ButtonRequestMethodType";
import { ButtonTargetType } from "./ButtonTargetType";
import FieldModel from "./FieldModel";
import LayerConfigurationModel from "./LayerConfigurationModel";

export interface ButtonModel extends FieldModel {
  noPostBack: boolean;
  askConfirmation: boolean;
  confirmationQuestion?: string;
  confirmationTitle?: string;
  confirmationRejectLabel?: string;
  confirmationAcceptLabel?: string;
  helpText?: string;
  target?: string;
  triggerValidation?: boolean
  triggerState?: boolean
  triggerSaveEvent?: boolean;
  openInPopupLayer: boolean
  customUrl?: string;
  isPrimary: boolean;
  icon: string;
  iconTarget?: ButtonTargetType;
  layerConfiguration?: LayerConfigurationModel;
  // requestMethod?: ButtonRequestMethodType,
}
