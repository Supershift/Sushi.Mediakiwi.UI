
export interface IFolderItem {
  text: string;
  id: number;
  href: string;
  isPublished?: boolean;
  isEdited?: boolean;
}

export interface IFolder {
  id: number;
  folderName: string;
  description: string;
  href: string;
  items: IFolderItem[];
}
