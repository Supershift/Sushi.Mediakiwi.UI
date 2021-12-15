export interface GetTopNavigationResponseModel {
    homeUrl: string;
    items: TopNavigationItem[];
    logoUrl: string;
    statusCode: number;
}
interface TopNavigationItem {
    href: string;
    iconClass: string;
    isBack: boolean;
    isHighlighted: boolean;
    items: TopNavigationItem[];
    text: string;
}