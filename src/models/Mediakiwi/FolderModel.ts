import FolderItemModel from "./FolderItemModel";

export default interface FolderModel {
  folderId: number;
  folderName: string;
  description: string;
  href: string;
  items: FolderItemModel[];
}
