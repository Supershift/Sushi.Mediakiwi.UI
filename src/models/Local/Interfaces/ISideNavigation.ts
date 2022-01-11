
export interface ISideNavigationItem {
  text: string;
  href: string;
  items: ISideNavigationItem[];
  isBack: boolean;
  isActive: boolean;
  iconClass: string;
}
export interface ISideNavigation {
  items: ISideNavigationItem[];
}
