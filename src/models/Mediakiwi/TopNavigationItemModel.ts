export default interface TopNavigationItemModel {
  id: number;
  text: string;
  href: string;
  items?: TopNavigationItemModel[];
}
