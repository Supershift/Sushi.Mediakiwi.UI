export default interface TopNavigationItemModel {
     href: string;
    iconClass: string;
    isBack: boolean;
    isHighlighted: boolean;
    items?: TopNavigationItemModel[];
    text: string;
}
