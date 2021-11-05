import FieldModel from "../FieldModel";
import BaseMediakiwiRequestModel from "./GetMediakiwiRequestModel";

export default interface PostMediakiwiRequestModel extends BaseMediakiwiRequestModel {
  fields: FieldModel[],
  referId: string,
}
