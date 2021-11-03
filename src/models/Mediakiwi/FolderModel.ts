import FolderItemModel from "./FolderItemModel";

export default interface FolderModel {
  id: number;
  folderName: string;
  description: string;
  href: string;
  items: FolderItemModel[];
}
