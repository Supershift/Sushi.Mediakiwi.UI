
export interface INavigationItem {
  href: string;
  iconClass: string;
  isBack: boolean;
  isHighlighted: boolean;
  badgeContent: string;
  items?: INavigationItem[];
  text: string;
}
export interface INavigation {
  logoUrl: string;
  homeUrl: string;
  items: INavigationItem[];
}