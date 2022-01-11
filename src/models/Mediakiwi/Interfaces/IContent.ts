import { IFieldOption } from "./IFieldOption";
import { ILayerConfiguration } from "./ILayerConfiguration";

export interface IContent {
    contentType: number;
    propertyName: string;
    propertyType: string;
    title: string;
    vueType: 0;
    expression: 0;
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
  }