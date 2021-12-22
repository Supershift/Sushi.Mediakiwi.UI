import MediakiwiModel from "./../MediakiwiModel";
import { GetContentMediakiwiResponseModel } from "./Content/GetContentMediakiwiResponseModel";
export default interface MediakiwiResponseModel extends GetContentMediakiwiResponseModel {
  closeLayer: boolean,
}
