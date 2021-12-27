import BreadcrumbModel from "../../BreadcrumbModel";
import NavigationModel from "../../NavigationModel";


export interface BreadCrumbs {
  items: BreadcrumbModel[];
}

export interface Notification{
  message: string;
  isError: boolean;
  propertyNames: string[];
}


export interface ResourceModel {
  type: number;
  position: number,
  isSync: true,
  path: string;
  sourceCode: string
}

export interface LayerConfiguration {
  width: number,
  height: number,
  widthUnitType: number,
  heightUnitType: number,
  title: string,
  hasScrollbar: boolean
}

export interface ContentOptions {
  text: string;
  value: string;
  isSelected: boolean;
  isEnabled: boolean;
}
export interface ButtonModel {
  contentType: number,
  propertyName: string,
  propertyType: string,
  title: string,
  vueType: boolean,
  expression: boolean,
  value: string,
  options: ContentOptions[],
  className: string,
  event: number,
  section: number,
  isHidden: boolean,
  groupName: string,
  suffix: string,
  prefix: string,
  formSection: string,
  canToggleSection: boolean,
  canDeleteSection: boolean,
  toggleDefaultClosed: boolean,
  isReadOnly: boolean,
  helpText: string,
  layerConfiguration: LayerConfiguration,
  isMandatory: boolean,
  maxLength: number,
  isAutoPostback: boolean,
  askConfirmation: boolean,
  confirmationQuestion: string,
  confirmationTitle: string,
  confirmationRejectLabel: string,
  confirmationAcceptLabel: string,
  target: string,
  url: string,
  triggerSaveEvent: boolean,
  isPrimary: boolean
}

export interface RowItem {
  value: string,
  vueType: number,
  canWrap: boolean
}
export interface Row {
    href: string,
    id: number,
    title: string,
    items: RowItem[],
}
export interface Column {
  title: string,
  width: number,
  align: number,
  isHidden: boolean,
  prefix: string,
  suffix: string,
  helpText: string,
  isSum: boolean,
  isAverage: boolean
}

export interface Pagenation {
  itemsPerPage: boolean,
  currentPage: boolean,
  totalItems: boolean
}
export interface Grid {
    title: string,
    layerConfiguration: LayerConfiguration,
    columns?: Column[],
    rows?: Row[],
    pagination: Pagenation,
}
export interface ContentList{
  title: string,
  description: string,
  settingsUrl: string,
  redirectUrl: string,
  isEditMode: true,
  notifications?: Notification[],
  grids?: Grid[],
  forms?: Form[],
  resources: ResourceModel[],
}
export interface ContentItem {
  contentType: number,
  propertyName: string,
  propertyType: string,
  title: string,
  vueType: 0,
  expression: 0,
  value: string,
  options: ContentOptions[],
  className: string,
  event: number,
  section: number,
  isHidden: boolean,
  groupName: string,
  suffix: string,
  prefix: string,
  formSection: string,
  canToggleSection: boolean,
  canDeleteSection: boolean,
  toggleDefaultClosed: boolean,
  isReadOnly: boolean,
  helpText: string,
  layerConfiguration: LayerConfiguration,
  isMandatory: boolean,
  maxLength: number,
  isAutoPostback: boolean
}
export interface ComponentModel {
  title: string,
  canMove: boolean,
  canDeactivate: boolean,
  isHeader: boolean,
  isFooter: boolean,
  sortOrder: number,
  content: ContentItem[],
  templateId: number;
  versionId: number;
}
export interface SlotItem {
  title: string;
  sortOrder: number;
  components: ComponentModel[];
}
export interface PageItem {
  title: string;
  completePath: string;
  slots: SlotItem[];
  isPublished: boolean;
  id: number;
}

export interface Explorer {
  items: NavigationModel[]
}

export interface Field {
  contentType: number,
  propertyName: string,
  propertyType: string,
  title: string,
  vueType: number,
  expression: number,
  value: string,
  options: ContentOptions[],
  className: string,
  event: number,
  section: number,
  isHidden: boolean,
  groupName: string,
  suffix: string,
  prefix: string,
  formSection: string,
  canToggleSection: boolean,
  canDeleteSection: boolean,
  toggleDefaultClosed: boolean,
  isReadOnly: boolean,
  helpText: string,
  layerConfiguration: LayerConfiguration,
  isMandatory: boolean,
  maxLength: number,
  isAutoPostback: boolean
}

export interface Form {
  className: string;
  fields?: Field[];
  buttons?: ButtonModel[],
  title: string
}

export interface GetContentMediakiwiResponseModel {
  statusCode: number;
  message: string;
  type: number;
  breadCrumbs: BreadCrumbs;
  isEditMode: boolean;
  list: ContentList;
  page: PageItem;
  explorer: Explorer;
}