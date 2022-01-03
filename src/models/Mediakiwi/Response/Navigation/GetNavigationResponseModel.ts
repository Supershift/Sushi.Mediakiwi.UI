import NavigationModel from "../../NavigationModel";

export interface NavigationItem {
    href: string;
    iconClass: string;
    isBack: boolean;
    isHighlighted: boolean;
    badgeContent: string;
    items: NavigationItem[];
    text: string;
}
export interface GetNavigationResponseModel extends NavigationModel {
    homeUrl: string;
    items: NavigationItem[];
    logoUrl: string;
    statusCode: number;
}