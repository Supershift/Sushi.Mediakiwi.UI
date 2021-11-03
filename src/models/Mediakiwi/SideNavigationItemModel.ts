export default interface SideNavigationItemModel {
  text: string;
  href: string;
  items: SideNavigationItemModel[];
  isBack: boolean;
  isActive: boolean;
  iconClass: string;
}
