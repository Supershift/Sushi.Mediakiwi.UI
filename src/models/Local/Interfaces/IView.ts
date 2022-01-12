import { INameValue } from "./INameValue";
import { ViewTypeEnum } from "../Enums/ViewTypeEnum";

export interface IView {
  id: number,
  type?: ViewTypeEnum,
  customPath?: string,
  additionalProperties?: INameValue[]
}
