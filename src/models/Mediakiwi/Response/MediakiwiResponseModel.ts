import { GetContentMediakiwiResponseModel } from "./Content/GetContentMediakiwiResponseModel";
import { PostContentMediakiwiResponseModel } from "./Content/PostContentMediakiwiResponseModel";
export default interface MediakiwiResponseModel extends GetContentMediakiwiResponseModel {
  closeLayer: boolean,
}
