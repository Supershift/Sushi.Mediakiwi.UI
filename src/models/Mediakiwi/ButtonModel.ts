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
  target?: string;
  triggerValidation?: boolean
  triggerState?: boolean
  triggerSaveEvent?: boolean;
  openInPopupLayer: boolean
  customUrl?: string;
  isPrimary: boolean;
  iconTarget?: ButtonTargetType;
  layerConfiguration?: LayerConfigurationModel;
}
