import ButtonModel from "../ButtonModel";
import FieldModel from "./FieldModel";
import BreadcrumbModel from "./BreadcrumbModel";
import FolderModel from "./FolderModel";
import GridModel from "./GridModel";
import NotificationModel from "./NotificationModel";
import ProfileModel from "./ProfileModel";
import ResourceModel from "./ResourceModel";
import SideNavigationModel from "./SideNavigationModel";
import SiteModel from "./SiteModel";
import TopNavigationModel from "./TopNavigationModel";
import ViewModel from "./ViewModel";

export default interface MediakiwiModel {
  listTitle?: string;
  isEditMode: boolean;
  fields: FieldModel[];
  buttons: ButtonModel[];
  notifications: NotificationModel[];
  grids: GridModel[];
  topNavigation: TopNavigationModel;
  sideNavigation: SideNavigationModel;
  folders: FolderModel[];
  profile: ProfileModel;
  redirectUrl?: string;
  listDescription?: string;
  listSettingsUrl?: string;
  breadcrumbs: BreadcrumbModel[];
  currentSiteID: number;
  sites: SiteModel[];
  isSharedField: boolean;
  sharedFieldValue?: string;
  resources: ResourceModel[]
  referId?: string,
  views: ViewModel[] | null
}
