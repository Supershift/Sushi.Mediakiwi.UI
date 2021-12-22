export default interface NavigationModel {
  logoUrl: string;
  homeUrl: string;
  items: NavigationItemModel[];
}
export interface NavigationItemModel {
  href: string;
  iconClass: string;
  isBack: boolean;
  isHighlighted: boolean;
  badgeContent: string;
  items?: NavigationItemModel[];
  text: string;
}