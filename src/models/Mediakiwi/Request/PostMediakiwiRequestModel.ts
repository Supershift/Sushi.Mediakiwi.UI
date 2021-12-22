import FieldModel from "../FieldModel";
import { PostContentMediakiwiRequestModel } from "./Content/PostContentMediakiwiRequestModel";
import BaseMediakiwiRequestModel from "./GetMediakiwiRequestModel";

export default interface PostMediakiwiRequestModel extends PostContentMediakiwiRequestModel {
  url: string,
  CurrentSiteID: number,
}
