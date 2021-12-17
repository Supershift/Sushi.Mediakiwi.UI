interface TopNavItems {
  text: string;
  href: string;
  iconClass: string;
  isHighlighted: boolean;
  isBack: boolean;
  badgeContent: string;
  items: Array<string>;
}
export interface GetContentMediakiwiResponseModel {
    statusCode: number;
    message: string;
    logoUrl: string;
    homeUrl: string;
    items: Array<TopNavItems>;
}
  