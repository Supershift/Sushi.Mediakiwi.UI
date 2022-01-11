import { IForm } from "./IForm";
import { IGrid } from "./IGrid";
import { INotification } from "./INotification";
import { IResource } from "./IResource";

export interface IContentList{
    title: string,
    description: string,
    settingsUrl: string,
    redirectUrl: string,
    isEditMode: true,
    notifications?: INotification[],
    grids?: IGrid[],
    forms?: IForm[],
    resources: IResource[],
  }