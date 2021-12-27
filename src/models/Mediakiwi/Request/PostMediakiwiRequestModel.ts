import { PostContentMediakiwiRequestModel } from "./Content/PostContentMediakiwiRequestModel";

export default interface PostMediakiwiRequestModel extends PostContentMediakiwiRequestModel {
  url: string,
  CurrentSiteID: number,
}
