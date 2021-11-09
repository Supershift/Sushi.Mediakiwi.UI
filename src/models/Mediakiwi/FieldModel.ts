import MessageModel from "../MessageModel";
import { ButtonSectionType } from "./ButtonSectionType";
import { ContentType } from "./ContentType";
import LayerConfigurationModel from "./LayerConfigurationModel";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: string | number | any;
  options?: OptionModel | null;
  className?: string | null;
  event: MediakiwiJSEventType;
  inputPost?: string | null;
  section: ButtonSectionType;
  hidden?: boolean | null;
  groupName?: string | null;
  suffix?: string | null;
  prefix?: string | null;
  formSection?: string | null;
  canToggleSection: boolean;
  canDeleteSection: boolean;
  toggleDefaultClosed: boolean;
  readOnly: Boolean;
  error?: MessageModel | null;
  fieldIcon?: string | null;
  mandatory?: boolean | null;
  componentKey?: number;
  locale?: string | null;
  weekStart?: number | null;
  autoPostBack?: boolean | null;
  layerConfiguration?: LayerConfigurationModel;
}
