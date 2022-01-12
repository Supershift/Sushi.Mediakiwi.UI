import { IContent } from "./IContent";

export interface IComponent {
    title: string;
    canMove: boolean;
    canDeactivate: boolean;
    isHeader: boolean;
    isFooter: boolean;
    sortOrder: number;
    content: IContent[];
    templateId: number;
    versionId: number;
  }