import NameValueModel from "./NameValueModel";
import { ViewType } from "./ViewType";

export default interface ViewModel {
  id: number,
  type?: ViewType,
  customPath?: string,
  additionalProperties?: NameValueModel[]
}
