
import { ContentTypeEnum } from "./ContentTypeEnum";
import { IFieldOption } from "./IFieldOption";
import { ILayerConfiguration } from "./ILayerConfiguration";


export interface IField {
  contentType: ContentTypeEnum;
  propertyName: string;
  propertyType: string;
  title: string;
  vueType: number;
  expression: number;
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
  fieldIcon?:string;
}