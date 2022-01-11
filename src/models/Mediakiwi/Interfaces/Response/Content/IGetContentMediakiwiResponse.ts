import { IBreadCrumbs, IContentList, IPage, IExplorer } from "../../index";
export interface IGetContentMediakiwiResponse {
  statusCode: number;
  message: string;
  type: number;
  breadCrumbs: IBreadCrumbs;
  isEditMode: boolean;
  list: IContentList;
  page: IPage;
  explorer: IExplorer;
}